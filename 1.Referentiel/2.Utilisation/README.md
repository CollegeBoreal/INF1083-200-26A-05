# 🚀 Exemple complet d'utilisation de Git

## 📁 1. Créer un nouveau projet

Créer un dossier pour le projet :

```
mkdir ~/Developer/MonProjet
cd ~/Developer/MonProjet
```


Créer un premier fichier :

```
echo "# Mon premier projet" > README.md
```

## 🔧 2. Initialiser Git

Initialiser le dépôt Git :

```
git init
```

Résultat :

> Initialized empty Git repository in ...


Vérifier l'état du dépôt :

```
git status
```

## ➕ 3. Ajouter des fichiers à l'index

Git détecte le nouveau fichier :

```
git status
```

Ajouter le fichier :

```
git add README.md
```

Ou tous les fichiers du projet :

```
git add .
```

## 💾 4. Créer un premier commit

Enregistrer la première version du projet :

```
git commit -m "Premier commit"
```

Afficher l'historique :

```
git log --oneline
```

Exemple :

> a1b2c3d Premier commit

## ✏️ 5. Modifier un fichier

Ajouter du contenu :

```
echo "Bienvenue dans INF1083" >> README.md
```

Vérifier les modifications :

```
git status
```

Voir les différences :

```
git diff
```

## 💾 6. Enregistrer les modifications

Ajouter les changements :

```
git add .
```

Créer un nouveau commit :

```
git commit -m "Ajout de la description du projet"
```

## 🌿 7. Créer une branche

Créer une branche pour développer une nouvelle fonctionnalité :

```
git branch fonctionnalite-login
```

Se déplacer sur cette branche :

```
git checkout fonctionnalite-login
```

Ou faire les deux en une seule commande :

```
git checkout -b fonctionnalite-login
```

Afficher les branches :

```
git branch
```

## 🔀 8. Fusionner une branche

Retourner sur la branche principale :

```
git checkout main
```

Fusionner la branche :

```
git merge fonctionnalite-login
```

## 🌎 9. Connecter GitHub

Créer un dépôt sur GitHub puis l'associer au dépôt local :

```
git remote add origin https://github.com/utilisateur/monprojet.git
```

Vérifier la connexion :

```
git remote -v
```

## ☁️ 10. Envoyer le projet sur GitHub

Première publication :

```
git push -u origin main
```

Par la suite :

```
git push
```

⬇️ 11. Télécharger les changements

Récupérer les modifications présentes sur GitHub :

```
git pull
```

## 📥 12. Cloner un projet existant

Télécharger une copie complète d'un projet :

```
git clone https://github.com/utilisateur/monprojet.git
```

## 🎯 Flux de travail typique d'un étudiant

```
# Créer le dépôt Git
git init

# Ajouter les fichiers
git add .

# Premier enregistrement
git commit -m "Premier commit"

# Travailler sur le projet...

# Ajouter les modifications
git add .

# Sauvegarder les changements
git commit -m "Ajout du formulaire de connexion"

# Envoyer vers GitHub
git push
```

## 🧠 Résumé des commandes essentielles

```
git init
git status
git add .
git commit -m "Message"
git log --oneline
git branch
git checkout -b nom-branche
git merge nom-branche
git remote add origin URL
git push
git pull
git clone URL

```

## 🏆 Workflow professionnel simplifié

```
📁 Créer le projet
        ↓
🔧 git init
        ↓
➕ git add .
        ↓
💾 git commit
        ↓
🌿 git checkout -b nouvelle-fonctionnalite
        ↓
💻 Développer
        ↓
💾 git commit
        ↓
🔀 git merge
        ↓
☁️ git push
        ↓
✅ Projet publié sur GitHub
```

### 💡 Conseil INF1083 : faites pratiquer aux étudiants ce scénario complet : création du dépôt → commits → branche → fusion → GitHub → pull/push. C'est le workflow utilisé quotidiennement dans les équipes de développement.
