import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import { Application } from '@nativescript/core'

@Component({
  standalone: false,
  selector: 'Home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @ViewChild('carreTS') carreTS!: ElementRef;

  lancerAnimation(): void {
    this.carreTS.nativeElement.animate({ translate: { x: 80, y: 0 }, rotate: 360, duration: 1500 }).then(() => {
      this.carreTS.nativeElement.animate({ translate: { x: 0, y: 0 }, rotate: 0, duration: 800 });
    });
  }
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
}


