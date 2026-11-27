import { Component, inject, signal } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Component({ selector: 'app-accueil', templateUrl: './accueil.html', styleUrl: './accueil.css' })
export class Accueil {
  readonly titre = 'Bienvenue INF1083'
  readonly nom = 'Yanis Nait Idir'
  readonly modules = ['Angular', 'Formulaires', 'RxJS']
  readonly salue = signal(false)
  readonly utilisateurs = signal<{ id: number; name: string }[]>([])
  readonly message = signal('')
  private http = inject(HttpClient)
  charger() {
    this.message.set('Chargement…')
    this.http.get<{ id: number; name: string }[]>('https://jsonplaceholder.typicode.com/users').subscribe({
      next: liste => { this.utilisateurs.set(liste); this.message.set(liste.length + ' utilisateurs') },
      error: () => this.message.set('Service indisponible. Réessaie plus tard.')
    })
  }
}
