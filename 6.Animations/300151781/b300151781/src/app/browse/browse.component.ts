import { Component, OnInit } from '@angular/core'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import { Application, CoreTypes, View } from '@nativescript/core'

@Component({
  standalone: false,
  selector: 'Browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss'],
})
export class BrowseComponent implements OnInit {
  status = 'Prêt'
  isAnimating = false

  private readonly duration = 300
  private readonly curve = CoreTypes.AnimationCurve.easeInOut

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

  // Séquence complète demandée par l'énoncé
  animate(target: any) {
    // #cible est typé HTMLElement par Angular : on le convertit en View NativeScript
    const view = target as View
    const duration = this.duration
    const curve = this.curve
    this.start('Fondu')
    view
      .animate({ opacity: 0, duration, curve })
      .then(() => view.animate({ opacity: 1, duration, curve }))
      .then(() => (this.status = 'Déplacement'))
      .then(() => view.animate({ translate: { x: 200, y: 200 }, duration, curve }))
      .then(() => view.animate({ translate: { x: 0, y: 0 }, duration, curve }))
      .then(() => (this.status = 'Agrandissement'))
      .then(() => view.animate({ scale: { x: 5, y: 5 }, duration, curve }))
      .then(() => view.animate({ scale: { x: 1, y: 1 }, duration, curve }))
      .then(() => (this.status = 'Rotation'))
      .then(() => view.animate({ rotate: 180, duration, curve }))
      .then(() => view.animate({ rotate: 0, duration, curve }))
      .then(() => this.finish())
      .catch((e) => this.fail(e))
  }

  // Étapes individuelles
  fade(target: any) {
    this.run(target, 'Fondu', { opacity: 0 }, { opacity: 1 })
  }

  move(target: any) {
    this.run(target, 'Déplacement', { translate: { x: 200, y: 200 } }, { translate: { x: 0, y: 0 } })
  }

  zoom(target: any) {
    this.run(target, 'Agrandissement', { scale: { x: 5, y: 5 } }, { scale: { x: 1, y: 1 } })
  }

  spin(target: any) {
    this.run(target, 'Rotation', { rotate: 180 }, { rotate: 0 })
  }

  private run(target: any, label: string, to: object, back: object) {
    const view = target as View
    this.start(label)
    view
      .animate({ ...to, duration: this.duration, curve: this.curve })
      .then(() => view.animate({ ...back, duration: this.duration, curve: this.curve }))
      .then(() => this.finish())
      .catch((e) => this.fail(e))
  }

  private start(label: string) {
    this.isAnimating = true
    this.status = label
  }

  private finish() {
    this.isAnimating = false
    this.status = 'Animation terminée'
    console.log('Animation finished')
  }

  private fail(e: Error) {
    this.isAnimating = false
    this.status = 'Erreur : ' + e.message
    console.log(e.message)
  }
}
