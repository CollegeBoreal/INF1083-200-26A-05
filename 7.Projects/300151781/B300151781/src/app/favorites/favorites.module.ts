import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular'
import { SharedModule } from '../shared/shared.module'
import { CityDetailComponent } from '../shared/city-detail.component'
import { FavoritesComponent } from './favorites.component'

@NgModule({
  imports: [
    NativeScriptCommonModule,
    SharedModule,
    NativeScriptRouterModule.forChild([
      { path: 'default', component: FavoritesComponent },
      { path: 'city/:id', component: CityDetailComponent },
    ]),
  ],
  declarations: [FavoritesComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class FavoritesModule {}
