
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from '@nativescript/angular';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/(homeTab:home//browseTab:browse//searchTab:search)',
    pathMatch: 'full',
  },
  {
    path: 'home',
    outlet: 'homeTab',
    loadChildren: () =>
      import('./home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'browse',
    outlet: 'browseTab',
    loadChildren: () =>
      import('./browse/browse.module').then(m => m.BrowseModule),
  },
  {
    path: 'search',
    outlet: 'searchTab',
    loadChildren: () =>
      import('./search/search.module').then(m => m.SearchModule),
  },
];

@NgModule({
  imports: [
    NativeScriptRouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {}

