import { NativeScriptConfig } from '@nativescript/core';

export default {
  id: 'com.restaurant.app',
  appResourcesPath: 'App_Resources',
  android: {
    v8Flags: '--expose_gc',
    markwon: { enable: false },
  },
  ios: {
    discardUncaughtJsExceptions: true,
  },
  webpack: {
    webpackConfigPath: 'webpack.config.js',
  },
} as NativeScriptConfig;
