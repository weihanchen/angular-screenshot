'use strict';
//requires
const pkg = require('./package'),
   bower = require('./bower'),
   path = require('path'),
   semver = require('semver'),
   webpack = require('webpack'),
   generateJsonPlugin = require('generate-json-webpack-plugin'),
   extractTextPlugin = require('extract-text-webpack-plugin'),
   copyWebpackPlugin = require('copy-webpack-plugin');
//variables
const argv = process.argv,
   isProduction = argv.indexOf('-p') != -1,
   filename = 'angular-screenshot' + (isProduction ? '.min' : ''),
   increase = (argv.filter(arg => arg.match(/^increase=.+$/))[0] || '').replace('increase=', ''),
   directivePath = path.resolve(__dirname, './src/angular-screenshot.js'),
   stylePath = path.resolve(__dirname, './src/stylesheets/main.scss'),
   buildPath = path.resolve(__dirname, './build');

//sync info with package.json
pkg.version = increase ? semver.inc(pkg.version, increase) : pkg.version;
['name', 'version', 'description', 'homepage', 'license', 'keywords', 'dependencies'].forEach(field => bower[field] = pkg[field]);



module.exports = {
   entry: [
      directivePath,
      stylePath
   ],
   output: {
      path: buildPath,
      filename: filename + '.js'
   },
   externals: Object.keys(pkg.dependencies),
   resolve: {
      extensions: ['.js', '.scss']
   },
   module: {
      loaders: [{
         test: /\.js/,
         exclude: /(node_modules|bower_components)/,
         loaders: ['babel-loader?presets[]=es2015']
      }, {
         test: /\.scss$/,
         loader: extractTextPlugin.extract({ use:[ 'css-loader', 'sass-loader'], fallback: 'style-loader' })
      }, {
         test: /jquery(\.min)?\.js$/,
         loader: 'expose?jQuery'
      }]
   },
   plugins: [
      new extractTextPlugin(filename + '.css'),
      new webpack.BannerPlugin('Angular Screenshot - v' + pkg.version + ' - ' + pkg.homepage + ' - (c) 2017 weihanchen - ' + pkg.license),
      new generateJsonPlugin('../bower.json', bower, undefined, 2),
      new generateJsonPlugin('../package.json', pkg, undefined, 2),
      new copyWebpackPlugin([
         { from: 'node_modules/angular/angular.min.js', to: '../examples/js/plugins' },
         { from: 'node_modules/jquery/dist/jquery.min.js', to: '../examples/js/plugins' },
         { from: 'node_modules/bootstrap/dist/css/bootstrap.min.css', to: '../examples/css/plugins' },
         { from: 'node_modules/bootstrap/dist/js/bootstrap.min.js', to: '../examples/js/plugins' },
         { from: 'node_modules/bootstrap/dist/fonts', to: '../examples/css/fonts' },
         { from: 'node_modules/font-awesome/fonts', to: '../examples/css/fonts'},
         { from: 'node_modules/font-awesome/css/font-awesome.min.css', to: '../examples/css/plugins'},
         { from: 'node_modules/highlightjs/styles/default.css', to: '../examples/css/plugins'},
         { from: 'node_modules/highlightjs/highlight.pack.min.js', to: '../examples/js/plugins'},
         { from: 'node_modules/bootstrap-material-design/dist/css/bootstrap-material-design.min.css', to: '../examples/css/plugins'},
         { from : 'node_modules/bootstrap-material-design/dist/css/ripples.min.css', to: '../examples/css/plugins'}
      ])
   ]
};
