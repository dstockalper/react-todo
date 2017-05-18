var webpack = require('webpack');
var path    = require('path');

module.exports = {
  entry: [ // Where webpack starts compiling the bundle file; the first file webpack looks in for required modules and components, and adds them to bundle.js
    'script!jquery/dist/jquery.min.js',
    'script!foundation-sites/dist/foundation.min.js',
    './app/app.jsx'
  ],
  externals: {
    jquery: 'jQuery', // Let Foundation properly attach methods to the jQuery object
  },
  plugins: [
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery'
    })
  ],
  output: { // location and name of file to be created
    path: __dirname,
    filename: './public/bundle.js'
  },
  resolve: {
    root: __dirname,
    modulesDirectories: [
      'node_modules',
      './app/components', // automatically create aliases for component modules
      './app/api'
    ],
    alias: { // pick names for our components and tell webpack where to find those components...enables shorter require('') or import from paths
      app: 'app',
      applicationStyles: 'app/styles/app.scss',
      actions: 'app/actions/actions.jsx',
      reducers: 'app/reducers/reducers.jsx',
      configureStore: 'app/store/configureStore.jsx'
    },
    extensions: ['', '.js', '.jsx'] // file extensions to recognize
  },
  module: {
    loaders: [ // Can be used with preprocessors (SASS, LESS) or transpilers (babel)
      {
        loader: 'babel-loader', // Converts ES6
        query: {
          presets: ['react', 'es2015', 'stage-0']
        },
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  sassLoader: {
    includePaths: [
      path.resolve(__dirname, './node_modules/foundation-sites/scss')  // Make Sass loader aware that we have files to include from this folder
    ]
  },
  devtool: 'cheap-module-eval-source-map' // Creates "source maps" that allows developer to debug own code and not the bundled code that was transformed by webpack
};

// Due to a library bug there is a small issue in the next video. In the next lecture you'll learn how to setup source maps by setting a "devtool" property in webpack.config.js. In the lecture I set the value to "cheap-module-eval-source-map". This might cause the source maps to not work as shown in the video.
//
// If you are getting this error, try setting the value to either "inline-source-map" or "eval-source-map" instead.
