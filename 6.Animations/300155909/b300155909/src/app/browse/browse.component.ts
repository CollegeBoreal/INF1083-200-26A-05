import { Component, ViewChild, ElementRef } from '@angular/core';
import { Image, Application } from '@nativescript/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';

@Component({
  standalone: false,
  selector: 'Browse',
  templateUrl: './browse.component.html',
})
export class BrowseComponent {
  @ViewChild('nativeImage')
  nativeImage!: ElementRef<Image>;

  private isAnimating = false;

  onDrawerButtonTap(): void {
    const drawer = Application.getRootView() as RadSideDrawer;
    drawer.showDrawer();
  }

  async animate(): Promise<void> {
    const img = this.nativeImage?.nativeElement;

    if (!img || this.isAnimating) return;

    this.isAnimating = true;

    try {
      await img.animate({
        opacity: 0.2,
        duration: 500
      });

      await img.animate({
        opacity: 1,
        translate: { x: 60, y: 40 },
        duration: 700
      });

      await img.animate({
        scale: { x: 1.5, y: 1.5 },
        rotate: 360,
        duration: 1000
      });

      await img.animate({
        translate: { x: 0, y: 0 },
        scale: { x: 1, y: 1 },
        rotate: 0,
        duration: 700
      });

      console.log('Animation completed');
    } finally {
      this.isAnimating = false;
    }
  }
}