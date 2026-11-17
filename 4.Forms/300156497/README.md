# 300156497
# Laboratoire 8 - Forms avec NativeScript et Angular

# 🎯 Objectif du laboratoire
L'objectif de ce laboratoire est d'apprendre à utiliser les Reactive Forms dans une application NativeScript Angular.

L'application permet à l'utilisateur :

✅ d'entrer son adresse courriel
✅ d'entrer son nom d'utilisateur
✅ de cliquer sur le bouton Sign Up
✅ d'afficher les données saisies dans la console

# 🚀 Création du projet
# 📌 Commande utilisée pour créer le projet
ns create B300156497 --template @nativescript/template-blank-ng
# 📂 Entrer dans le projet
cd B300156497
# 💻 Ouvrir le projet dans Visual Studio Code
code .
# 📦 Installation
Installation des dépendances :

npm install
# ▶️ Exécution du projet
Lancer l'application Android :

ns run android
# 🧮 Formulaire créé
Le formulaire contient :

📧 Un champ Email

👤 Un champ Username

🔘 Un bouton Sign Up

💻 Code exécuté lors du clic
onButtonTap() {
    console.log(JSON.stringify(this.signUpForm.value));
}
📋 Exemple de test
Données saisies
📧 Email

300156497@monboreal.ca
👤 Username

mouna
# 🖥️ Résultat dans la console
{
  "email":"300156497@monboreal.ca",
  "username":"mouna"
}
✅ Les informations sont correctement affichées dans la console lors du clic sur le bouton Sign Up.

# 🛠️ Technologies utilisées
📱 NativeScript
🅰️ Angular
🧮 Reactive Forms
📘 TypeScript
💻 Visual Studio Code

# Modification du fichier home.component.ts
Cette étape montre la modification du fichier home.component.ts afin d'ajouter la méthode onButtonTap(). Cette méthode récupère les valeurs saisies dans les champs Email et Username et les affiche dans la console au format JSON lorsque l'utilisateur clique sur le bouton sign up.
![images alt](https://github.com/CollegeBoreal/INF1083-200-26A-05/blob/main/4.Forms/300156497/images/Capture%20d'%C3%A9cran%202026-11-04%20171537.png?raw=true)

# Résultat de l'application
Cette capture montre l'interface finale de l'application NativeScript. L'utilisateur peut saisir un courriel et un nom d'utilisateur dans les champs de texte. Un bouton « sign up » permet d'envoyer les informations vers la console afin de vérifier les données saisies.
Commande utilisée est ns run android
![images alt](https://github.com/CollegeBoreal/INF1083-200-26A-05/blob/main/4.Forms/300156497/images/Capture%20d'%C3%A9cran%202026-11-04%20171347.png?raw=true)

# 📧 Saisie des informations utilisateur
Cette capture montre l'entrée des données dans le formulaire. Un courriel et un nom d'utilisateur sont saisis dans les champs prévus avant l'envoi des informations à l'aide du bouton sign up. Cette étape permet de vérifier que le formulaire accepte les données de l'utilisateur.
Commande utilisée est ns run android
![images alt](https://github.com/CollegeBoreal/INF1083-200-26A-05/blob/main/4.Forms/300156497/images/Capture%20d'%C3%A9cran%202026-11-04%20172511.png?raw=true)

# ✅ Affichage des données dans la console
Cette capture montre le résultat obtenu après avoir cliqué sur le bouton sign up. Les informations saisies dans le formulaire sont récupérées et affichées dans la console PowerShell au format JSON. Cela confirme que l'application transmet correctement le courriel et le nom d'utilisateur.
Commande utilisée ns run android
![images alt](https://github.com/CollegeBoreal/INF1083-200-26A-05/blob/main/4.Forms/300156497/images/Capture%20d'%C3%A9cran%202026-11-04%20172602.png?raw=true)

# Conclusion
Ce laboratoire a permis de découvrir les formulaires avec NativeScript et Angular. Nous avons créé une interface contenant un champ de courriel, un champ de nom d’utilisateur et un bouton « sign up ». Les données saisies sont récupérées et affichées dans la console au format JSON. Ce laboratoire a également permis de comprendre la structure d’un composant Angular et l’interaction entre l’interface utilisateur et le code TypeScript.
