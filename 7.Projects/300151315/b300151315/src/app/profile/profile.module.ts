import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptCommonModule, NativeScriptFormsModule, NativeScriptRouterModule } from '@nativescript/angular'

import { ProfileComponent } from './profile.component'

@NgModule({
  imports: [
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    NativeScriptRouterModule.forChild([{ path: 'default', component: ProfileComponent }]),
  ],
  declarations: [ProfileComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ProfileModule {}
