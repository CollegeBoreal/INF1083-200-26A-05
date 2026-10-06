# Laboratoire NativeScript — INF1083

Ce projet a été réalisé par Anis Ouhocine (B300151496) dans le cadre du laboratoire du cours INF1083 – Développement d'applications mobiles, session Automne 2026. L'objectif du laboratoire était de mettre en place un environnement complet de développement mobile avec NativeScript, puis de créer, compiler et exécuter une première application sur un émulateur Android.

Le travail a commencé par l'installation de tous les outils nécessaires : Node.js version 24.21.0 avec npm 11.19.0, la NativeScript CLI version 9.1.1 installée globalement via npm, le JDK 17 (distribution Temurin) requis pour la compilation Android, ainsi que le SDK Android comprenant les platform-tools, la plateforme Android (API 36) et les build-tools 36.0.0. Une fois ces installations terminées, l'environnement a été vérifié avec la commande ns doctor, qui a confirmé que tout était correctement configuré avec le message « No issues were detected ».

Ensuite, la variable d'environnement ANDROID_HOME a été configurée pour pointer vers le SDK Android, et un émulateur Android a été créé et testé (API 37, image google_apis_playstore). Le projet lui-même a été généré avec la commande ns create B300151496, en choisissant le cadriciel Angular et le modèle de démarrage Hello World. Enfin, l'application a été compilée et lancée sur l'émulateur avec la commande ns run android : la compilation s'est terminée avec succès (« Project successfully built »), l'application a été installée et démarrée sur l'émulateur, et le rechargement à chaud (HMR) est resté actif pendant le développement, permettant de voir les modifications en direct.

Pour relancer le projet, il suffit de disposer de Node.js, de la NativeScript CLI, du JDK 17 et du SDK Android correctement installés et configurés, puis d'exécuter la commande ns run android depuis le dossier du projet. Une capture d'écran de l'application en cours d'exécution sur l'émulateur est disponible dans le dossier images.

<image src=images/WhatsApp%20Image%202026-10-06.jpeg width=50% height=50% > </image>


<image src=images/IMG_4291.jpeg width=50% height=50% > </image>
