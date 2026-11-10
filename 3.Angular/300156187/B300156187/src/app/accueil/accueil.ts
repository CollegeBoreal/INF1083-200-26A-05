import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  imports: [],
  selector: 'app-accueil',
  styleUrl: './accueil.css',
  templateUrl: './accueil.html',
})
export class Accueil {
  titre = 'Bienvenue INF1083';
  utilisateurs: any[] = [];

  notions = [
    { icone: '🧩', titre: 'Composants', description: 'Des blocs autonomes qui composent chaque page.' },
    { icone: '🔗', titre: 'Data Binding', description: 'Le HTML et le TypeScript se parlent en direct.' },
    { icone: '🌐', titre: 'API REST', description: 'Des données réelles, chargées depuis un serveur distant.' },
    { icone: '🧭', titre: 'Routage', description: 'Plusieurs pages, une seule application.' },
  ];

  labos = 0;
  projets = 0;
  progression = 0;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('https://jsonplaceholder.typicode.com/users')
      .subscribe(data => {
        this.utilisateurs = data;
      });

    this.animerCompteur('labos', 12);
    this.animerCompteur('projets', 5);
    this.animerCompteur('progression', 98);
  }

  animerCompteur(nom: 'labos' | 'projets' | 'progression', cible: number) {
    let valeur = 0;
    const pas = setInterval(() => {
      valeur += Math.ceil(cible / 40);
      if (valeur >= cible) {
        valeur = cible;
        clearInterval(pas);
      }
      this[nom] = valeur;
    }, 30);
  }

  incliner(event: MouseEvent) {
    const carte = event.currentTarget as HTMLElement;
    const r = carte.getBoundingClientRect();
    const x = (event.clientX - r.left) / r.width - 0.5;
    const y = (event.clientY - r.top) / r.height - 0.5;
    carte.style.setProperty('--ry', `${x * 14}deg`);
    carte.style.setProperty('--rx', `${-y * 14}deg`);
  }

  redresser(event: MouseEvent) {
    const carte = event.currentTarget as HTMLElement;
    carte.style.setProperty('--rx', '0deg');
    carte.style.setProperty('--ry', '0deg');
  }

  saluer() {
    alert('Bonjour !');
  }
}
