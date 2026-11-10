# 300156497
# 📱 Exécution de l’application sur Android

# Configuration du JDK Java
Cette capture montre la configuration du JDK Java 21 dans PowerShell. La commande `javac --version` confirme que Java est correctement reconnu par le système et peut être utilisé pour la compilation de l'application NativeScript Android.
![images alt](https://github.com/CollegeBoreal/INF1083-200-26A-05/blob/main/2.NativeScript/300156497/images/Capture%20d'%C3%A9cran%202026-10-13%20175220.png?raw=true)

# ✅ Vérification de l’environnement Android
La commande ns doctor android confirme que NativeScript, Android SDK et JDK sont correctement configurés.
 Aucun problème n’a été détecté dans l’environnement Android.
 ![images alt](https://github.com/CollegeBoreal/INF1083-200-26A-05/blob/main/2.NativeScript/300156497/images/Capture%20d'%C3%A9cran%202026-10-13%20175601.png?raw=true)

# ⚙️ Compilation du projet Android
Le projet NativeScript est compilé avec succès par Webpack, sans erreur TypeScript.
 Le téléchargement de Gradle prépare ensuite la compilation de l’application Android.
 ![images alt](https://github.com/CollegeBoreal/INF1083-200-26A-05/blob/main/2.NativeScript/300156497/images/Capture%20d'%C3%A9cran%202026-10-13%20175601.png?raw=true)

# 📱 Lancement de l’émulateur Android
L’émulateur Android est démarré pendant la préparation du projet NativeScript.
 L’environnement est prêt pour afficher et tester l’application sur un téléphone virtuel.
 ![images alt](https://github.com/CollegeBoreal/INF1083-200-26A-05/blob/main/2.NativeScript/300156497/images/Capture%20d'%C3%A9cran%202026-10-13%20182125.png?raw=true)

# 💻 Développement de l’interface de l’application
Le fichier main-page.xml contient l’interface affichant la liste des 11 joueurs de l’équipe de France.
 Le code est développé et enregistré dans Visual Studio Code.
 ![images alt](https://github.com/CollegeBoreal/INF1083-200-26A-05/blob/main/2.NativeScript/300156497/images/Capture%20d'%C3%A9cran%202026-10-13%20184119.png?raw=true)

# 📱 Résultat final de l’application
L’application NativeScript s’exécute correctement sur l’émulateur Android.
 Elle affiche les 11 joueurs sélectionnés de l’équipe de France.
 ![images alt](https://github.com/CollegeBoreal/INF1083-200-26A-05/blob/main/2.NativeScript/300156497/images/Capture%20d'%C3%A9cran%202026-10-13%20184326.png?raw=true)

# 🚀 Envoi final du projet sur GitHub
Le projet a été synchronisé et envoyé avec succès sur GitHub.
 git status confirme que la branche est à jour et que le projet est propre.
 ![images alt](https://github.com/CollegeBoreal/INF1083-200-26A-05/blob/main/2.NativeScript/300156497/images/Capture%20d'%C3%A9cran%202026-10-13%20185141.png?raw=true)

# 📝 Conclusion
Dans ce projet, j’ai créé et configuré une application NativeScript pour Android. J’ai utilisé principalement les commandes suivantes :
npm install -g nativescript
ns create B300156497
cd B300156497
ns platform add android
ns doctor android
ns run android
Enfin, j’ai sauvegardé et envoyé le projet sur GitHub avec :
git status
git add B300156497
git commit -m "Ajout de la liste des joueurs de France"
git pull --rebase origin main
git push origin main

