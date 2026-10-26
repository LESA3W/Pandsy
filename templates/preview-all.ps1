# preview-all.ps1
#
# Lance les 9 templates en parallele (3 ports par categorie) et ouvre 9 onglets
# dans Chrome des qu'ils sont prets.
#
# Premiere run : ~25-30 minutes (pnpm install x9). Tu peux aller boire un cafe.
# Runs suivants : ~30 secondes (les .preview/ existent deja avec node_modules).
#
# Usage :
#   .\preview-all.ps1               # toutes les 9 templates
#   .\preview-all.ps1 -Fresh        # force reset des .preview/ (resync code source)
#   .\preview-all.ps1 -Stop         # tue tous les dev servers en cours
#
# Astuce : pour stopper proprement, utilise -Stop. Ou ferme manuellement les
# 9 fenetres PowerShell minimisees dans la barre des taches.

param(
    [switch]$Fresh,
    [switch]$Stop
)

$ErrorActionPreference = "Stop"
$TemplatesRoot = Split-Path -Parent $MyInvocation.MyCommand.Path

# Definition des 9 templates avec leurs ports + couleurs UI
$Templates = @(
    @{ Path = "AUTO_REPAIR/Template_1";  Port = 3001; Label = "AUTO_REPAIR T1";  Color = "Yellow" }
    @{ Path = "AUTO_REPAIR/Template_2";  Port = 3002; Label = "AUTO_REPAIR T2";  Color = "Yellow" }
    @{ Path = "AUTO_REPAIR/Template_3";  Port = 3003; Label = "AUTO_REPAIR T3";  Color = "Yellow" }
    @{ Path = "PLUMBERS/Template_1";     Port = 3004; Label = "PLUMBERS T1";     Color = "Cyan"   }
    @{ Path = "PLUMBERS/Template_2";     Port = 3005; Label = "PLUMBERS T2";     Color = "Cyan"   }
    @{ Path = "PLUMBERS/Template_3";     Port = 3006; Label = "PLUMBERS T3";     Color = "Cyan"   }
    @{ Path = "ELECTRICIANS/Template_1"; Port = 3007; Label = "ELECTRICIANS T1"; Color = "Green"  }
    @{ Path = "ELECTRICIANS/Template_2"; Port = 3008; Label = "ELECTRICIANS T2"; Color = "Green"  }
    @{ Path = "ELECTRICIANS/Template_3"; Port = 3009; Label = "ELECTRICIANS T3"; Color = "Green"  }
)

# === Mode -Stop ============================================================
if ($Stop) {
    Write-Host "Stopping all preview dev servers..." -ForegroundColor Magenta
    Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force
    Write-Host "  done. All Node processes killed." -ForegroundColor Green
    exit 0
}

# === Verifications =========================================================
Write-Host "P&S Agency - Preview All Templates" -ForegroundColor Magenta
Write-Host "Templates root: $TemplatesRoot" -ForegroundColor DarkGray
Write-Host ""

# Verifie que pnpm est dispo
try {
    $null = Get-Command pnpm -ErrorAction Stop
} catch {
    Write-Host "ERROR: pnpm not found in PATH." -ForegroundColor Red
    Write-Host "  Install via: npm install -g pnpm" -ForegroundColor DarkGray
    exit 1
}

# Verifie que toutes les templates existent
$missing = @()
foreach ($t in $Templates) {
    $tPath = Join-Path $TemplatesRoot $t.Path
    if (-not (Test-Path $tPath)) {
        $missing += $t.Label
    }
}
if ($missing.Count -gt 0) {
    Write-Host "ERROR: Templates manquantes :" -ForegroundColor Red
    foreach ($m in $missing) { Write-Host "  - $m" -ForegroundColor Red }
    Write-Host ""
    Write-Host "Genere les templates manquantes d'abord, ou commente les" -ForegroundColor DarkGray
    Write-Host "lignes correspondantes dans `$Templates en haut du script." -ForegroundColor DarkGray
    exit 1
}

# Tue les anciens Node si encore en route
$existingNode = Get-Process node -ErrorAction SilentlyContinue
if ($existingNode) {
    Write-Host "Killing $($existingNode.Count) existing Node process(es)..." -ForegroundColor Yellow
    $existingNode | Stop-Process -Force
    Start-Sleep -Seconds 1
}

# === Etape 1 : preparer les .preview/ (sync code + install) ================
Write-Host "Step 1/3 - Preparing .preview/ folders..." -ForegroundColor Magenta
Write-Host ""

