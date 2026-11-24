import { NgModule } from '@angular/core'
import { Routes } from '@angular/router'
import { NativeScriptRouterModule, NSEmptyOutletComponent } from '@nativescript/angular'

const routes: Routes = [
  {
    path: '',
    redirectTo: '/(homeTab:home/default//coursesTab:courses/default//tasksTab:tasks/default//profileTab:profile/default)',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: NSEmptyOutletComponent,
    loadChildren: () => import('~/app/home/home.module').then((m) => m.HomeModule),
    outlet: 'homeTab',
  },
  {
    path: 'courses',
    component: NSEmptyOutletComponent,
    loadChildren: () => import('~/app/courses/courses.module').then((m) => m.CoursesModule),
    outlet: 'coursesTab',
  },
  {
    path: 'tasks',
    component: NSEmptyOutletComponent,
    loadChildren: () => import('~/app/tasks/tasks.module').then((m) => m.TasksModule),
    outlet: 'tasksTab',
  },
  {
    path: 'profile',
    component: NSEmptyOutletComponent,
    loadChildren: () => import('~/app/profile/profile.module').then((m) => m.ProfileModule),
    outlet: 'profileTab',
  },
]

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {}
