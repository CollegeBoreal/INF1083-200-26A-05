import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular'
import { TripComponent } from './trip.component'

@NgModule({
  imports: [NativeScriptCommonModule, NativeScriptRouterModule.forChild([{ path: 'default', component: TripComponent }])],
  declarations: [TripComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class TripModule {}
