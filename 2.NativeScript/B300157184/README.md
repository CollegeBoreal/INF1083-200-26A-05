# Laboratoire NativeScript Angular — INF1083

**Étudiant :** B300157184  
**Cours :** INF1083 - Développement d'applications mobiles  
**Organisation / Dépôt :** `CollegeBoreal/INF1083-200-26A-05`  
**Identifiant de l'application :** `org.nativescript.B300157184`  

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
