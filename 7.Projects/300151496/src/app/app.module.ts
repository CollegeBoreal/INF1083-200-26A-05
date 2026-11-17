import { NgModule, isDevMode } from '@angular/core'; import { BrowserModule } from '@angular/platform-browser'; import { ReactiveFormsModule, FormsModule } from '@angular/forms'; import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component'; import { DashboardComponent } from './pages/dashboard.component'; import { TasksComponent } from './pages/tasks.component'; import { CoursesComponent } from './pages/courses.component';
import { ServiceWorkerModule } from '@angular/service-worker';
const routes:Routes=[{path:'',component:DashboardComponent},{path:'taches',component:TasksComponent},{path:'cours',component:CoursesComponent},{path:'**',redirectTo:''}];
@NgModule({declarations:[AppComponent,DashboardComponent,TasksComponent,CoursesComponent],imports:[BrowserModule,ReactiveFormsModule,FormsModule,RouterModule.forRoot(routes), ServiceWorkerModule.register('ngsw-worker.js', {
  enabled: !isDevMode(),
  // Register the ServiceWorker as soon as the application is stable
  // or after 30 seconds (whichever comes first).
  registrationStrategy: 'registerWhenStable:30000'
})],bootstrap:[AppComponent]}) export class AppModule{}
