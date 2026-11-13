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
      username: ['', Validators.required],
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
    console.log('Full Name: ' + this.bookingForm.value.fullName);
    console.log('Email: ' + this.bookingForm.value.email);
    console.log('Username: ' + this.bookingForm.value.username);
    console.log('Phone: ' + this.bookingForm.value.phone);
    console.log('Car Type: ' + this.bookingForm.value.carType);
    console.log('Pick-up Location: ' + this.bookingForm.value.pickupLocation);
    console.log('Pick-up Date: ' + this.bookingForm.value.pickupDate);
    console.log('Return Date: ' + this.bookingForm.value.returnDate);
    console.log(
      'Additional Insurance: ' +
        (this.bookingForm.value.insurance ? 'Yes' : 'No')
    );
  }
}