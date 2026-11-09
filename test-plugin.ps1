#!/usr/bin/env pwsh
# Test script for mempalace-persistent-kilo plugin
# Usage: .\test-plugin.ps1

$ErrorActionPreference = "Continue"

Write-Host "=== MemPalace Plugin Test ===" -ForegroundColor Cyan

# 1. Check plugin installed
$pluginPath = "C:\Users\delac\.config\kilo\node_modules\mempalace-persistent-kilo"
if (Test-Path -LiteralPath $pluginPath) {
    Write-Host "[OK] Plugin directory exists" -ForegroundColor Green
} else {
    Write-Host "[FAIL] Plugin directory not found" -ForegroundColor Red
    exit 1
}

# 2. Check dist files
$distPath = "$pluginPath\dist\index.js"
if (Test-Path -LiteralPath $distPath) {
    Write-Host "[OK] dist/index.js exists" -ForegroundColor Green
} else {
    Write-Host "[FAIL] dist/index.js not found" -ForegroundColor Red
    exit 1
}

# 3. Check package.json
$pkgJson = Get-Content -LiteralPath "$pluginPath\package.json" -Raw | ConvertFrom-Json
Write-Host "[OK] Plugin: $($pkgJson.name) v$($pkgJson.version)" -ForegroundColor Green

# 4. Check kilo.jsonc has plugin registered
$kiloConfig = "C:\Users\delac\.config\kilo\kilo.jsonc"
$configContent = Get-Content -LiteralPath $kiloConfig -Raw
if ($configContent -match "mempalace-persistent-kilo") {
    Write-Host "[OK] Plugin registered in kilo.jsonc" -ForegroundColor Green
} else {
    Write-Host "[FAIL] Plugin not registered in kilo.jsonc" -ForegroundColor Red
    exit 1
}

# 5. Check mempalace-config.json exists
$configPath = "C:\ProyectosIA\mempalace-persistent-kilo\mempalace-config.json"
if (Test-Path -LiteralPath $configPath) {
    $cfg = Get-Content -LiteralPath $configPath -Raw | ConvertFrom-Json
    Write-Host "[OK] Config: autoInject=$($cfg.autoInject), mineOnIdle=$($cfg.mineOnIdle)" -ForegroundColor Green
} else {
    Write-Host "[WARN] Config file not found, using defaults" -ForegroundColor Yellow
}

# 6. Check identity file
$identityPath = "C:\Users\delac\.mempalace\identity.txt"
if (Test-Path -LiteralPath $identityPath) {
    $identity = Get-Content -LiteralPath $identityPath -Raw
    Write-Host "[OK] Identity: $($identity.Substring(0, [Math]::Min(50, $identity.Length)))..." -ForegroundColor Green
} else {
    Write-Host "[WARN] Identity file not found" -ForegroundColor Yellow
}

# 7. Check mp-write.py
$mpWritePath = "C:\Users\delac\.mempalace\mp-write.py"
if (Test-Path -LiteralPath $mpWritePath) {
    Write-Host "[OK] mp-write.py exists" -ForegroundColor Green
} else {
    Write-Host "[WARN] mp-write.py not found" -ForegroundColor Yellow
}

# 8. Check palace directory
$palacePath = "C:\ProyectosIA\mempalace-memory"
if (Test-Path -LiteralPath $palacePath) {
    Write-Host "[OK] Palace directory exists" -ForegroundColor Green
} else {
    Write-Host "[WARN] Palace directory not found" -ForegroundColor Yellow
}

# 9. Test plugin module load
Write-Host "`n--- Testing plugin module load ---" -ForegroundColor Cyan
try {
    $module = node -e "import('file:///C:/Users/delac/.config/kilo/node_modules/mempalace-persistent-kilo/dist/index.js').then(m => { console.log(JSON.stringify({default: typeof m.default, server: typeof m.default?.server})) })"
    $result = $module | ConvertFrom-Json
    if ($result.server -eq "function") {
        Write-Host "[OK] Plugin server function loaded" -ForegroundColor Green
    } else {
        Write-Host "[FAIL] server is not a function: $($result.server)" -ForegroundColor Red
    }
} catch {
    Write-Host "[FAIL] Module load error: $($_.Exception.Message)" -ForegroundColor Red
}

# 10. Check TypeScript compilation
Write-Host "`n--- Testing TypeScript compilation ---" -ForegroundColor Cyan
try {
    $tscResult = npx tsc --noEmit 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "[OK] TypeScript compilation: 0 errors" -ForegroundColor Green
    } else {
        Write-Host "[FAIL] TypeScript errors found" -ForegroundColor Red
    }
} catch {
    Write-Host "[FAIL] tsc error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n=== Test Complete ===" -ForegroundColor Cyan
Write-Host "To test in Kilo, restart the application and check logs for [mempalace] messages."