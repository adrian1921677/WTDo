@echo off
echo 🔄 WTDU Git Update
echo.
echo 📦 Adding all changes...
git add .

echo 💾 Committing changes...
git commit -m "Update: Automated commit via batch script"

echo 🚀 Pushing to GitHub...
git push

echo.
echo ✅ Git update complete!
pause

