import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-accueil',
  imports: [CommonModule],
  templateUrl: './accueil.html',
  styleUrl: './accueil.css'
})
export class Accueil implements OnInit {
  titre = 'Bienvenue INF1083';
  nom = 'Prof';
  connecte = true;
  noms = ['Alice', 'Bob', 'Charlie'];
  utilisateurs: any[] = [];
  private http = inject(HttpClient);

  ngOnInit() {
    this.http.get<any[]>('https://jsonplaceholder.typicode.com/users')
      .subscribe(data => {
        this.utilisateurs = data;
      });
  }

  saluer() {
    alert('Bonjour !');
  }
}
