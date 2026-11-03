<div align="center">

# 🚀 Rapport – 1.IDE

**INF1083 – Développement d'applications · Automne 2026**

![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)
![SSH](https://img.shields.io/badge/SSH-ed25519-2f81f7?style=for-the-badge&logo=openssh&logoColor=white)
![PowerShell](https://img.shields.io/badge/PowerShell-5391FE?style=for-the-badge&logo=powershell&logoColor=white)

| 🆔 Identifiant | 📅 Session | 🏫 Collège |
|:---:|:---:|:---:|
| **300156615** | Automne 2026 | Boréal |

</div>

---

## 🖼️ Aperçu du flux de travail

![Schéma du flux Git et SSH entre mon ordinateur et GitHub](images/ide-workflow.svg)

---

## ✅ Ce que j'ai réalisé

| # | Étape | Statut |
|:-:|---|:-:|
| 1 | Configuration de Git (nom et courriel) | ✅ |
| 2 | Génération de la clé SSH `ed25519` | ✅ |
| 3 | Renommage en `ma_cle.pk` / `ma_cle.pub` | ✅ |
| 4 | Création du fichier `~/.ssh/config` | ✅ |
| 5 | Ajout de la clé publique à GitHub | ✅ |
| 6 | Test avec `ssh -T git@github.com` | ✅ |
| 7 | Changement de l'URL du dépôt vers SSH | ✅ |
| 8 | Envoi du travail avec `git push` | ✅ |

---

## 🔑 Gestion de la clé SSH

```powershell
ssh-keygen -t ed25519 -C "mon-courriel@exemple.com"
```

Fichier `~/.ssh/config` :

```text
Host github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/ma_cle.pk
```

> ⚠️ La clé **privée** (`ma_cle.pk`) ne quitte jamais mon ordinateur. Seule la clé **publique** (`ma_cle.pub`) est ajoutée à GitHub.

### Test de la connexion

```powershell
ssh -T git@github.com
```

Résultat : `Hi waliii81! You've successfully authenticated, but GitHub does not provide shell access.`

---

## 🔄 Cycle de travail Git

```powershell
git add 1.Referentiel\1.IDE\300156615
git status
git commit --message ":star: Ajout du rapport 1.IDE de 300156615"
git pull --rebase
git push
```

---

## 🧠 Ce que j'ai appris

- 🔐 La **clé publique** prouve mon identité sans mot de passe, la **clé privée** reste secrète.
- 🔁 Il faut toujours faire un `git pull` avant un `git push`.
- 📛 Il vaut mieux éviter les **espaces** dans les noms de fichiers d'images.
- ⚙️ `ssh -T git@github.com` permet de valider rapidement la configuration SSH.

---

## 🧩 Difficultés rencontrées

| Problème | Solution |
|---|---|
| `Permission denied (publickey)` | Ajout de ma clé publique à mon compte GitHub |
| Dossier créé au mauvais endroit | Déplacement avec `git mv` |
| Commandes collées de travers dans PowerShell | Exécution d'une commande à la fois |

---

<div align="center">

*Rapport rédigé par **300156615** · INF1083 – Collège Boréal*

</div>
