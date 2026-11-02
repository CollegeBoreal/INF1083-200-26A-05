#Description

Application mobile créée avec NativeScript (Angular). Elle permet d'afficher une liste de personnages de One Piece et de consulter des informations sur chaque personnage. Le but est de découvrir le fonctionnement d'une application mobile et de comprendre comment afficher des données.

#Création du projet

ns create B300150411

Options choisies : Angular et Hello World.

Configuration (Windows)

npm install -g nativescript
setx ANDROID_HOME "%LOCALAPPDATA%\Android\Sdk"
setx GRADLE_USER_HOME "D:\pms\gradle"
ns doctor android

#Exécution

cd B300150411
ns run android

#Modification

Fichier à modifier : src/app/people/person.service.ts

Le travail consiste à modifier la liste des personnages affichés dans l'application. Les personnages choisis sont Luffy, Zoro, Nami, Usopp, Sanji, Chopper, Robin, Franky, Brook et Jinbe.

Capture d'écran

Ajouter une capture d'écran de l'application après son exécution.

Problèmes rencontrés et solutions

Problème

Solution

La commande ns n'est pas reconnue    Installer NativeScript avec npm.

Android SDK non configuré       Vérifier et configurer la variable ANDROID_HOME.

Problème de compilation       Vérifier la configuration d'Android et de Gradle.

Aucun projet trouvé

Vérifier que le terminal est dans le dossier du projet.
