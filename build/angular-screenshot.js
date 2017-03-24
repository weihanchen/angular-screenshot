/*! Angular Screenshot - v0.1.0 - http://weihanchen.github.io/angular-screenshot - (c) 2017 weihanchen - MIT */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _angular = __webpack_require__(1);

	var angular = _interopRequireWildcard(_angular);

	var _utils = __webpack_require__(2);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var screenshot = function screenshot() {
	   var screenshotController = function screenshotController($scope, $element, $compile) {
	      var colors = {
	         gray: '#898b89',
	         lightGray: '#e6e3e3'
	      },
	          hightLevelZindex = {
	         top: 1,
	         second: 0
	      },
	          self = this;
	      var cancel = function cancel($event) {
	         self.showToolbox = false;
	         $event.stopPropagation();
	      };
	      var download = function download($event) {
	         console.log('download');
	         $event.stopPropagation();
	      };

	      var findMaxZindex = function findMaxZindex() {
	         var zMax = 0;
	         angular.element('body *').each(function () {
	            var zIndex = angular.element(this).css('zIndex');
	            if (zIndex > zMax) {
	               zMax = zIndex;
	            }
	         });
	         return zMax;
	      };

	      var setHightLevelZindex = function setHightLevelZindex() {
	         var maxZindex = findMaxZindex();
	         hightLevelZindex.second = maxZindex + 1;
	         hightLevelZindex.top = hightLevelZindex.second + 1;
	      };

	      var interactiveCanvasListener = function interactiveCanvasListener(canvas, rect) {
	         self.rect = rect;
	         var template = '<button ng-click="screenshotCtrl.download()">Download</button>';
	         var toolbox = $compile(template)($scope);
	         document.body.appendChild(toolbox[0]);
	         toolbox.offset({
	            top: canvas.offsetTop + rect.startY + rect.h + 5,
	            left: canvas.offsetLeft + rect.startX
	         });
	         toolbox.css('zIndex', hightLevelZindex.top);
	         toolbox.css({
	            'position': 'absolute'
	         });
	      };

	      var start = function start() {
	         var elements = self.parent ? angular.element(self.parent) : $element;
	         var element = elements[0];
	         var width = element.offsetWidth;
	         var height = element.offsetHeight;
	         var left = element.offsetLeft;
	         var top = element.offsetTop;
	         setHightLevelZindex();

	         _utils.canvasprocess.createCanvas(width, height).then(function (canvas) {
	            return _utils.canvasprocess.setCanvasStyle(canvas, left, top, colors.gray, hightLevelZindex.second);
	         }).then(_utils.canvasprocess.appendToBody).then(function (canvas) {
	            return _utils.canvasprocess.listenInteractiveCanvas(canvas, colors.lightGray, interactiveCanvasListener);
	         }).then(function (canvas) {
	            return self.interactiveCanvas = canvas;
	         });
	         //  domcapture.getCanvas(element)
	         //   .then(canvas => {
	         //     angular.element('#render').append(canvas);
	         //   });
	      };
	      self.cancel = cancel;
	      self.download = download;
	      self.interactiveCanvas;
	      self.showToolbox = false;
	      $scope.$watch(function () {
	         return self.isOpen;
	      }, function (newVal) {
	         if (newVal === true) {
	            start();
	         } else if (self.interactiveCanvas) {
	            self.interactiveCanvas.remove();
	            self.showToolbox = false;
	         }
	      });
	   };
	   return {
	      restrict: 'AE',
	      scope: {
	         parent: '=',
	         isOpen: '='
	      },
	      controller: ['$scope', '$element', '$compile', screenshotController],
	      controllerAs: 'screenshotCtrl',
	      bindToController: true
	   };
	};

	angular.module('angular-screenshot', []).directive('screenshot', screenshot);

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = angular;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	   value: true
	});
	exports.canvasprocess = exports.domcapture = undefined;

	var _domCapture = __webpack_require__(3);

	var _domCapture2 = _interopRequireDefault(_domCapture);

	var _canvasProcess = __webpack_require__(4);

	var _canvasProcess2 = _interopRequireDefault(_canvasProcess);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.domcapture = _domCapture2.default;
	exports.canvasprocess = _canvasProcess2.default;
	exports.default = {
	   domcapture: _domCapture2.default,
	   canvasprocess: _canvasProcess2.default
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	   value: true
	});

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var xmlsSource = 'http://www.w3.org/2000/svg';

	var addStylesheets = function addStylesheets(node) {
	   return getMatchedStyleText(node).then(function (styleText) {
	      var styleNode = document.createElement('style');
	      node.appendChild(styleNode);
	      styleNode.appendChild(document.createTextNode(styleText));
	      return node;
	   });
	};

	var getImage = function getImage(url) {
	   return new Promise(function (resolve, reject) {
	      var image = new Image();
	      image.onload = function () {
	         resolve(image);
	      };
	      image.onerror = reject;
	      image.src = url;
	   });
	};

	var getMatchedStyleText = function getMatchedStyleText() {
	   var sheetsObj = document.styleSheets;
	   if (!sheetsObj) return Promise.resolve('');
	   var sheetsArr = objectToArray(sheetsObj);
	   var result = sheetsArr.reduce(function (sum, sheet) {
	      var rules = objectToArray(sheet.rules || sheet.cssRules);
	      sum.push.apply(sum, _toConsumableArray(rules.map(function (rule) {
	         return rule.cssText;
	      })));
	      return sum;
	   }, []).filter(function (result) {
	      return result;
	   }).join('');
	   return Promise.resolve(result);
	};

	var getSvgUrl = function getSvgUrl(node) {
	   return Promise.resolve(node).then(function (node) {
	      node.setAttribute('xmlns', node.namespaceURI);
	      return new XMLSerializer().serializeToString(node);
	   }).then(function (xhtml) {
	      return '<foreignObject x=\'0\' y=\'0\' width=\'100%\' height=\'100%\'>' + xhtml + '</foreignObject>';
	   }).then(function (foreignObjectStr) {
	      return '<svg xmlns=\'' + xmlsSource + '\' width=\'100%\' height=\'100%\'>' + foreignObjectStr + '</svg>';
	   }).then(function (svgContent) {
	      return 'data:image/svg+xml;charset=utf-8,' + svgContent;
	   });
	};

	var getCanvas = function getCanvas(element) {
	   var cloneNode = element.cloneNode(true); //deep clone
	   var width = element.offsetWidth;
	   var height = element.offsetHeight;
	   return Promise.resolve(cloneNode).then(addStylesheets).then(getSvgUrl).then(getImage).then(function (image) {
	      var canvas = document.createElement('canvas');
	      canvas.width = width;
	      canvas.height = height;
	      canvas.getContext('2d').drawImage(image, 0, 0);
	      return canvas;
	   });
	};

	var objectToArray = function objectToArray(obj) {
	   return Object.keys(obj).map(function (key) {
	      return obj[key];
	   });
	};

	var domcapture = {
	   getCanvas: getCanvas
	};
	exports.default = domcapture;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	'use strice';

	Object.defineProperty(exports, "__esModule", {
	   value: true
	});
	var appendToBody = function appendToBody(canvas) {
	   document.body.appendChild(canvas);
	   return canvas;
	};

	var createCanvas = function createCanvas(width, height) {
	   var canvas = document.createElement('canvas');
	   canvas.width = width;
	   canvas.height = height;
	   return Promise.resolve(canvas);
	};

	var listenInteractiveCanvas = function listenInteractiveCanvas(canvas, rectBackground, listener) {
	   var context = canvas.getContext('2d'),
	       rect = {
	      startX: 0,
	      startY: 0,
	      w: 0,
	      h: 0
	   };
	   var dragging = false;

	   var draw = function draw() {
	      context.fillStyle = rectBackground;
	      context.fillRect(rect.startX, rect.startY, rect.w, rect.h);
	      // context.stroke();
	   };

	   var mousedown = function mousedown(e) {
	      rect.startX = e.pageX - canvas.offsetLeft;
	      rect.startY = e.pageY - canvas.offsetTop;
	      rect.w = 0;
	      rect.h = 0;
	      dragging = true;
	   };

	   var mousemove = function mousemove(e) {
	      if (dragging) {
	         rect.w = e.pageX - canvas.offsetLeft - rect.startX;
	         rect.h = e.pageY - canvas.offsetTop - rect.startY;
	         context.clearRect(0, 0, canvas.width, canvas.height);
	         draw();
	      }
	   };

	   var mouseup = function mouseup() {
	      dragging = false;
	      if (rect.w != 0 && rect.h != 0) {
	         listener(canvas, rect);
	      }
	   };
	   canvas.addEventListener('mousedown', mousedown, false);
	   canvas.addEventListener('mouseup', mouseup, false);
	   canvas.addEventListener('mousemove', mousemove, false);
	   return Promise.resolve(canvas);
	};

	var setCanvasStyle = function setCanvasStyle(canvas, left, top, background, zIndex) {
	   canvas.style.cursor = 'crosshair';
	   canvas.style.position = 'absolute';
	   canvas.style.left = left + 'px';
	   canvas.style.top = top + 'px';
	   canvas.style.background = background;
	   canvas.style.zIndex = zIndex;
	   canvas.style.opacity = 0.5;
	   return canvas;
	};

	var canvasprocess = {
	   appendToBody: appendToBody,
	   createCanvas: createCanvas,
	   listenInteractiveCanvas: listenInteractiveCanvas,
	   setCanvasStyle: setCanvasStyle
	};

	exports.default = canvasprocess;

/***/ }
/******/ ]);