import { Component, OnInit, ElementRef, ViewChild } from '@angular/core'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import { Application, View, AnimationDefinition } from '@nativescript/core'

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

  @ViewChild('cible', { read: ElementRef }) cible!: ElementRef<View>
  active = false
  async animate() {
    const view = this.cible.nativeElement
    if (this.active) return
    this.active = true
    const steps: AnimationDefinition[] = [
      { opacity: 0 }, { opacity: 1 },
      { translate: { x: 200, y: 200 } }, { translate: { x: 0, y: 0 } },
      { scale: { x: 5, y: 5 } }, { scale: { x: 1, y: 1 } },
      { rotate: 180 }, { rotate: 0 },
      { translate: { x: 0, y: -24 }, scale: { x: 0.9, y: 1.1 } },
      { translate: { x: 0, y: 0 }, scale: { x: 1, y: 1 } }
    ]
    try {
      for (const step of steps) await view.animate({ ...step, duration: 300 })
    } catch (error) { console.log(error) }
    finally { this.active = false }
  }
}
