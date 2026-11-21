import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import {
  NativeScriptCommonModule,
  NativeScriptFormsModule
} from '@nativescript/angular'

import { FeaturedRoutingModule } from './featured-routing.module'
import { FeaturedComponent } from './featured.component'

@NgModule({
  imports: [
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    FeaturedRoutingModule
  ],
  declarations: [FeaturedComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class FeaturedModule {}