import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  NativeScriptCommonModule,
  NativeScriptRouterModule,
} from '@nativescript/angular';
import { View } from '@nativescript/core';

@Component({
  selector: 'Browse',
  templateUrl: './browse.component.html',
  imports: [NativeScriptCommonModule, NativeScriptRouterModule],
  schemas: [NO_ERRORS_SCHEMA],
})
export class BrowseComponent {

  animate(view: View) {
    let duration = 300;

    view.animate({ opacity: 0, duration: duration })
      .then(() => view.animate({ opacity: 1, duration: duration }))
      .then(() => view.animate({ translate: { x: 200, y: 200 }, duration: duration }))
      .then(() => view.animate({ translate: { x: 0, y: 0 }, duration: duration }))
      .then(() => view.animate({ scale: { x: 5, y: 5 }, duration: duration }))
      .then(() => view.animate({ scale: { x: 1, y: 1 }, duration: duration }))
      .then(() => view.animate({ rotate: 180, duration: duration }))
      .then(() => view.animate({ rotate: 0, duration: duration }));
  }

}