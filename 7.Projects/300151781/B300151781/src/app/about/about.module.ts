import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular'
import { AboutComponent } from './about.component'

@NgModule({
  imports: [NativeScriptCommonModule, NativeScriptRouterModule.forChild([{ path: 'default', component: AboutComponent }])],
  declarations: [AboutComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AboutModule {}
