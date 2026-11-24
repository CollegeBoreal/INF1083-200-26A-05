import { Component } from "@angular/core";
import { Application, View } from "@nativescript/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";

@Component({
  selector: "Browse",
  standalone: false,
  templateUrl: "./browse.component.html"
})
export class BrowseComponent {
  private animationEnCours = false;

  onDrawerButtonTap(): void {
    const sideDrawer = Application.getRootView() as RadSideDrawer;
    sideDrawer.showDrawer();
  }

  async animate(view: View): Promise<void> {
    if (this.animationEnCours) {
      return;
    }

    this.animationEnCours = true;
    const duration = 350;

    try {
      await view.animate({ opacity: 0, duration });
      await view.animate({ opacity: 1, duration });
      await view.animate({ translate: { x: 48, y: -32 }, duration });
      await view.animate({ translate: { x: 0, y: 0 }, duration });
      await view.animate({ scale: { x: 1.4, y: 1.4 }, duration });
      await view.animate({ scale: { x: 1, y: 1 }, duration });
      await view.animate({ rotate: 180, duration });
      await view.animate({ rotate: 0, duration });
    } catch (erreur) {
      console.error("Animation de la boussole interrompue", erreur);
    } finally {
      view.opacity = 1;
      view.translateX = 0;
      view.translateY = 0;
      view.scaleX = 1;
      view.scaleY = 1;
      view.rotate = 0;
      this.animationEnCours = false;
    }
  }
}