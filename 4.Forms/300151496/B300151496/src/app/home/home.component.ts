import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  NativeScriptCommonModule,
  NativeScriptFormsModule,
  NativeScriptRouterModule,
} from '@nativescript/angular';

@Component({
  selector: 'Home',
  templateUrl: './home.component.html',
  imports: [NativeScriptCommonModule, NativeScriptFormsModule, NativeScriptRouterModule, ReactiveFormsModule],
  schemas: [NO_ERRORS_SCHEMA],
})
export class HomeComponent {

    signUpForm!: FormGroup;

    constructor(private formBuilder: FormBuilder) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
        this.signUpForm = this.formBuilder.group({
            email: ["", Validators.required],
            username: ["", Validators.required],
        });
    }

    onButtonTap() {
       console.log(JSON.stringify(this.signUpForm.value));
    }

}


