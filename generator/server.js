/**
 * server.js - Serveur HTTP de P&S Agency
 *
 * MODIFICATIONS V2:
 * - Import generate-site-v2.js (template-based) au lieu de generate-site.js (PTY Claude Code)
 * - generate-site.js ancien renomme en generate-site.js.legacy pour rollback
 * - Le payload n8n reste IDENTIQUE (memes champs, meme auth, meme endpoint)
 *
 * Endpoints:
 *   GET  /health              (public)
 *   POST /generate-site       (auth)   -> lance un job, renvoie job_id
 *   GET  /job-status/:jobId   (auth)   -> check statut du job
 *   GET  /jobs                (auth)   -> liste tous les jobs
 *   POST /post-sale           (auth)   -> deprecate (a refacto plus tard)
 */

import express from 'express';
import dotenv from 'dotenv';
import crypto from 'crypto';
import { generateSite } from './generate-site-v2.js';
import { promises as fs } from 'fs';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const API_SECRET = process.env.API_SECRET;

if (!API_SECRET) {
  console.error('API_SECRET missing in .env');
  process.exit(1);
}

app.use(express.json({ limit: '10mb' }));

const jobs = new Map();

function authenticate(req, res, next) {
  const token = req.headers['x-api-secret'];
  if (token !== API_SECRET) {
    console.log(`Auth failed from ${req.ip}`);
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

function createJobLogger(jobId) {
  return (msg) => {
    const timestamp = new Date().toISOString();
    const line = `[${timestamp}] ${msg}`;
    console.log(`[Job ${jobId}] ${msg}`);
    const job = jobs.get(jobId);
    if (job) {
      job.logs.push(line);
    }
  };
}

// ----------------------------------------------------------------------------
// Routes
// ----------------------------------------------------------------------------

// ---- Serial job queue (concurrency = 1) --------------------------------
// Vercel Hobby builds ONE deployment at a time; concurrent generations
// flood Vercel's build queue (each job = deploy + redeploy). Chain
// executions so only one generateSite runs at a time.
let jobChain = Promise.resolve();
function runSerial(task) {
  const run = jobChain.then(task, task);
  jobChain = run.catch(() => {});
  return run;
}

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    version: 'v2-template-based',
    timestamp: new Date().toISOString(),
    active_jobs: [...jobs.values()].filter((j) => j.status === 'running').length,
    total_jobs: jobs.size,
  });
});

app.post('/generate-site', authenticate, async (req, res) => {
  const jobId = crypto.randomUUID();
  const businessData = req.body;

  console.log(`\n[New job ${jobId}] ${businessData.BUSINESS_NAME || '(no name)'} - ${businessData.BUSINESS_TYPE || '(no type)'}`);

  // Pre-validation : verifie BUSINESS_TYPE avant de creer le job
  // (pour pouvoir renvoyer 400 immediatement si invalide)
  const validCategories = ['AUTO_REPAIR', 'PLUMBERS', 'ELECTRICIANS'];
  const category = String(businessData.BUSINESS_TYPE || '').toUpperCase().trim();
  if (!validCategories.includes(category)) {
    return res.status(400).json({
      error: `Invalid BUSINESS_TYPE "${businessData.BUSINESS_TYPE}". Must be one of: ${validCategories.join(', ')}`,
    });
  }

  jobs.set(jobId, {
    id: jobId,
    status: 'running',
    business_name: businessData.BUSINESS_NAME || 'unknown',
    business_type: category,
    started_at: new Date().toISOString(),
    finished_at: null,
    result: null,
    error: null,
    logs: [],
  });

  res.status(202).json({
    job_id: jobId,
    status: 'running',
    message: 'Job started. Poll /job-status/:jobId for updates.',
    estimated_duration_minutes: '3-8',
  });

  // Run in background
  const logger = createJobLogger(jobId);
  runSerial(() => generateSite(businessData, logger))
    .then((result) => {
      const job = jobs.get(jobId);
      job.status = 'success';
      job.finished_at = new Date().toISOString();
      job.result = result;
      logger(`Job succeeded: ${result.site_url}`);
    })
    .catch((err) => {
      const job = jobs.get(jobId);
      job.status = 'failed';
      job.finished_at = new Date().toISOString();
      job.error = err.message;
      logger(`Job failed: ${err.message}`);
    });
});

app.get('/job-status/:jobId', authenticate, (req, res) => {
  const job = jobs.get(req.params.jobId);
  if (!job) {
    return res.status(404).json({ error: 'Job not found' });
  }
  res.json({
    id: job.id,
    status: job.status,
    business_name: job.business_name,
    business_type: job.business_type,
    started_at: job.started_at,
    finished_at: job.finished_at,
    result: job.result,
    error: job.error,
    recent_logs: job.logs.slice(-20),
  });
});

app.get('/jobs', authenticate, (req, res) => {
  const summary = [...jobs.values()].map((j) => ({
    id: j.id,
    status: j.status,
    business_name: j.business_name,
    business_type: j.business_type,
    started_at: j.started_at,
    finished_at: j.finished_at,
  }));
  res.json({ count: summary.length, jobs: summary });
});

// Post-sale endpoint (kept for compat, but should be refactored later)
app.post('/post-sale', authenticate, async (req, res) => {
  res.status(501).json({ error: 'Post-sale endpoint not yet refactored for V2 pipeline. Coming soon.' });
});

// Screenshots - public static serve + authenticated cleanup
const SCREENSHOTS_DIR = '/home/USER/automation/screenshots';
app.use('/screenshots', express.static(SCREENSHOTS_DIR, {
  setHeaders: (res) => res.setHeader('Cache-Control', 'public, max-age=86400'),
  fallthrough: true,
}));

app.delete('/screenshots/:filename', authenticate, async (req, res) => {
  const filename = req.params.filename;
  if (!/^[a-zA-Z0-9._-]+$/.test(filename)) {
    return res.status(400).json({ error: 'Invalid filename' });
  }
  const fullPath = path.join(SCREENSHOTS_DIR, filename);
  if (!fullPath.startsWith(SCREENSHOTS_DIR + path.sep)) {
    return res.status(400).json({ error: 'Path traversal blocked' });
  }
  try {
    await fs.unlink(fullPath);
    console.log(`[screenshots] deleted ${filename}`);
    res.json({ deleted: filename });
  } catch (err) {
    if (err.code === 'ENOENT') return res.status(404).json({ error: 'Not found' });
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`P&S Agency automation server V2 running on http://0.0.0.0:${PORT}`);
  console.log(`Pipeline: template-based (generate-site-v2.js)`);
  console.log(`Endpoints:`);
  console.log(`  GET    /health`);
  console.log(`  POST   /generate-site       (auth required)`);
  console.log(`  GET    /job-status/:jobId   (auth required)`);
  console.log(`  GET    /jobs                (auth required)`);
  console.log(`  GET    /screenshots/<file>  (public)`);
  console.log(`  DELETE /screenshots/<file>  (auth required)`);
});
