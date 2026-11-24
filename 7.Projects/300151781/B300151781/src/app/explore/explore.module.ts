import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular'
import { SharedModule } from '../shared/shared.module'
import { CityDetailComponent } from '../shared/city-detail.component'
import { ExploreComponent } from './explore.component'
import { QuizComponent } from './quiz.component'

@NgModule({
  imports: [
    NativeScriptCommonModule,
    SharedModule,
    NativeScriptRouterModule.forChild([
      { path: 'default', component: ExploreComponent },
      { path: 'city/:id', component: CityDetailComponent },
      { path: 'quiz', component: QuizComponent },
    ]),
  ],
  declarations: [ExploreComponent, QuizComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ExploreModule {}
