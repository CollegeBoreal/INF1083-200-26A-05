const webpack = require('@nativescript/webpack');

module.exports = (env) => {
  webpack.init(env);
  // Learn how to customize nativescript webpack configuration:
  // https://docs.nativescript.org/configuration/webpack
  return webpack.resolveConfig();
};
