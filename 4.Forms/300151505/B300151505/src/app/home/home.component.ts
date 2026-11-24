import { Component, NO_ERRORS_SCHEMA, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  NativeScriptCommonModule,
  NativeScriptFormsModule,
  NativeScriptRouterModule,
} from '@nativescript/angular';

@Component({
  selector: 'Home',
  templateUrl: './home.component.html',
  // NativeScriptFormsModule : relie les TextField NativeScript aux contrôles du formulaire
  // ReactiveFormsModule     : fournit [formGroup] et formControlName
  imports: [NativeScriptCommonModule, NativeScriptFormsModule, NativeScriptRouterModule, ReactiveFormsModule],
  schemas: [NO_ERRORS_SCHEMA],
})
export class HomeComponent {

  // Injection du FormBuilder (équivalent à : constructor(private formBuilder: FormBuilder))
  private formBuilder = inject(FormBuilder);

  // Le formulaire réactif : deux champs obligatoires
  signUpForm: FormGroup = this.formBuilder.group({
    email: ['', Validators.required],
    username: ['', Validators.required],
  });

  // signal() : l'application utilise la détection de changements "zoneless"
  resultat = signal('');

  onButtonTap() {
    // 🫵 Afficher le courriel et l'utilisateur dans la console
    console.log(JSON.stringify(this.signUpForm.value));

    // Afficher aussi le résultat à l'écran
    this.resultat.set(
      this.signUpForm.valid
        ? JSON.stringify(this.signUpForm.value)
        : 'Veuillez remplir les deux champs.'
    );
  }
}
