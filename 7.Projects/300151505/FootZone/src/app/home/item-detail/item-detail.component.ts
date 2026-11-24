import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { RouterExtensions } from '@nativescript/angular'
import { Toasty, ToastDuration, ToastPosition } from '@triniwiz/nativescript-toasty'

import { FootService } from '../../shared/foot.service'
import { FavorisService } from '../../shared/favoris.service'
import { Equipe } from '../../shared/equipe'

// 📄 Fiche d'une équipe : palmarès, stars, favori (+ message Toasty)
@Component({
  standalone: false,
  selector: 'ItemDetail',
  templateUrl: './item-detail.component.html',
})
export class ItemDetailComponent implements OnInit {
  equipe!: Equipe

  constructor(
    private foot: FootService,
    public favoris: FavorisService,
    private route: ActivatedRoute,
    private routerExtensions: RouterExtensions
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.params.id
    this.equipe = this.foot.getEquipe(id)
  }

  basculerFavori(): void {
    const ajout = this.favoris.basculer(this.equipe.id)
    const texte = ajout
      ? `⭐ ${this.equipe.nom} ajouté aux favoris`
      : `${this.equipe.nom} retiré des favoris`
    console.log(texte)
    // Plugin @triniwiz/nativescript-toasty : petit message en bas de l'écran
    try {
      new Toasty({ text: texte, duration: ToastDuration.SHORT, position: ToastPosition.BOTTOM }).show()
    } catch (e) {
      console.log('Toasty : ' + e)
    }
  }

  onBackTap(): void {
    this.routerExtensions.back()
  }
}
