import { Component, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptCommonModule } from '@nativescript/angular'
import { inject } from '@angular/core'
import { RouterExtensions } from '@nativescript/angular'
import { Carnet } from '../recettes'
import { ActivatedRoute } from '@angular/router'
@Component({
  selector: 'app-fiche',
  templateUrl: './fiche.component.html',
  imports: [NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA]
})
export class FicheComponent {
  readonly carnet = inject(Carnet)
  readonly router = inject(RouterExtensions)
  private readonly id = inject(ActivatedRoute).snapshot.paramMap.get('id')
  readonly recette = this.carnet.recettes().find(r => r.id === this.id)

}
