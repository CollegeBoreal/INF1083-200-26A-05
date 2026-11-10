import { Component, OnInit } from '@angular/core'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import { Application, View } from '@nativescript/core'

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
  animate(view: any, nuage1: any, nuage2: any) {
    let duration = 1200;
    nuage1.animate({ translate: { x: -150, y: 0 }, duration: duration, curve: "easeInOut" });
    nuage2.animate({ translate: { x: -200, y: 0 }, duration: duration, curve: "easeInOut" });
    view.animate({ opacity: 1, duration: 300 })
        .then(() => view.animate({ translate: { x: 200, y: -40 }, duration: duration, curve: "easeInOut" }))
        .then(() => view.animate({ rotate: 180, duration: 600, curve: "easeInOut" }))
        .then(() => view.animate({ translate: { x: 0, y: 0 }, duration: duration, curve: "easeInOut" }))
        .then(() => view.animate({ rotate: 360, duration: 600, curve: "easeInOut" }))
        .then(() => {
            console.log("Animation finished");
            nuage1.animate({ translate: { x: 0, y: 0 }, duration: 0 });
            nuage2.animate({ translate: { x: 0, y: 0 }, duration: 0 });
        })
        .catch((e) => {
            console.log(e.message);
        });
}
}
