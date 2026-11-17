import { Component, NO_ERRORS_SCHEMA, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
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
    NativeScriptFormsModule,
    NativeScriptRouterModule,
    ReactiveFormsModule,
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class HomeComponent {
  private readonly formBuilder = inject(FormBuilder);

  readonly signUpForm = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    username: ['', Validators.required],
  });

  message = '';

  onButtonTap(): void {
    if (this.signUpForm.invalid) {
      this.message = 'Saisis un courriel valide et un nom d’utilisateur.';
      return;
    }

    const profil = this.signUpForm.getRawValue();
    console.log(JSON.stringify(profil));
    this.message = `Bienvenue, ${profil.username} !`;
  }
}