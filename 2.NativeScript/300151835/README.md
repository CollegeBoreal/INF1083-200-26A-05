# Travail 2 — Première application NativeScript

**Liza Benhammouche · 300151835 · INF1083**

## Objectif

Créer une première application mobile avec NativeScript et Angular, puis la lancer sur Android pour vérifier que le modèle Hello World fonctionne.

## 1. Préparer Windows

Installer Node.js LTS et configurer Android Studio, le SDK Android et un appareil virtuel. Les étapes détaillées figurent dans le [guide d’installation du cours](../1.Installation/README.md).

Dans PowerShell, vérifier les outils et installer la CLI NativeScript.

```powershell
node --version
npm --version
npm install -g nativescript
ns doctor android
```

## 2. Créer le projet

Depuis la racine du dépôt du cours, exécuter les commandes suivantes pour générer le projet dans ce dossier. Avec la commande interactive `ns create B300151835`, choisir **Angular**, puis **Hello World**. L’option `--ng` sélectionne ce modèle directement.

```powershell
Set-Location 2.NativeScript/300151835
ns create B300151835 --ng
Set-Location B300151835
```

## 3. Lancer l’application

Démarrer un émulateur dans le **Device Manager** d’Android Studio ou connecter un téléphone Android configuré pour le débogage USB. Vérifier que l’appareil apparaît, puis lancer le projet.

```powershell
adb devices
ns run android
```

## 4. Vérifier le résultat

L’écran d’accueil du modèle doit s’afficher sur Android. Dans le modèle Hello World Angular qui présente une liste, toucher une ligne doit ouvrir sa page de détails. Le dossier `images/` est prévu pour les captures prises pendant cette vérification.

**État de la vérification** · La procédure est documentée. L’exécution sur Android et la capture restent à réaliser.

## Références

- [Consignes du travail](../README.md)
- [Modèle officiel Hello World pour NativeScript et Angular](https://github.com/NativeScript/nativescript-app-templates/tree/main/packages/template-hello-world-ng)
