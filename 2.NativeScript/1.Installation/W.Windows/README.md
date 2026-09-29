# 🪟 Installation sous Windows

## Étape 1 – Installer Chocolatey

Ouvrir PowerShell en tant qu'administrateur.

```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force
```

```powershell
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
```

```powershell
iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

Vérifier l'installation :

```powershell
choco --version
```

---

## Étape 2 – Installer Node.js

```powershell
choco install nodejs-lts -y
```

Vérification :

```powershell
node --version
```

```powershell
npm --version
```

---

## Étape 3 – Installer NativeScript

```powershell
npm install -g nativescript
```

Vérification :

```powershell
ns --version
```

ou

```powershell
ns doctor
```

