# Global Terminal Directory Setup

## Problem

The `run_terminal_cmd` tool in Cursor always starts in the workspace root, not in project subdirectories. This affects all projects where the actual code is in a subdirectory (like `ai-training-platform/`).

## Solution

We've created a PowerShell profile that automatically detects and navigates to project directories across all your projects.

## Setup (One-Time)

Run this command in PowerShell:

```powershell
cd "C:\Users\ddahd\Desktop\Projects\Tools\Documentation for TBS"
.\setup-global-terminal-profile.ps1
```

Or manually:

```powershell
# The script will:
# 1. Create/update your PowerShell profile
# 2. Add auto-detection logic for project directories
# 3. Work across all projects automatically
```

## How It Works

The PowerShell profile automatically:

1. **Detects workspace root** - Uses Cursor/VS Code environment variables
2. **Checks for common patterns**:
   - Subdirectories with `package.json`, `composer.json`, etc.
   - Common project folders (`src/`, `app/`, `lib/`, etc.)
   - Monorepo patterns (single subdirectory with project files)
   - `.vscode/settings.json` with `terminal.integrated.cwd` setting
3. **Navigates automatically** - Changes to the detected project directory

## Project-Specific Configuration

### Option 1: Use `.vscode/settings.json` (Recommended)

Add to your project's `.vscode/settings.json`:

```json
{
  "terminal.integrated.cwd": "${workspaceFolder}/your-project-subdirectory"
}
```

The PowerShell profile will read this and navigate automatically.

### Option 2: Use `.cursorrules`

Add to your project's `.cursorrules`:

```
### Terminal Usage
- Always `cd` to `your-project-subdirectory/` before commands
```

The AI will follow this pattern.

## Manual Override

If auto-detection doesn't work, you can manually run:

```powershell
Set-ProjectDirectory
```

## Testing

1. Close all terminals
2. Open a new terminal in Cursor
3. Check if it automatically navigated to the project directory:

```powershell
Get-Location
# Should show your project subdirectory, not workspace root
```

## Troubleshooting

### Profile Not Loading

Check if profile exists:
```powershell
Test-Path $PROFILE
```

Check profile content:
```powershell
Get-Content $PROFILE
```

### Not Detecting Project

1. Ensure `.vscode/settings.json` has `terminal.integrated.cwd` set
2. Or ensure project subdirectory has `package.json`/`composer.json`
3. Check workspace root detection:
```powershell
$env:VSCODE_WORKSPACE_FOLDER
$env:CURSOR_WORKSPACE_FOLDER
```

### Disable Auto-Navigation

Comment out the `Set-ProjectDirectory` call in your PowerShell profile:
```powershell
# Set-ProjectDirectory
```

## Benefits

✅ **Works across all projects** - No per-project setup needed  
✅ **Automatic detection** - Detects common project patterns  
✅ **Respects VS Code settings** - Reads `.vscode/settings.json`  
✅ **Manual override available** - Can call `Set-ProjectDirectory` manually  
✅ **Non-intrusive** - Only runs in Cursor/VS Code terminals  

## Notes

- The profile only runs in Cursor/VS Code terminals (detected via environment variables)
- Regular PowerShell windows are unaffected
- Each project can still have its own `.vscode/settings.json` for specific behavior
- The AI's `run_terminal_cmd` tool will still need explicit `cd` commands, but manual terminals will work correctly

