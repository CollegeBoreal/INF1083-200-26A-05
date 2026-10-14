import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import {
  NativeScriptCommonModule,
  NativeScriptRouterModule,
  NativeScriptFormsModule,
} from '@nativescript/angular';

@Component({
  selector: 'Home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [
    NativeScriptCommonModule,
    NativeScriptRouterModule,
    NativeScriptFormsModule,
    ReactiveFormsModule,
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class HomeComponent {

  bookingForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.bookingForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      carType: ['', Validators.required],
      pickupLocation: ['', Validators.required],
      pickupDate: ['', Validators.required],
      returnDate: ['', Validators.required],
      insurance: [false],
    });
  }

  onBookNow() {
    console.log('CAR RENTAL BOOKING');
    console.log(JSON.stringify(this.bookingForm.value));
  }
}