# WTDU Git Update Script
# Führt automatisch: git add, commit, push

param(
    [string]$Message = "Update: Automated commit via git-update script"
)

Write-Host "🔄 Updating Git repository..." -ForegroundColor Cyan

# Status check
git status --short
Write-Host ""

# Add all changes
Write-Host "📦 Adding all changes..." -ForegroundColor Yellow
git add .

# Commit
Write-Host "💾 Committing changes..." -ForegroundColor Yellow
git commit -m $Message

# Push
Write-Host "🚀 Pushing to GitHub..." -ForegroundColor Green
git push

Write-Host ""
Write-Host "✅ Git update complete!" -ForegroundColor Green

