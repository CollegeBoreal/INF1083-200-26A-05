import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { RouterExtensions } from '@nativescript/angular'
import { shareText } from '@nativescript/social-share'

import { DataService } from '../../shared/data.service'
import { FavorisService } from '../../shared/favoris.service'
import { Lieu } from '../../shared/lieu'

// 📄 Page détail d'un lieu : favoris + partage (plugin social-share)
@Component({
  standalone: false,
  selector: 'ItemDetail',
  templateUrl: './item-detail.component.html',
})
export class ItemDetailComponent implements OnInit {
  lieu!: Lieu

  constructor(
    private data: DataService,
    public favoris: FavorisService,
    private route: ActivatedRoute,
    private routerExtensions: RouterExtensions
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.params.id
    this.lieu = this.data.getLieu(id)
  }

  basculerFavori(): void {
    this.favoris.basculer(this.lieu.id)
  }

  partager(): void {
    shareText(
      `${this.lieu.emoji} ${this.lieu.nom} — ${this.lieu.adresse}, Toronto\n${this.lieu.conseil}\n(partagé avec TorontoGo 🍁)`,
      'Un lieu à visiter à Toronto'
    )
  }

  onBackTap(): void {
    this.routerExtensions.back()
  }
}
