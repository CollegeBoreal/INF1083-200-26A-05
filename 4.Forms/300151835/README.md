# Travail 4 — Formulaire réactif

**Liza Benhammouche · 300151835 · INF1083**

Le formulaire NativeScript recueille un courriel et un nom d’utilisateur. Angular vérifie les deux champs avant d’afficher les valeurs de démonstration dans la console.

## 1. Créer le projet

```powershell
ns create B300151835 --template @nativescript/template-blank-ng
Set-Location B300151835
```

## 2. Définir le formulaire

Remplacer `src/app/home/home.component.ts` par le code suivant. Le module NativeScript fournit l’adaptateur du champ natif. Le module Angular fournit les directives du formulaire réactif.

```typescript
import { Component, inject, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NativeScriptCommonModule, NativeScriptFormsModule } from '@nativescript/angular';

@Component({
  selector: 'Home',
  templateUrl: './home.component.html',
  imports: [NativeScriptCommonModule, NativeScriptFormsModule, ReactiveFormsModule],
  schemas: [NO_ERRORS_SCHEMA],
})
export class HomeComponent {
  readonly signUpForm = inject(FormBuilder).nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required, Validators.pattern(/.*\S.*/)]],
  });
  message = '';

  onButtonTap(): void {
    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();
      this.message = 'Entre une adresse valide et un nom d’utilisateur.';
      return;
    }
    const { email, username } = this.signUpForm.getRawValue();
    console.log(JSON.stringify({ email, username: username.trim() }));
    this.message = 'Inscription de démonstration validée.';
  }
}
```

Remplacer `src/app/home/home.component.html` par ce gabarit.

```html
<ActionBar title="Inscription" />
<StackLayout [formGroup]="signUpForm" class="p-4">
  <Label text="Courriel" />
  <TextField formControlName="email" hint="test@example.com" keyboardType="email" autocorrect="false" autocapitalizationType="none" />
  <Label text="Nom d’utilisateur" />
  <TextField formControlName="username" hint="demo" />
  <Button text="S’inscrire" (tap)="onButtonTap()" />
  <Label [text]="message" textWrap="true" />
</StackLayout>
```

## 3. Lancer et vérifier

```powershell
ns run android
```

1. Soumettre le formulaire vide et vérifier le message d’erreur.
2. Essayer un courriel mal formé. La soumission doit être bloquée.
3. Saisir `test@example.com` et `demo`. La console doit afficher `{"email":"test@example.com","username":"demo"}`.

## Vérification

Les étapes ci-dessus décrivent le résultat attendu. L’exécution sur Android et les captures restent à vérifier. Le dossier [images](images/) est prévu pour les captures.

[Consignes du cours](../README.md)
