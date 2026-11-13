import { Component, OnInit } from '@angular/core'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import { Application } from '@nativescript/core'

@Component({
  standalone: false,
  selector: 'Browse',
  templateUrl: './browse.component.html',
})
export class BrowseComponent implements OnInit {
  constructor() {
    // Use the component constructor to inject providers.
  }

  ngOnInit(): void {
    // Init your component properties here.
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView()
    sideDrawer.showDrawer()
  }

  animate(view: any) {
    view
      .animate({ opacity: 0, duration: 300 })
      .then(() => view.animate({ opacity: 1, duration: 300 }))
      .then(() => view.animate({ translate: { x: 200, y: 200 }, duration: 300 }))
      .then(() => view.animate({ translate: { x: 0, y: 0 }, duration: 300 }))
      .then(() => view.animate({ scale: { x: 5, y: 5 }, duration: 300 }))
      .then(() => view.animate({ scale: { x: 1, y: 1 }, duration: 300 }))
      .then(() => view.animate({ rotate: 180, duration: 300 }))
      .then(() => view.animate({ rotate: 0, duration: 300 }))
      .then(() => console.log('Animation finished'))
      .catch((e) => console.log(e.message))
  }
}
