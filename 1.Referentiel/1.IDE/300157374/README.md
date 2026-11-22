# Laboratoire Git et Visual Studio Code

Yanis Nait Idir · 300157374 · INF1083

## Travail réalisé dans la copie locale

Le dépôt du cours a été cloné depuis GitHub par HTTPS. Le dossier personnel se trouve dans `1.Referentiel/1.IDE/300157374`. Les travaux sont regroupés dans la branche `travaux/300157374`.

| Vérification locale | Résultat |
| --- | --- |
| `git --version` | Git 2.56.1 sur le poste de préparation |
| Branche de travail | `travaux/300157374` |
| Dépôt d’origine | `https://github.com/CollegeBoreal/INF1083-200-26A-05` |

Un commit enregistre les changements localement. Une branche permet de réunir mes travaux avant une demande de fusion. La configuration de VS Code et l’authentification personnelle par SSH doivent être vérifiées sur mon poste Windows.

## Vérifications sur Windows

Depuis le clone du dépôt, ces commandes PowerShell affichent les outils installés, l’identité de commit et l’adresse du serveur.

```powershell
git --version
code --version
git config --get user.name
git config --get user.email
git remote -v
```

Après l’association de la clé publique au compte GitHub, `ssh -T git@github.com` permet de vérifier le nom du compte reconnu. Pour ce dépôt, l’adresse SSH indiquée par le professeur est `git@github.com:CollegeBoreal/INF1083-200-26A-05.git`. La clé privée reste sur le poste Windows.
