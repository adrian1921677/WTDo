# Auto-push to GitHub after changes
# Usage: Call this after making changes

param(
    [string]$Message = "Update: Changes committed and pushed"
)

# Quick update without output
git add . 2>&1 | Out-Null
git commit -m $Message 2>&1 | Out-Null
git push 2>&1 | Out-Null

Write-Host "✅ Pushed to GitHub" -ForegroundColor Green

