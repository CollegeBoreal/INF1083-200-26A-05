import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-inscription',
  imports: [ReactiveFormsModule],
  templateUrl: './inscription.html',
  styleUrl: './inscription.css'
})
export class Inscription implements OnInit {
  inscriptionForm!: FormGroup;
  soumis = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.inscriptionForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.inscriptionForm.invalid) {
      return;
    }
    console.log(JSON.stringify(this.inscriptionForm.value));
    this.soumis = true;
  }
}

