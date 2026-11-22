import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular'
import { SharedModule } from '../shared/shared.module'
import { CityDetailComponent } from '../shared/city-detail.component'
import { MapComponent } from './map.component'

@NgModule({
  imports: [
    NativeScriptCommonModule,
    SharedModule,
    NativeScriptRouterModule.forChild([
      { path: 'default', component: MapComponent },
      { path: 'city/:id', component: CityDetailComponent },
    ]),
  ],
  declarations: [MapComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class MapModule {}
