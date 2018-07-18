const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

function merge(source, target) {
  for (var p in target) {
    if (typeof target[p] === "object" && source[p] !== undefined) {
      merge(source[p], target[p]);
    } else {
      source[p] = target[p];
    }
  }
}

function rewireUglifyJs(config, options = {}) {
  config.plugins.map(plugin => {
    if (plugin.constructor.name === "UglifyJsPlugin") {
      merge(plugin.options, options);
      plugin = new UglifyJsPlugin(plugin.options);
    }
    return plugin;
  });
  return config;
}

module.exports = rewireUglifyJs;
