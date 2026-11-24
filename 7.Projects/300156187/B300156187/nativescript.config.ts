import { NativeScriptConfig } from '@nativescript/core';

export default {
  id: 'com.restaurant.app',
  appPath: 'src',
  appResourcesPath: 'App_Resources',
  android: {
    v8Flags: '--expose_gc',
  },
  ios: {
    discardUncaughtJsExceptions: false,
  },
} as NativeScriptConfig;
