'use strict';
//requires
const pkg = require('./package'),
      bower = require('./bower'),
      semver = require('semver'),
      webpack = require('webpack'),
      generateJsonPlugin = require('generate-json-webpack-plugin');
//variables
const argv = process.argv,
      isProduction = argv.indexOf('-p') != -1,
      filename = 'angular-screenshot' + (isProduction ? '.min' : ''),
      increase = (argv.filter(arg => arg.match(/^increase=.+$/))[0] || '').replace('increase=', ''),
      rootPath = path.resolve(__dirname),
      appPath = path.resolve(__dirname, './src/angular.screenshot.js'),
      buildPath = path.resolve(__dirname, './build')

//sync info with package.json
pkg.version = increase ? semver.inc(pkg.version, increase) : pkg.version;
['name', 'version', 'description', 'homepage', 'license', 'keywords', 'dependencies'].forEach(field => bower[field] = pkg[field]);



module.exports = {
	entry: {
      main: appPath
   },
	output: {
		path: buildPath,
		filename: filename + '.js'
	},
	externals: Object.keys(pkg.dependencies),
	module: {
		preLoaders: [
			{ test: /\.ts$/, loader: 'tslint' }
		],
		loaders: [{
            test: /\.js/,
            exclude: /(node_modules|bower_components)/,
            loaders: ['babel-loader?presets[]=es2015']
        }, {
            test: /\.html$/,
            loader: 'raw'
        }, {
            test: /\.json$/,
            loader: 'json'
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }, {
            test: /\.scss$/,
            loaders: ["style", "css", "sass"]
        }, {
            test: /jquery(\.min)?\.js$/,
            loader: 'expose?jQuery'
        }, {
            test: /\.(png|jpg)$/,
            loader: 'file-loader'
        }, {
            test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url-loader?limit=10000&mimetype=application/font-woff"
        }, {
            test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url-loader?limit=10000&mimetype=application/font-woff"
        }, {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url-loader?limit=10000&mimetype=application/octet-stream"
        }, {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            loader: "file"
        }, {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url-loader?limit=10000&mimetype=image/svg+xml"
        }]
	},
	plugins: [
		new webpack.BannerPlugin('Angular Screenshot - v' + pkg.version + ' - ' + pkg.homepage + ' - (c) 2017 weihanchen - ' + pkg.license),
		new generateJsonPlugin('../bower.json', bower, undefined, 2),
		new generateJsonPlugin('../package.json', pkg, undefined, 2)
	]
};