foreach ($t in $Templates) {
    $tPath = Join-Path $TemplatesRoot $t.Path
    $previewPath = Join-Path $tPath ".preview"
    $hasNodeModules = Test-Path (Join-Path $previewPath "node_modules")

    if ($Fresh -or -not (Test-Path $previewPath)) {
        Write-Host "  [$($t.Label)] " -NoNewline -ForegroundColor $t.Color
        Write-Host "building .preview/ from scratch (will pnpm install)..." -ForegroundColor DarkGray
        Push-Location $TemplatesRoot
        if (Test-Path $previewPath) {
            Remove-Item $previewPath -Recurse -Force
        }
        node scripts/preview-prepare.mjs $t.Path 2>&1 | Out-Null
        Pop-Location
        Write-Host "    done." -ForegroundColor Green
    }
    elseif (-not $hasNodeModules) {
        Write-Host "  [$($t.Label)] " -NoNewline -ForegroundColor $t.Color
        Write-Host "node_modules missing - running pnpm install..." -ForegroundColor DarkGray
        Push-Location $previewPath
        pnpm install --silent 2>&1 | Out-Null
        Pop-Location
        Write-Host "    done." -ForegroundColor Green
    }
    else {
        Write-Host "  [$($t.Label)] " -NoNewline -ForegroundColor $t.Color
        Write-Host ".preview/ already prepared (skip)." -ForegroundColor DarkGray
    }
}

Write-Host ""

# === Etape 2 : demarrer les 9 dev servers en parallele =====================
Write-Host "Step 2/3 - Starting 9 dev servers in parallel..." -ForegroundColor Magenta
Write-Host ""

$processes = @()
foreach ($t in $Templates) {
    $previewPath = Join-Path $TemplatesRoot (Join-Path $t.Path ".preview")
    $port = $t.Port
    $label = $t.Label

    $cmd = "Set-Location '$previewPath'; `$Host.UI.RawUI.WindowTitle = '$label (port $port)'; pnpm exec next dev --port $port"
    $proc = Start-Process -FilePath "powershell.exe" -ArgumentList "-NoExit", "-Command", $cmd -PassThru -WindowStyle Minimized
    $processes += @{ Process = $proc; Port = $port; Label = $label; Color = $t.Color }
    Write-Host "  [$label] " -NoNewline -ForegroundColor $t.Color
    Write-Host "starting on port $port (PID $($proc.Id))..." -ForegroundColor DarkGray
}

Write-Host ""
Write-Host "Step 3/3 - Waiting for servers to be ready..." -ForegroundColor Magenta
Write-Host ""

# === Etape 3 : attendre que chaque port reponde, puis ouvrir les onglets ===
$urls = @()
foreach ($p in $processes) {
    $port = $p.Port
    $label = $p.Label
    $color = $p.Color
    $ready = $false
    $maxWait = 90  # secondes - Next.js prend ~10-30s pour compiler la premiere fois

    Write-Host "  [$label] " -NoNewline -ForegroundColor $color
    Write-Host "waiting on http://localhost:$port ..." -NoNewline -ForegroundColor DarkGray

    $elapsed = 0
    for ($i = 0; $i -lt $maxWait; $i++) {
        try {
            $r = Invoke-WebRequest -Uri "http://localhost:$port" -UseBasicParsing -TimeoutSec 1 -ErrorAction Stop
            if ($r.StatusCode -eq 200) {
                $ready = $true
                $elapsed = $i
                break
            }
        } catch {
            Start-Sleep -Seconds 1
        }
    }

    if ($ready) {
        Write-Host " ready (${elapsed}s)" -ForegroundColor Green
        $urls += "http://localhost:$port"
    } else {
        Write-Host " TIMEOUT after ${maxWait}s - skipping" -ForegroundColor Red
    }
}

Write-Host ""

if ($urls.Count -eq 0) {
    Write-Host "No servers came online. Aborting tab open." -ForegroundColor Red
    exit 1
}

# === Ouvrir Chrome avec tous les URLs en onglets ===========================
Write-Host "Opening $($urls.Count) tabs in Chrome..." -ForegroundColor Magenta

$chromePaths = @(
    "C:\Program Files\Google\Chrome\Application\chrome.exe",
    "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
    "$env:LOCALAPPDATA\Google\Chrome\Application\chrome.exe"
)
$chrome = $null
foreach ($p in $chromePaths) {
    if (Test-Path $p) { $chrome = $p; break }
}

if ($chrome) {
    & $chrome --new-window $urls
} else {
    Write-Host "  Chrome not found - opening with default browser..." -ForegroundColor Yellow
    foreach ($u in $urls) {
        Start-Process $u
        Start-Sleep -Milliseconds 200
    }
}

Write-Host ""
Write-Host "All set! $($urls.Count) templates running." -ForegroundColor Green
Write-Host ""
Write-Host "Tips:" -ForegroundColor DarkGray
Write-Host "  - To stop everything : .\preview-all.ps1 -Stop" -ForegroundColor DarkGray
Write-Host "  - To force a fresh build (after code changes) : .\preview-all.ps1 -Fresh" -ForegroundColor DarkGray
Write-Host "  - Each dev server is in its own minimized PowerShell window - check the taskbar if you need logs." -ForegroundColor DarkGray
