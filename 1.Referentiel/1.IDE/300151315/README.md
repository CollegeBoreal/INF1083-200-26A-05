# 300151315 - Laboratoire 1 : IDE, Git et SSH

## Objectif
Configurer Git et SSH sur Windows, puis soumettre mon travail sur le dépôt GitHub du cours.

## Environnement
- Système : Windows (Invite de commandes - cmd)
- Compte GitHub : toumiayoub1111-spec

## 1. Cloner le dépôt du cours
```
mkdir Developer
cd Developer
git clone https://github.com/CollegeBoreal/INF1083-200-26A-05.git
cd INF1083-200-26A-05\1.Referentiel\1.IDE
```

## 2. Créer mon répertoire
```
mkdir 300151315
notepad 300151315\README.md
git add 300151315
git status
```

## 3. Configurer Git et valider (commit)
```
git config --global user.name "toumiayoub1111-spec"
git config --global user.email "mon_courriel"
git commit --message ":star: Mon premier commentaire"
git pull --no-edit
```

## 4. Créer la clé SSH
```
ssh-keygen -t ed25519 -C "mon_courriel"
cd %USERPROFILE%\.ssh
ren id_ed25519 ma_cle.pk
ren id_ed25519.pub ma_cle.pub
notepad "%USERPROFILE%\.ssh\config."
```

Contenu du fichier `config` :
```
Host github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/ma_cle.pk
```

## 5. Ajouter la clé publique sur GitHub
```
clip < %USERPROFILE%\.ssh\ma_cle.pub
```
Puis : GitHub → Settings → SSH and GPG keys → New SSH key → coller la clé.

![Clé SSH sur GitHub](images/SSH%20key.JPG)

Test de la connexion :
```
ssh -T git@github.com
```
Résultat : `Hi toumiayoub1111-spec! You've successfully authenticated`

## 6. Passer le dépôt en SSH et envoyer
```
git remote set-url origin git@github.com:CollegeBoreal/INF1083-200-26A-05.git
git remote --verbose
git pull --no-edit
git push
```

## Problèmes rencontrés et solutions

| Problème | Solution |
|---|---|
| `ls` non reconnu dans cmd | Utiliser `dir` |
| `~` non reconnu dans cmd | Utiliser `%USERPROFILE%` |
| `choco install nano` refusé (pas administrateur) | Utiliser `notepad` à la place de `nano` |
| Répertoire créé au mauvais endroit | Le recréer dans `1.Referentiel\1.IDE` |
| `move` / `rmdir` : fichier utilisé par un autre processus | Fermer Notepad, l'Explorateur et les autres fenêtres cmd |
| Notepad ajoute `.txt` au fichier `config` | Ouvrir avec `"config."` (point à la fin) |

## Ce que j'ai appris
- Les commandes de base de Git : clone, add, status, commit, pull, push
- La différence entre une clé publique (`.pub`) et une clé privée (`.pk`)
- Les différences entre les commandes Windows (cmd) et Linux/Git Bash