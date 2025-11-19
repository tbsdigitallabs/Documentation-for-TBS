# PowerShell Profile Setup for Cursor/VS Code
# This script sets up a global PowerShell profile that auto-detects project directories
# Run this once to set up the profile for all projects

# Use the actual profile path (works for both profile.ps1 and Microsoft.PowerShell_profile.ps1)
$profilePath = if (Test-Path $PROFILE) { 
    $PROFILE 
} else { 
    $PROFILE.CurrentUserAllHosts 
}
$profileDir = Split-Path -Parent $profilePath

# Create profile directory if it doesn't exist
if (-not (Test-Path $profileDir)) {
    New-Item -ItemType Directory -Path $profileDir -Force | Out-Null
}

# Check if profile already exists
$profileExists = Test-Path $profilePath
$backupPath = "$profilePath.backup.$(Get-Date -Format 'yyyyMMdd-HHmmss')"

# Backup existing profile if it exists
if ($profileExists) {
    Copy-Item $profilePath $backupPath -Force
    Write-Host "✓ Backed up existing profile to: $backupPath" -ForegroundColor Yellow
}

# Create the profile content
$profileContent = @'
# Auto-detect project directory when terminal opens
# This works across all projects by detecting common patterns

function Set-ProjectDirectory {
    $currentPath = Get-Location
    
    # Common project subdirectories to check
    $commonDirs = @(
        'src',
        'app',
        'lib',
        'packages',
        'apps',
        'frontend',
        'backend',
        'client',
        'server'
    )
    
    # Check if we're in a workspace root with a common project structure
    $workspaceRoot = if ($env:VSCODE_WORKSPACE_FOLDER) { 
        $env:VSCODE_WORKSPACE_FOLDER 
    } elseif ($env:CURSOR_WORKSPACE_FOLDER) { 
        $env:CURSOR_WORKSPACE_FOLDER 
    } else {
        # Try to detect from current path
        $path = Get-Location
        while ($path.Path -ne $path.Drive.Root) {
            if (Test-Path (Join-Path $path.Path '.git') -ErrorAction SilentlyContinue) {
                $path.Path
                break
            }
            $path = Split-Path -Parent $path.Path
        }
    }
    
    if ($workspaceRoot) {
        # Check for common project patterns
        $packageJson = Join-Path $workspaceRoot 'package.json'
        $composerJson = Join-Path $workspaceRoot 'composer.json'
        $pomXml = Join-Path $workspaceRoot 'pom.xml'
        
        # If root has package.json/composer.json, check for subdirectories
        if ((Test-Path $packageJson) -or (Test-Path $composerJson) -or (Test-Path $pomXml)) {
            # Check for common subdirectory patterns
            foreach ($dir in $commonDirs) {
                $subDir = Join-Path $workspaceRoot $dir
                if (Test-Path $subDir -PathType Container) {
                    Set-Location $subDir
                    return
                }
            }
            
            # Check for single subdirectory with package.json (monorepo pattern)
            $subdirs = Get-ChildItem -Path $workspaceRoot -Directory -ErrorAction SilentlyContinue | 
                       Where-Object { 
                           (Test-Path (Join-Path $_.FullName 'package.json')) -or
                           (Test-Path (Join-Path $_.FullName 'composer.json'))
                       }
            
            if ($subdirs.Count -eq 1) {
                Set-Location $subdirs[0].FullName
                return
            }
        }
        
        # Check for .cursorrules or .vscode/settings.json with terminal.cwd
        $cursorRules = Join-Path $workspaceRoot '.cursorrules'
        $vscodeSettings = Join-Path $workspaceRoot '.vscode/settings.json'
        
        if (Test-Path $vscodeSettings) {
            $settings = Get-Content $vscodeSettings -Raw | ConvertFrom-Json -ErrorAction SilentlyContinue
            if ($settings.'terminal.integrated.cwd') {
                $cwd = $settings.'terminal.integrated.cwd' -replace '\$\{workspaceFolder\}', $workspaceRoot
                if (Test-Path $cwd) {
                    Set-Location $cwd
                    return
                }
            }
        }
    }
}

# Only run if we're in Cursor/VS Code (not in regular PowerShell)
if ($env:TERM_PROGRAM -eq 'vscode' -or $env:CURSOR -eq '1' -or $env:VSCODE_INJECTION) {
    Set-ProjectDirectory
}

# Function is available for manual use: Set-ProjectDirectory
'@

# Write the profile
Set-Content -Path $profilePath -Value $profileContent -Encoding UTF8

Write-Host "✓ PowerShell profile created at: $profilePath" -ForegroundColor Green
Write-Host ""
Write-Host "The profile will automatically detect project directories when you open terminals." -ForegroundColor Cyan
Write-Host "To test, close and reopen your terminal." -ForegroundColor Cyan
Write-Host ""
Write-Host "You can also manually run: Set-ProjectDirectory" -ForegroundColor Yellow

