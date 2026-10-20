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
  noms: string[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('https://jsonplaceholder.typicode.com/users')
      .subscribe(data => {
        this.noms = data.map(u => u.name);
      });
  }

  saluer() {
    alert("Bonjour !");
  }
}
