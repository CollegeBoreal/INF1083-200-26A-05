# NativeScript - Participation

**Étudiant :** Nabil  
**Numéro étudiant :** 300151732  
**Cours :** INF1083-200-26A-05

---

# Objectif

Installer l'environnement de développement NativeScript, créer une première application Angular Hello World et l'exécuter sur un émulateur Android.

---

# Structure du projet

```text
300151732
│
├── README.md
├── images
└── B300151732
```

---

# Installation de NativeScript

Validation de l'installation :

```powershell
ns --version
```

Résultat :

```text
9.1.2
Up to date
```

images/01-ns-version.png

---

# Installation du JDK 21

Validation :

```powershell
javac -version
```

Résultat :

```text
javac 21.0.13.1
```

images/02-jdk.png

---

# Configuration de JAVA_HOME

Commande de validation :

```powershell
$env:JAVA_HOME
```

Résultat :

```text
C:\Program Files\Eclipse Adoptium\jdk-21.0.13.10002-hotspot
```

images/03-java-home.png

---

# Installation d'Android Studio

Installation d'Android Studio Rabbit 2 avec :

- Android SDK
- Android Virtual Device
- Android Platform Tools

images/04-android-studio.png

---

# Configuration du SDK Android

Validation :

```powershell
$env:ANDROID_HOME
```

Résultat :

```text
C:\Users\nabil\AppData\Local\Android\Sdk
```

Validation d'ADB :

```powershell
adb --version
```

Résultat :

```text
Android Debug Bridge version 1.0.41
```

images/06-android-home.png

---

# Vérification de l'environnement

Commande :

```powershell
ns doctor
```

Résultat :

```text
No issues were detected.
```

Tous les composants requis ont été validés avec succès.

images/07-ns-doctor.png

---

# Création du projet NativeScript

Commande :

```powershell
ns create B300151732
```

Options sélectionnées :

- Angular
- Hello World

images/08-ns-create-choix.png

Résultat :

```text
Project B300151732 was successfully created.
```

images/09-ns-create-succes.png

---

# Création de l'émulateur Android

Création d'un appareil virtuel :

- Medium Phone API 37.0
- Android 17
- Architecture x86_64

images/10-emulateur.png

---

# Vérification de l'émulateur

Commande :

```powershell
adb devices
```

Résultat :

```text
List of devices attached
emulator-5554   device
```

images/11-adb-devices.png

---

# Exécution de l'application

Commande :

```powershell
ns run android
```

Résultat :

```text
Successfully installed on device emulator-5554.
Successfully synced application org.nativescript.B300151732.
Angular is running in development mode.
```

L'application a été exécutée avec succès dans l'émulateur Android.

images/12-premier-lancement.png

---

# Conclusion

Cette activité a permis :

- d'installer NativeScript 9.1.2 ;
- d'installer le JDK 21 ;
- d'installer Android Studio ;
- de configurer JAVA_HOME et ANDROID_HOME ;
- de valider l'environnement avec `ns doctor` ;
- de créer un projet Angular Hello World ;
- de créer un émulateur Android ;
- de déployer et exécuter l'application avec succès.

L'environnement NativeScript est maintenant complètement opérationnel.

---

# Références

- https://nativescript.org/
- https://openjsf.org/blog/nativescript-9-1
- https://roadmap.sh/frontend
