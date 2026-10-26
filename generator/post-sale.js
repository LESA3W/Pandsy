import fs from 'fs/promises';
import path from 'path';
import { POST_SALE_STEPS, fillPlaceholders } from './pipeline.js';
import { spawn } from 'child_process';

const CLAUDE_BIN = process.env.CLAUDE_BIN || 'claude';
const MAX_RATE_LIMIT_RETRIES = 3;

function detectRateLimit(output) {
  const match = output.match(/You've hit your limit.*?resets?\s+(\d{1,2}):(\d{2})\s*(am|pm)\s*\(?(UTC)?\)?/i);
  if (!match) return null;
  let hours = parseInt(match[1]);
  const minutes = parseInt(match[2]);
  const ampm = match[3].toLowerCase();
  if (ampm === 'pm' && hours !== 12) hours += 12;
  if (ampm === 'am' && hours === 12) hours = 0;
  const now = new Date();
  const resetTime = new Date(now);
  resetTime.setUTCHours(hours, minutes, 0, 0);
  if (resetTime <= now) resetTime.setUTCDate(resetTime.getUTCDate() + 1);
  return (resetTime.getTime() - now.getTime()) + 120000;
}

function formatWaitTime(ms) {
  const totalMin = Math.ceil(ms / 60000);
  const hours = Math.floor(totalMin / 60);
  const mins = totalMin % 60;
  return hours > 0 ? hours + 'h' + mins + 'min' : mins + 'min';
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function runClaudeStep(cwd, prompt, stepName) {
  return new Promise((resolve, reject) => {
    console.log('\n🚀 [' + stepName + '] Starting claude -p in ' + cwd);
    const startTime = Date.now();
    const child = spawn(CLAUDE_BIN, ['-p', prompt, '--dangerously-skip-permissions'], { cwd, env: process.env });
    let stdout = '';
    let stderr = '';
    child.stdout.on('data', (data) => { const chunk = data.toString(); stdout += chunk; process.stdout.write(chunk.substring(0, 200).replace(/\n/g, ' ') + '...\n'); });
    child.stderr.on('data', (data) => { stderr += data.toString(); });
    child.on('close', (code) => {
      const duration = ((Date.now() - startTime) / 1000).toFixed(0);
      if (code === 0) { console.log('✅ [' + stepName + '] Completed in ' + duration + 's'); resolve(stdout); }
      else { const error = new Error('Step "' + stepName + '" failed with exit code ' + code); error.stdout = stdout; error.stderr = stderr; reject(error); }
    });
    child.on('error', (err) => reject(err));
  });
}

async function runWithRetry(cwd, prompt, stepName, log) {
  for (let attempt = 1; attempt <= MAX_RATE_LIMIT_RETRIES; attempt++) {
    try {
      const output = await runClaudeStep(cwd, prompt, stepName);
      const waitMs = detectRateLimit(output);
      if (waitMs) { log('⏳ Rate limit, waiting ' + formatWaitTime(waitMs)); await sleep(waitMs); continue; }
      return output;
    } catch (err) {
      const combined = (err.stdout || '') + (err.stderr || '') + (err.message || '');
      const waitMs = detectRateLimit(combined);
      if (waitMs && attempt < MAX_RATE_LIMIT_RETRIES) { log('⏳ Rate limit, waiting ' + formatWaitTime(waitMs)); await sleep(waitMs); continue; }
      throw err;
    }
  }
}

export async function runPostSale(businessData, projectDir, log) {
  log('🎯 Starting post-sale steps for ' + businessData.BUSINESS_NAME);
  log('📁 Project dir: ' + projectDir);
  log('📋 Running ' + POST_SALE_STEPS.length + ' post-sale step(s)');

  for (const step of POST_SALE_STEPS) {
    const stepLabel = 'POST-SALE STEP ' + step.number + ' - ' + step.name;
    log('\n' + '='.repeat(60) + '\n' + stepLabel + '\n' + '='.repeat(60));
    const filledPrompt = fillPlaceholders(step.prompt, businessData);
    try {
      const output = await runWithRetry(projectDir, filledPrompt, stepLabel, log);
      await fs.writeFile(path.join(projectDir, 'post-sale-step-' + step.number + '-output.log'), output);
    } catch (err) {
      log('❌ ' + stepLabel + ' FAILED: ' + err.message);
      throw new Error('Post-sale failed at ' + stepLabel + ': ' + err.message);
    }
  }

  log('\n🎉 Post-sale steps complete');
  return { success: true, steps_completed: POST_SALE_STEPS.length };
}
