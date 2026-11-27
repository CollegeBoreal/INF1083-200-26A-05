import { Component, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptCommonModule } from '@nativescript/angular'
import { inject } from '@angular/core'
import { RouterExtensions } from '@nativescript/angular'
import { Carnet } from '../recettes'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA]
})
export class HomeComponent {
  readonly carnet = inject(Carnet)
  readonly router = inject(RouterExtensions)
  favorisSeulement = false
  visibles() {
    return this.carnet.recettes().filter(r => !this.favorisSeulement || this.carnet.favoris().includes(r.id))
  }
}
