import { Application } from '@nativescript/core'
import { platformNativeScript, runNativeScriptAngularApp } from '@nativescript/angular'

import { AppModule } from './app/app.module'

// PlanBoréal garde toujours son thème clair, même si le téléphone est en mode sombre.
Application.setAutoSystemAppearanceChanged(false)
Application.on(Application.launchEvent, () => {
  if (__ANDROID__) {
    androidx.appcompat.app.AppCompatDelegate.setDefaultNightMode(androidx.appcompat.app.AppCompatDelegate.MODE_NIGHT_NO)
  }
})

runNativeScriptAngularApp({
  appModuleBootstrap: () => platformNativeScript().bootstrapModule(AppModule),
})
