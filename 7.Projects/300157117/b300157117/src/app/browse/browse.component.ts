import { Component, OnInit, signal } from '@angular/core'

import { Meteo, MeteoService } from '../shared/meteo.service'

// 🌤️ Onglet 2 : météo en direct de Toronto (RxJS + HttpClient)
@Component({
  standalone: false,
  selector: 'Browse',
  templateUrl: './browse.component.html',
})
export class BrowseComponent implements OnInit {
  meteo = signal<Meteo | null>(null)
  message = signal('Chargement de la météo…')

  constructor(private meteoService: MeteoService) {}

  ngOnInit(): void {
    this.actualiser()
  }

  actualiser(): void {
    this.message.set('Chargement de la météo…')
    this.meteoService.getMeteo().subscribe({
      next: (m) => {
        console.log('Météo Toronto :', m.temperature + '°C', m.texte)
        this.meteo.set(m)
        this.message.set('')
      },
      error: (e: string) => this.message.set(e),
    })
  }
}
