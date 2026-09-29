# 🍎 Installation sous macOS

## Étape 1 – Installer Homebrew

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Vérification :

```bash
brew --version
```

---

## Étape 2 – Installer Node.js

```bash
brew install node
```

Vérification :

```bash
node --version
```

```bash
npm --version
```

---

## Étape 3 – Installer NativeScript

```bash
npm install -g nativescript
```

Vérification :

```bash
ns --version
```

ou

```bash
ns doctor
```

---

# 🍏 Développement iOS (macOS uniquement)

## Installer Xcode

Installer Xcode depuis l'App Store.

Vérifier l'installation :

```bash
xcodebuild -version
```

---

## Ouvrir le simulateur iPhone

```bash
open -a Simulator
```

