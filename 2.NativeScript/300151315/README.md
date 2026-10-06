# 300151315 - NativeScript

Application créée par **Toumi Ayoub**.

## Description
Application mobile NativeScript (Angular) qui affiche la liste des personnages de **One Piece** (l'équipage du Chapeau de paille).
Chaque personnage a une page de détails avec son origine et ses exploits.

## Création du projet
```
ns create B300151315
```
Options choisies : **Angular** et **Hello World**.

## Configuration (Windows)
```
npm install -g nativescript
setx ANDROID_HOME "%LOCALAPPDATA%\Android\Sdk"
setx GRADLE_USER_HOME "D:\pms\gradle"
ns doctor android
```

## Exécution
```
cd B300151315
ns run android
```

## Modification
Fichier modifié : `src/app/people/person.service.ts`
La liste d'informaticiens célèbres a été remplacée par les personnages de One Piece :
Luffy, Zoro, Nami, Usopp, Sanji, Chopper, Robin, Franky, Brook et Jinbe.

## Capture d'écran
![Application One Piece](images/app.jpg)

## Problèmes rencontrés et solutions

| Problème | Solution |
|---|---|
| `ns` non reconnu | `npm install -g nativescript` |
| `ANDROID_HOME` non configuré | `setx ANDROID_HOME "%LOCALAPPDATA%\Android\Sdk"` |
| Disque C: plein pendant la compilation | Déplacer le cache Gradle sur D: avec `GRADLE_USER_HOME` |
| `No project found` | Entrer dans le dossier `B300151315` avant `ns run` |