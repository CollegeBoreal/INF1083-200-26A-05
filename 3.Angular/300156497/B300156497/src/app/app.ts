import { Component } from '@angular/core';
import { Accueil } from './accueil/accueil';

@Component({
  selector: 'app-root',
  imports: [Accueil],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}