import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptCommonModule, NativeScriptFormsModule, NativeScriptRouterModule } from '@nativescript/angular'

import { CoursesComponent } from './courses.component'

@NgModule({
  imports: [
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    NativeScriptRouterModule.forChild([{ path: 'default', component: CoursesComponent }]),
  ],
  declarations: [CoursesComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class CoursesModule {}
