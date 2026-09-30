# Laboratoire NativeScript Angular — INF1083

**Étudiant :** B300157184  
**Cours :** INF1083 - Développement d'applications mobiles  
**Organisation / Dépôt :** `CollegeBoreal/INF1083-200-26A-05`  
**Identifiant de l'application :** `org.nativescript.B300157184`  



![Capture Émulateur Pixel 7]([./emulator.png](https://raw.githubusercontent.com/CollegeBoreal/INF1083-200-26A-05/15b6a4d0c93d4e90d51893653253ce1133d06387/2.NativeScript/B300157184/B300157184/emulator.png))
---

## 1. Description du projet

Ce projet est une application mobile développée avec le framework **NativeScript Angular** dans le cadre du cours INF1083. L'application charge une interface Angular exécutée de manière native sur Android.

---

## 2. Configuration de l'environnement de développement

Pour compiler et exécuter le projet localement, la configuration environnementale suivante a été mise en place sous Windows :

* **Java Development Kit (JDK) :** JDK 17 configuré dans la variable d'environnement `JAVA_HOME`.
* **Android SDK :**
  * Android SDK Tools & Build-Tools (v36.0.0).
  * Variable `ANDROID_HOME` pointant vers `C:\Users\Asus\AppData\Local\Android\Sdk`.
* **Émulateur :** Android Virtual Device (AVD) — Pixel 7 API 34 (`emulator-5554`).

---

## 3. Compilation et Exécution de l'Application

La compilation et le déploiement sur l'émulateur ont été effectués à l'aide de la CLI NativeScript :

```powershell
ns run android


git add .
git commit -m "Labo NativeScript complété - B300157184"
git pull origin main --rebase
git push origin main

---

### Étape 2 : Mettre à jour le fichier sur votre ordinateur

1. Ouvrez **Visual Studio Code** (ou le Bloc-notes).
2. Ouvrez le fichier `README.md` situé dans votre dossier `B300157184`.
3. Effacez le contenu actuel, collez le texte copié ci-dessus, puis **enregistrez le fichier** (`Ctrl + S`).

---

### Étape 3 : Envoyer la mise à jour sur GitHub

Dans votre terminal PowerShell, tapez ces 3 commandes pour mettre à jour GitHub :


```powershell
git add .
git commit -m "Mise à jour du README avec la documentation du labo"
git push
