#300151609
# Lab 8 : Formulaires réactifs (ReactiveForms) avec NativeScript Angular

![NativeScript](https://img.shields.io/badge/NativeScript-8.x-blue)
![Angular](https://img.shields.io/badge/Angular-17%2B-red)

**Étudiant :Saadi Ramz Eddine
**Matricule :300151609

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

<svg xmlns="http://www.w3.org/2000/svg" width="900" height="560" viewBox="0 0 900 560">
  <defs>
    <style>
      .sans { font-family: Arial, Helvetica, sans-serif; }
      .mono { font-family: Menlo, Consolas, monospace; }
    </style>
  </defs>

  <!-- Fond -->
  <rect width="900" height="560" fill="#f0f2f5"/>

  <!-- Titres -->
  <text x="40" y="36" class="sans" font-size="18" font-weight="bold" fill="#333">Lab 8 : ReactiveForms</text>

  <!-- ===== Téléphone ===== -->
  <rect x="60" y="60" width="320" height="470" rx="36" fill="#1c1c1e"/>
  <rect x="76" y="92" width="288" height="406" rx="6" fill="#ffffff"/>
  <rect x="76" y="92" width="288" height="44" fill="#007aff"/>
  <text x="220" y="120" class="sans" font-size="16" font-weight="bold" text-anchor="middle" fill="#ffffff">Home</text>

  <!-- Titre du formulaire -->
  <text x="220" y="175" class="sans" font-size="20" font-weight="bold" text-anchor="middle" fill="#222">Inscription</text>

  <!-- Champ courriel -->
  <text x="100" y="206" class="sans" font-size="12" fill="#666">Courriel</text>
  <rect x="100" y="214" width="240" height="40" rx="6" fill="#ffffff" stroke="#999"/>
  <text x="112" y="239" class="sans" font-size="14" fill="#222">etudiant@cegep.ca</text>

  <!-- Champ nom d'utilisateur -->
  <text x="100" y="278" class="sans" font-size="12" fill="#666">Nom d'utilisateur</text>
  <rect x="100" y="286" width="240" height="40" rx="6" fill="#ffffff" stroke="#999"/>
  <text x="112" y="311" class="sans" font-size="14" fill="#222">jdoe</text>

  <!-- Bouton -->
  <rect x="100" y="356" width="240" height="44" rx="8" fill="#007aff"/>
  <text x="220" y="384" class="sans" font-size="16" font-weight="bold" text-anchor="middle" fill="#ffffff">Sign up</text>

  <!-- ===== Terminal ===== -->
  <rect x="420" y="60" width="440" height="470" rx="10" fill="#1e1e1e"/>
  <rect x="420" y="60" width="440" height="34" rx="10" fill="#2d2d2d"/>
  <rect x="420" y="80" width="440" height="14" fill="#2d2d2d"/>
  <circle cx="440" cy="77" r="6" fill="#ff5f56"/>
  <circle cx="460" cy="77" r="6" fill="#ffbd2e"/>
  <circle cx="480" cy="77" r="6" fill="#27c93f"/>
  <text x="600" y="82" class="mono" font-size="12" fill="#aaaaaa">ns run ios</text>

  <text x="440" y="130" class="mono" font-size="13" fill="#aaaaaa">$ ns run ios</text>
  <text x="440" y="158" class="mono" font-size="13" fill="#9cdcfe">JS: {"email":"etudiant@cegep.ca","username":"jdoe"}</text>
  <text x="440" y="186" class="mono" font-size="13" fill="#6a9955">✔ Formulaire valide, données affichées</text>
  <text x="440" y="214" class="mono" font-size="13" fill="#aaaaaa">_</text>

  <!-- Légende -->
  <text x="450" y="560" class="sans" font-size="12" fill="#666">Maquette générée : remplacer par une capture réelle pour la remise</text>
</svg>
