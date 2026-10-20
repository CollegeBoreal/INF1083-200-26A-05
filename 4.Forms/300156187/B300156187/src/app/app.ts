import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Inscription } from './inscription/inscription';

@Component({
  imports: [RouterOutlet, Inscription],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('B300156187');
}
