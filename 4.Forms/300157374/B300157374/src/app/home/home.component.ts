import { Component, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptCommonModule } from '@nativescript/angular'
import { inject } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { NativeScriptFormsModule } from '@nativescript/angular'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [NativeScriptCommonModule, NativeScriptFormsModule, ReactiveFormsModule],
  schemas: [NO_ERRORS_SCHEMA]
})
export class HomeComponent {
  private readonly builder = inject(FormBuilder)
  readonly signUpForm = this.builder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    username: ['', Validators.required]
  })
  message = ''
  onButtonTap() {
    if (this.signUpForm.invalid) {
      this.message = 'Entre un courriel valide et un nom utilisateur.'
      return
    }
    console.log(JSON.stringify(this.signUpForm.getRawValue()))
    this.message = 'Formulaire envoyé à la console.'
  }
}
