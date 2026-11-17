import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import {
    NativeScriptCommonModule,
    NativeScriptFormsModule
} from '@nativescript/angular';

@Component({
    selector: 'Home',
    standalone: true,
    templateUrl: './home.component.html',
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class HomeComponent {

    email: string = '';
    username: string = '';

    onButtonTap(): void {
        console.log('=== BOUTON CLIQUÉ ===');
        console.log('Email =', this.email);
        console.log('Username =', this.username);

        console.log({
            email: this.email,
            username: this.username
        });
    }
}