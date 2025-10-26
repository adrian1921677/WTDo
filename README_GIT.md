# 🚀 WTDU - Auto Git Update System

## ✅ Was wurde implementiert:

### 1. **Auto-Update Scripts**
- `git-update.ps1` - PowerShell Version
- `git-update.bat` - Windows Batch Version
- Beide führen automatisch `git add .`, `commit`, `push` aus

### 2. **GitHub Synchronisation**
```bash
# Schnell alles zu GitHub pushen:
.\git-update.ps1

# Oder mit custom message:
.\git-update.ps1 -Message "Feature: Neues Feature"
```

### 3. **Repository Status**
- **URL:** https://github.com/adrian1921677/WTDo
- **Branch:** main
- **Auto-Sync:** ✅ Aktiv

## 📋 Nutzung

### Quick Update (Empfohlen)
```powershell
# Alles automatisch zu GitHub pushen
.\git-update.ps1
```

### Mit Beschreibung
```powershell
.\git-update.ps1 -Message "Fix: Bug behoben"
```

### Manuell
```bash
git add .
git commit -m "Deine Nachricht"
git push
```

## 🔄 Workflow

1. **Änderungen machen** in VS Code/Cursor
2. **`.\git-update.ps1`** ausführen
3. **Done!** → Auf GitHub gepusht

## 📊 Was passiert beim Script?

```
✅ git status --short    (zeigt Änderungen)
✅ git add .             (fügt alle hinzu)
✅ git commit -m "..."   (erstellt commit)
✅ git push              (pusht zu GitHub)
```

## 💡 Pro-Tipps

- Nutze beschreibende Commit-Messages
- Push nach größeren Änderungen
- Branch-namen für Features nutzen: `feature/xyz`

---

**Status:** ✅ Git Auto-Update System bereit!
**Repository:** https://github.com/adrian1921677/WTDo

