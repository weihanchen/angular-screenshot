'use strict';
const webpackConfig = require('./webpack.config'),
   generateJsonPlugin = require('generate-json-webpack-plugin');
webpackConfig.devtool = 'source-map';
webpackConfig.plugins = webpackConfig.plugins.filter(plugin => !(plugin instanceof generateJsonPlugin));
// webpackConfig.module.postLoaders = [{
//    test: /\.js$/,
//    exclude: /(test|node_modules|bower_components)\//,
//    loader: 'istanbul-instrumenter'
// }];
module.exports = (config) => {
   const configuration = {
      basePath: '',
      frameworks: ['jasmine'],
      files: [
         'node_modules/jquery/dist/jquery.min.js',
         'node_modules/angular/angular.min.js',
         'node_modules/angular-mocks/angular-mocks.js',
         { pattern: 'test/index.js', watched: false }],
      plugins: [
         'karma-jasmine',
         'karma-phantomjs-launcher',
         'karma-mocha',
         'karma-mocha-reporter',
         'karma-sourcemap-loader',
         require("karma-coverage"),
         require("karma-coveralls"),
         require("karma-webpack")
      ],
      preprocessors: {
         'test/index.js': ['webpack', 'sourcemap', 'coverage']
      },
      webpack: webpackConfig,
      webpackMiddleware: {
         stats: "errors-only"
      },
      coverageReporter: {
         type: 'lcov',
         dir: 'coverage/'
      },
      reporters: ['mocha', 'coverage'],
      mochaReporter: {
         output: 'full'
      },
      // web server port
      port: 9876,
      // enable / disable colors in the output (reporters and logs)
      colors: true,
      // level of logging
      // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
      logLevel: config.LOG_DEBUG,
      // enable / disable watching file and executing tests whenever any file changes
      autoWatch: true,
      // start these browsers
      // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
      browsers: ['PhantomJS'],
      // If browser does not capture in given timeout [ms], kill it
      captureTimeout: 60000,
      // Continuous Integration mode
      // if true, Karma captures browsers, runs the tests and exits
      singleRun: true,
      // Concurrency level
      // how many browser should be started simultaneous
      concurrency: Infinity
   };
   if (process.env.TRAVIS) {
      configuration.reporters.push('coveralls');
   }
   config.set(configuration);
};
