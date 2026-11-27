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
  imports: [
    NativeScriptCommonModule,
    NativeScriptRouterModule,
    NativeScriptFormsModule,
    ReactiveFormsModule,
  ],
  schemas: [NO_ERRORS_SCHEMA],
  styles: [`
    .page   { padding: 24; background-color: #F5F7FB; }
    .titre  { font-size: 26; font-weight: bold; color: #1F2A44; margin-bottom: 4; }
    .aide   { font-size: 14; color: #6B7280; margin-bottom: 20; }
    .champ  { font-size: 16; padding: 12; margin-bottom: 12; background-color: white;
              border-width: 1; border-color: #D1D5DB; border-radius: 8; }
    .bouton { font-size: 16; font-weight: bold; color: white; background-color: #2563EB;
              border-radius: 8; height: 50; margin-top: 8; }
    .resultat { margin-top: 16; font-size: 15; font-weight: bold; }
  `],
})
export class HomeComponent implements OnInit {

    signUpForm: FormGroup;
    message = '';

    constructor(private formBuilder: FormBuilder) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
        this.signUpForm = this.formBuilder.group({
            email: ["", [Validators.required, Validators.email]],
            username: ["", Validators.required],
        });
    }

    onButtonTap() {
        // Exercice : afficher le courriel et l'utilisateur dans la console
        console.log(JSON.stringify(this.signUpForm.value));

        if (this.signUpForm.valid) {
            const { email, username } = this.signUpForm.value;
            console.log(`Courriel : ${email}`);
            console.log(`Utilisateur : ${username}`);
            this.message = `Bienvenue ${username} ! (${email})`;
        } else {
            console.log('Formulaire invalide : vérifie le courriel et le nom d\'utilisateur.');
            this.message = 'Courriel invalide ou champ vide.';
        }
    }
}
