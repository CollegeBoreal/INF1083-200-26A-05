# Laboratoire NativeScript — INF1083


 <image src=images/intfinale.jpeg width=50% height=50% > </image>



Ce projet a été réalisé par Anis Ouhocine (B300151496) dans le cadre du laboratoire du cours INF1083 – Développement d'applications mobiles, session Automne 2026. L'objectif du laboratoire était de mettre en place un environnement complet de développement mobile avec NativeScript, puis de créer, compiler et exécuter une première application sur un émulateur Android.

Le travail a commencé par l'installation de tous les outils nécessaires : Node.js version 24.21.0 avec npm 11.19.0, la NativeScript CLI version 9.1.1 installée globalement via npm, le JDK 17 (distribution Temurin) requis pour la compilation Android, ainsi que le SDK Android comprenant les platform-tools, la plateforme Android (API 36) et les build-tools 36.0.0. Une fois ces installations terminées, l'environnement a été vérifié avec la commande ns doctor, qui a confirmé que tout était correctement configuré avec le message « No issues were detected ».

Ensuite, la variable d'environnement ANDROID_HOME a été configurée pour pointer vers le SDK Android, et un émulateur Android a été créé et testé (API 37, image google_apis_playstore). Le projet lui-même a été généré avec la commande ns create B300151496, en choisissant le cadriciel Angular et le modèle de démarrage Hello World. Enfin, l'application a été compilée et lancée sur l'émulateur avec la commande ns run android : la compilation s'est terminée avec succès (« Project successfully built »), l'application a été installée et démarrée sur l'émulateur, et le rechargement à chaud (HMR) est resté actif pendant le développement, permettant de voir les modifications en direct.

## Personnalisation : liste de joueurs de basketball

L'application d'exemple affichait une liste de scientifiques. Elle a été personnalisée pour afficher une liste de **joueurs de basketball** :

- **Données** (`B300151496/src/app/people/person.service.ts`) : les 15 scientifiques ont été remplacés par 10 joueurs — Michael Jordan, LeBron James, Stephen Curry, Kobe Bryant, Shaquille O'Neal, Kevin Durant, Giannis Antetokounmpo, Nikola Jokic, Luka Doncic et Magic Johnson — en conservant la même structure (id, nom, nationalité, succès notables).
- **Affichage** (`B300151496/src/app/people/person.component.html`) : le titre est passé de « Computer Scientists » à « Joueurs de basketball ».

Les modifications ont été faites dans l'éditeur web de GitHub, rapatriées en local avec `git pull`, puis l'application a été recompilée et réinstallée sur l'émulateur avec `ns run android`. La nouvelle liste s'affiche correctement.

## Problèmes rencontrés et solutions

- **L'émulateur ne se lançait plus** (fichier `libandroid-emu-metrics.dll` introuvable) : réinstallation de l'émulateur avec `sdkmanager "emulator"`.
- **Plusieurs instances de l'émulateur en conflit** (erreur FATAL) : arrêt des processus bloqués avec `taskkill`.
- **Espace disque insuffisant** pour démarrer l'émulateur : corbeille vidée, puis redémarrage sans l'ancien état (`-no-snapshot-load`).

Pour relancer le projet, il suffit de disposer de Node.js, de la NativeScript CLI, du JDK 17 et du SDK Android correctement installés et configurés, puis d'exécuter la commande ns run android depuis le dossier du projet. Une capture d'écran de l'application en cours d'exécution sur l'émulateur est disponible dans le dossier images.


<image src=images/WhatsApp%20Image%202026-10-06.jpeg width=50% height=50% > </image>


<image src=images/intfinale.jpeg width=50% height=50% > </image>
