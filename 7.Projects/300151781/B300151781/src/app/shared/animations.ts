import { CoreTypes, View } from '@nativescript/core'

// Petites animations réutilisables (API d'animation de NativeScript)

export function slideIn(view: View, delay = 0): void {
  view.opacity = 0
  view.translateY = 24
  view.animate({ opacity: 1, translate: { x: 0, y: 0 }, duration: 420, delay, curve: CoreTypes.AnimationCurve.easeOut }).catch(() => {})
}

export function popIn(view: View): void {
  view.opacity = 0
  view.scaleX = 0.6
  view.scaleY = 0.6
  view.animate({ opacity: 1, scale: { x: 1, y: 1 }, duration: 500, curve: CoreTypes.AnimationCurve.spring }).catch(() => {})
}

export function pulse(view: View): void {
  view
    .animate({ scale: { x: 1.15, y: 1.15 }, duration: 140, curve: CoreTypes.AnimationCurve.easeOut })
    .then(() => view.animate({ scale: { x: 1, y: 1 }, duration: 160, curve: CoreTypes.AnimationCurve.easeIn }))
    .catch(() => {})
}

export function shake(view: View): void {
  const step = (x: number) => view.animate({ translate: { x, y: 0 }, duration: 60 })
  step(-12)
    .then(() => step(12))
    .then(() => step(-8))
    .then(() => step(8))
    .then(() => step(0))
    .catch(() => {})
}
