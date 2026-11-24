import { Component } from '@angular/core'
import { ThemeService } from './core/services/theme.service'

@Component({
  standalone: false,
  selector: 'ns-app',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  readonly dark$ = this.themeService.dark$

  // Injecter le service applique le thème sauvegardé dès le démarrage
  constructor(private themeService: ThemeService) {}
}
