# angular-screenshot

[![Build Status](https://travis-ci.org/weihanchen/angular-screenshot.svg?branch=master)](https://travis-ci.org/weihanchen/angular-screenshot)

[![npm](https://img.shields.io/npm/v/npm.svg)](https://img.shields.io/npm/v/angular-screenshot.svg?style=flat)

Angular screenshot in directive for screen capture.

Check out the homepage at [https://weihanchen.github.io/angular-screenshot/](https://weihanchen.github.io/angular-screenshot/)

## Installation
Get angular screenshot from bower, npm, or git.
```
$npm install angular-screenshot
$bower install angular-screenshot
$git clone https://github.com/weihanchen/angular-screenshot.git
```

Add dependencies to the section of your index.html
```html
<meta charset="utf-8">  
<link href="node_modules/angular-screenshot/build/angular-screenshot.min.css" rel="stylesheet" />
<script src="node_modules/jquery/dist/jquery.min.js"></script>
<script src="node_modules/angular/angular.min.js"></script>
<script src="node_modules/angular-screenshot/build/angular-screenshot.min.js"></script>
```

Add angular-screenshot dependency to module:
```javascript
angular.module("app", ["angular-screenshot"])
```

## Options
| Property       | Default       		| Description  |  Sample  |
| -------------  | ------------- 		| ------------:| ----	|
| target      	  | element.children()  | Use target element with capture section. | `<screenshot target="root"><screenshot>` |
| isOpen      	  | false      		   | Flag indicating that open the capture canvas. | `<screenshot target="{{::'#root'}}" isOpen="appCtrl.isOpen"><screenshot>` |
| toolboxOptions | {"filename": "screenshot.png", "cancelText": "cancel", "downloadText": "download"} | options of screenshot toolbox | `<screenshot target="root" isOpen="appCtrl.isOpen" toolbox-options="appCtrl.toolboxOptions"><screenshot>` |
| api 			  | {"download": download, "cancel": cancel} | Expose api to interactive custom template action. | `<screenshot target="root" isOpen="appCtrl.isOpen" toolbox-options="appCtrl.toolbarOptions" api="appCtrl.api"><screenshot>` |


## Basic Usage

Use screenshot as element or attribute, then use default template and cover children elements default
```html
<button class="btn btn-fab" ng-class="{true: 'btn-danger', false: 'btn-default'}[appCtrl.isBasicOpen]" ng-click="appCtrl.isBasicOpen = !appCtrl.isBasicOpen">
	<i ng-if="!appCtrl.isBasicOpen" class="material-icons">crop</i>
	<i ng-if="appCtrl.isBasicOpen" class="material-icons">close</i>
</button>
<!--screenshot-->
<screenshot is-open="appCtrl.isBasicOpen">
	<div class="panel-body">
		...
	</div>
</screenshot>
```

Use target parameter to set screenshot section on element
```html
<div id="target1" class="panel panel-info">
	...
	<div class="panel-body">
		<screenshot target="{{::'#target1'}}" is-open="appCtrl.target1Open" toolbox-options="appCtrl.target1Options"></screenshot>
			...
	</div>
</div>
```
```javascript
'use strict';
(function () {
angular.module('app', ['angular-screenshot'])
.controller('AppController', ['$scope', appController]);
	function appController($scope) {
		var self = this;
		self.target1Options = {
			filename: 'target1.png',
			downloadText: 'Download me',
			cancelText: 'Close it!'
		};
	}
})()
```

## Advanced usage
Use `screenshot-toolbox` to customize your toolbox, then use expose api to interactive with directive.
```html
<screenshot is-open="appCtrl.isAdvanceOpen" api="appCtrl.advanceApi">
	<screenshot-toolbox>
	<div class="btn-group-sm">
		<button class="btn btn-default btn-fab" ng-click="appCtrl.cancel()">
			<i class="material-icons">close</i>
		</button>
		<button class="btn btn-success btn-fab" ng-click="appCtrl.download()">
			<i class="material-icons">check</i>
		</button>
	</div>
	</screenshot-toolbox>
	<div class="panel-body">
		...
	</div>
</screenshot>
```

## Development scripts
* `npm run dev`: webpack lite server auto reload on changed.
* `npm run build`: generate built files and minified ones.
* `npm run watch`: watch source files and run build script.
* `npm run release`: increase package version.

##  Development requirements
* nodejs ^6.0.0

## Todos
* Capture with font can cause some problem, and this bug still trying fix.
* RWD issue fix.
* Add saveas feature.

## References
* [dom-to-image](https://github.com/tsayen/dom-to-image)
