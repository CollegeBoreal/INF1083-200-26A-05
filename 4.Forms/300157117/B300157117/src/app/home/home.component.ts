import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
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
export class HomeComponent implements OnInit {

  signUpForm!: FormGroup;
  resultat = '';

  constructor(private formBuilder: FormBuilder) {
    // Use the component constructor to inject providers.
  }

  ngOnInit(): void {
    // Init your component properties here.
    this.signUpForm = this.formBuilder.group({
      email: ['', Validators.required],
      username: ['', Validators.required],
    });
  }

  onButtonTap() {
    // 🫵 Afficher le courriel et l'utilisateur dans la console
    console.log(JSON.stringify(this.signUpForm.value));

    // Afficher aussi le résultat à l'écran
    this.resultat = this.signUpForm.valid
      ? JSON.stringify(this.signUpForm.value)
      : 'Veuillez remplir les deux champs.';
  }
}
