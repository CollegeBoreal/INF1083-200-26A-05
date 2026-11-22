import { Component, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptCommonModule } from '@nativescript/angular'
import { inject } from '@angular/core'
import { RouterExtensions } from '@nativescript/angular'
import { Carnet } from '../recettes'
import { NativeScriptFormsModule } from '@nativescript/angular'
@Component({
  selector: 'app-ajout',
  templateUrl: './ajout.component.html',
  imports: [NativeScriptCommonModule, NativeScriptFormsModule],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AjoutComponent {
  readonly carnet = inject(Carnet)
  readonly router = inject(RouterExtensions)
  nom = ''
  ingredients = ''
  etapes = ''
  erreur = ''
  enregistrer() {
    const lignes = (valeur: string) => valeur.split('\n').map(s => s.trim()).filter(Boolean)
    const ingredients = lignes(this.ingredients)
    const etapes = lignes(this.etapes)
    if (!this.nom.trim() || !ingredients.length || !etapes.length) {
      this.erreur = 'Complète le nom, les ingrédients et les étapes.'
      return
    }
    this.carnet.ajouter(this.nom.trim(), ingredients, etapes)
    this.router.back()
  }
}
