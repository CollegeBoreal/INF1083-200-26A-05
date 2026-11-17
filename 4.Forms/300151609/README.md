#300151609
# Lab 8 : Formulaires réactifs (ReactiveForms) avec NativeScript Angular

![NativeScript](https://img.shields.io/badge/NativeScript-8.x-blue)
![Angular](https://img.shields.io/badge/Angular-17%2B-red)

**Étudiant :Saadi Ramz Eddine
**Matricule :300151609
**Cours :** <Nom du cours>
**Enseignant :** <Nom de l'enseignant>
**Date :** <JJ/MM/AAAA>

---

## Objectifs

À la fin de ce laboratoire, je suis capable de :

- comprendre la notion de *layout* dans NativeScript ;
- créer un formulaire réactif (`ReactiveForms`) avec Angular ;
- lier un formulaire à un template à l'aide de `[formGroup]` et `formControlName` ;
- valider des champs avec `Validators` ;
- gérer un événement de clic avec `(tap)`.

## Technologies

| Outil | Version |
|-------|---------|
| NativeScript CLI | 8.x |
| Angular | 17+ |
| TypeScript | 5.x |
| Template | `@nativescript/template-blank-ng` |

## Structure du projet

| Fichier | Rôle |
|---------|------|
| `app/home/home.component.html` | Interface : deux champs de saisie et un bouton |
| `app/home/home.component.ts` | Logique : création du `FormGroup`, validation, action du bouton |
| `images/resultat.png` | Capture d'écran du résultat dans la console |

## Installation et exécution

```bash
# 1. Créer le projet
ns create B<TonID> --template @nativescript/template-blank-ng
cd B<TonID>

# 2. Remplacer les fichiers home.component.html et home.component.ts
#    par ceux de ce dépôt

# 3. Lancer l'application
ns run ios        # ou : ns run android
```

## Fonctionnement

### Template (`home.component.html`)

- `[formGroup]="signUpForm"` relie le conteneur au `FormGroup` défini dans le composant.
- `formControlName` associe chaque `TextField` à un contrôle du formulaire.
- `(tap)="onButtonTap()"` appelle la méthode lorsque l'utilisateur appuie sur le bouton.

### Composant (`home.component.ts`)

- `FormBuilder` crée le `FormGroup` dans `ngOnInit()`.
- `Validators.required` rend les champs obligatoires ; `Validators.email` valide le format du courriel.
- `onButtonTap()` vérifie la validité du formulaire. S'il est valide, il affiche les valeurs dans la console ; sinon, il affiche un avertissement et marque les champs comme touchés.

## Résultat

Après avoir saisi un courriel et un nom d'utilisateur puis appuyé sur **sign up**, la console affiche :

```json
{"email":"etudiant@cegep.ca","username":"jdoe"}
```

![Résultat du formulaire](images/resultat.png)

## Difficultés rencontrées et solutions

- **Le formulaire n'est pas lié au template** : vérifier que `ReactiveFormsModule` est importé dans `imports` du composant.
- **Les `console.log` n'apparaissent pas** : ils s'affichent dans le terminal qui exécute `ns run`, pas sur l'appareil.

## Références

- Documentation NativeScript Angular : https://docs.nativescript.org/guide/angular
- Documentation Angular, Reactive Forms : https://angular.dev/guide/forms/reactive-forms
- Mastering NativeScript Layouts, Brad Martin

---

*Travail réalisé dans le cadre du cours <Nom du cours>, <Nom du collège>.*
