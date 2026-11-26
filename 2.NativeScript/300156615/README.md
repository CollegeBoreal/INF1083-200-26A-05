# \# 📱 INF1083 – NativeScript

# 

# \*\*Étudiant :walid lahsaien

# \*\*Numéro étudiant :\*\* 300156615

# \*\*Cours :\*\* INF1083 — Développement d'applications

# \*\*Session :\*\* Automne 2026

# 

# \---

# 

# \## 1. 🎯 Objectif

# 

# Créer et exécuter une première application mobile avec NativeScript + Angular, puis modifier la liste affichée par l'application.

# 

# \---

# 

# \## 2. 📋 Présentation du projet

# 

# | Élément | Valeur |

# |---------|--------|

# | Nom de l'application | B300156615 |

# | Framework | NativeScript 9.1.2 avec Angular |

# | Modèle | Hello World (Angular) |

# | Système | Windows 11 — cmd |

# | Émulateur | Medium Phone API 37 |

# | Node.js / npm / Git | v26.13.0 / 11.20.0 / 2.51.0 |

# 

# !\[Versions des outils](images/01-versions.png)

# 

# Vérification de l'environnement avec `ns doctor` : aucun problème détecté (ANDROID\_HOME, adb, SDK Android, Java et JDK configurés).

# 

# !\[ns doctor](images/02-ns-doctor.png)

# 

# \---

# 

# \## 3. 📁 Où est le code ?

# 

# ```

# 2.NativeScript/300156615/

# ├── README.md

# ├── images/

# └── B300156615/                             ← projet NativeScript

# &#x20;   ├── package.json

# &#x20;   ├── nativescript.config.ts

# &#x20;   ├── App\_Resources/

# &#x20;   └── src/app/people/

# &#x20;       ├── person.service.ts               ← liste modifiée

# &#x20;       ├── person.component.html           ← titre modifié

# &#x20;       └── person-detail.component.html    ← page de détails en français

# ```

# 

# \---

# 

# \## 4. ▶️ Exécuter le code

# 

# ```cmd

# cd 2.NativeScript\\300156615\\B300156615

# npm install

# ns run android

# ```

# 

# \- `npm install` télécharge les dépendances (`node\_modules` n'est pas dans GitHub).

# \- `ns run android` compile le projet et l'installe sur l'émulateur.

# 

# \---

# 

# \## 5. 🏗️ Création de l'application

# 

# J'ai installé Node.js, npm, Git et la CLI NativeScript (`npm install -g nativescript`), puis Android Studio avec le SDK Android et un émulateur (Medium Phone API 37).

# 

# Création du projet :

# 

# ```cmd

# ns create B300156615

# ```

# 

# J'ai choisi \*\*Angular\*\* et le modèle \*\*Hello World\*\*.

# 

# !\[Projet créé](images/08-projet-cree.png)

# 

# Démarrage de l'émulateur et vérification avec `adb devices` :

# 

# ```cmd

# %ANDROID\_HOME%\\emulator\\emulator -avd Medium\_Phone\_API\_37.0

# adb devices

# ```

# 

# !\[Émulateur](images/04-emulateur.png)

# !\[adb devices](images/05-adb-devices.png)

# 

# Compilation et exécution :

# 

# ```cmd

# cd B300156615

# ns run android

# ```

# 

# Le build a réussi, l'application

