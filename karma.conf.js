'use strict';
const webpackConfig = require('./webpack.config'),
   path = require('path'),
   generateJsonPlugin = require('generate-json-webpack-plugin');
webpackConfig.devtool = 'source-map';
webpackConfig.plugins = webpackConfig.plugins.filter(plugin => !(plugin instanceof generateJsonPlugin));
webpackConfig.module.rules.push({
   test: /\.js$/,
   include: path.resolve('src/'),
   loader: 'istanbul-instrumenter-loader',
   query: {
      esModules: true
   }
});
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
         'karma-coverage-istanbul-reporter',
         'karma-jasmine',
         'karma-phantomjs-launcher',
         'karma-mocha',
         'karma-mocha-reporter',
         'karma-sourcemap-loader',
         require('karma-coveralls'),
         require("karma-coverage"),
         require("karma-webpack")
      ],
      preprocessors: {
         'test/index.js': ['webpack', 'sourcemap']
      },
      webpack: webpackConfig,
      webpackMiddleware: {
         stats: "errors-only"
      },
      coverageIstanbulReporter: {

         // reports can be any that are listed here: https://github.com/istanbuljs/istanbul-reports/tree/590e6b0089f67b723a1fdf57bc7ccc080ff189d7/lib
         reports: ['html', 'lcovonly', 'text-summary'],

         // base output directory. If you include %browser% in the path it will be replaced with the karma browser name
         dir: path.join(__dirname, 'coverage'),

         // if using webpack and pre-loaders, work around webpack breaking the source path
         fixWebpackSourcePaths: true,

         // Most reporters accept additional config options. You can pass these through the `report-config` option
         'report-config': {

            // all options available at: https://github.com/istanbuljs/istanbul-reports/blob/590e6b0089f67b723a1fdf57bc7ccc080ff189d7/lib/html/index.js#L135-L137
            html: {
               // outputs the report in ./coverage/html
               subdir: 'html'
            }

         }
      },
      // coverageReporter: {
      //    reporters: [
      //       { type: 'lcov', dir: 'coverage' }
      //    ],
      // },
      reporters: ['mocha', 'coverage', 'coveralls', 'coverage-istanbul'],
      mochaReporter: {
         output: 'full'
      },
      // web server port
      port: 9876,
      // enable / disable colors in the output (reporters and logs)
      colors: true,
      // level of logging
      // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
      logLevel: config.LOG_INFO,
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
