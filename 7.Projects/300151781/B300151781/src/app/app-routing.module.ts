import { NgModule } from '@angular/core'
import { Routes } from '@angular/router'
import { NativeScriptRouterModule, NSEmptyOutletComponent } from '@nativescript/angular'

const routes: Routes = [
  {
    path: '',
    redirectTo: '/(exploreTab:explore/default//favoritesTab:favorites/default//mapTab:map/default//tripTab:trip/default//aboutTab:about/default)',
    pathMatch: 'full',
  },
  {
    path: 'explore',
    component: NSEmptyOutletComponent,
    loadChildren: () => import('~/app/explore/explore.module').then((m) => m.ExploreModule),
    outlet: 'exploreTab',
  },
  {
    path: 'favorites',
    component: NSEmptyOutletComponent,
    loadChildren: () => import('~/app/favorites/favorites.module').then((m) => m.FavoritesModule),
    outlet: 'favoritesTab',
  },
  {
    path: 'map',
    component: NSEmptyOutletComponent,
    loadChildren: () => import('~/app/map/map.module').then((m) => m.MapModule),
    outlet: 'mapTab',
  },
  {
    path: 'trip',
    component: NSEmptyOutletComponent,
    loadChildren: () => import('~/app/trip/trip.module').then((m) => m.TripModule),
    outlet: 'tripTab',
  },
  {
    path: 'about',
    component: NSEmptyOutletComponent,
    loadChildren: () => import('~/app/about/about.module').then((m) => m.AboutModule),
    outlet: 'aboutTab',
  },
]

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {}
