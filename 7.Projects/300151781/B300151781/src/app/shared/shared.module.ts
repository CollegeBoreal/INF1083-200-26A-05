import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptCommonModule } from '@nativescript/angular'
import { CityDetailComponent } from './city-detail.component'

@NgModule({
  imports: [NativeScriptCommonModule],
  declarations: [CityDetailComponent],
  exports: [CityDetailComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class SharedModule {}
