import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {
  NativeScriptCommonModule,
  NativeScriptRouterModule,
  NativeScriptFormsModule,
} from '@nativescript/angular';

@Component({
  selector: 'Home',
  templateUrl: './home.component.html',
  imports: [
    NativeScriptCommonModule, 
    NativeScriptRouterModule, 
    ReactiveFormsModule,
    NativeScriptFormsModule // <-- C'est ceci qui fait le lien avec les TextField
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class HomeComponent implements OnInit {

    signUpForm: FormGroup;

    constructor(private formBuilder: FormBuilder) {}

    ngOnInit(): void {
        this.signUpForm = this.formBuilder.group({
            email: ["", Validators.required],
            username: ["", Validators.required],
        });
    }

    onButtonTap() {
       console.log(JSON.stringify(this.signUpForm.value));
    }
}