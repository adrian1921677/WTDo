# 🔄 WTDU Git Workflow

## Automatisches Update zu GitHub

### Windows PowerShell
```powershell
.\git-update.ps1
```

### Windows Batch
```batch
.\git-update.bat
```

### Manuell
```bash
git add .
git commit -m "Deine Nachricht"
git push
```

## Was passiert automatisch?

✅ Alle Änderungen werden hinzugefügt (`git add .`)  
✅ Commit wird erstellt mit Beschreibung  
✅ Alles wird zu GitHub gepusht (`git push`)  

## Mit Custom Message

```powershell
.\git-update.ps1 -Message "Feature: Neue Funktion hinzugefügt"
```

## GitHub Repository

**URL:** https://github.com/adrian1921677/WTDo  
**Branch:** main  
**Status:** ✅ Auto-Synced

## Commits Format

- `Update: ` - Automatische Updates
- `Fix: ` - Bug Fixes
- `Feature: ` - Neue Features
- `Refactor: ` - Code-Umstrukturierung
- `Docs: ` - Dokumentation

---

**Pro-Tipp:** Nutze die Scripts für schnelle Updates ohne manuelle Git-Befehle!

