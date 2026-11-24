import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptCommonModule, NativeScriptFormsModule, NativeScriptRouterModule } from '@nativescript/angular'

import { TasksComponent } from './tasks.component'

@NgModule({
  imports: [
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    NativeScriptRouterModule.forChild([{ path: 'default', component: TasksComponent }]),
  ],
  declarations: [TasksComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class TasksModule {}
