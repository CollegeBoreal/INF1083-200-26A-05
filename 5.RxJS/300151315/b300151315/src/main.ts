import { Application } from '@nativescript/core';
import { platformNativeScript, runNativeScriptAngularApp } from '@nativescript/angular';

import { AppModule } from './app/app.module';

// Toujours le thème clair, même si le téléphone est en mode sombre
Application.setAutoSystemAppearanceChanged(false);
Application.on(Application.launchEvent, () => {
  Application.systemAppearanceChanged(Application.getRootView(), 'light');
});

runNativeScriptAngularApp({
  appModuleBootstrap: () => platformNativeScript().bootstrapModule(AppModule),
});
