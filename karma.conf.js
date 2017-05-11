var webpackConfig = require('./webpack.config.js');

module.exports = function(config) {
  config.set({
    browsers: ['Chrome'],
    singleRun: true,
    frameworks: ['mocha'],
    files: [
      'node_modules/jquery/dist/jquery.min.js',
      'node_modules/foundation-sites/dist/foundation.min.js',
      'app/tests/**/*.test.jsx'
    ], // match all files within tests folder and below, if they end in jsx
    preprocessors: {
      'app/tests/**/*.test.jsx': ['webpack', 'sourcemap'] // specify what is to be done with test files
    },
    reporters: ['mocha'], // shows you which tests pass and which fail
    client: { // If tests doesn't end after 20 seconds, time it out
      mocha: {
        timeout: '5000'
      }
    },
    webpack: webpackConfig, // karma runs closely with webpack
    webpackServer: {
      noInfo: true
    }
  });
};
