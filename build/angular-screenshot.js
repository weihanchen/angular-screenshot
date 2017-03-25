/*! Angular Screenshot - v0.1.0 - http://weihanchen.github.io/angular-screenshot - (c) 2017 weihanchen - MIT */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _angular = __webpack_require__(5);

var angular = _interopRequireWildcard(_angular);

var _utils = __webpack_require__(4);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var screenshot = function screenshot() {
   var screenshotController = function screenshotController($scope, $element, $compile, $timeout) {
      var colors = { gray: '#898b89', lightGray: '#e6e3e3' },
          hightLevelZindex = {
         top: 1,
         second: 0
      },
          toolboxTemplate = '<div class="screenshot-toolbox"><button ng-click="screenshotCtrl.download()">Download</button><button ng-click="screenshotCtrl.cancel()">Cancel</button></div>',
          toolboxMargin = 5,
          self = this;
      var calculateToolboxPosition = function calculateToolboxPosition(offsetLeft, offsetTop, rect, toolboxWidth, toolboxHeight) {
         var left = offsetLeft + rect.startX + rect.w;
         var top = offsetTop + rect.startY + rect.h;
         if (rect.w >= 0) left -= toolboxWidth;
         if (rect.h >= 0) top += toolboxMargin;else top = top - toolboxHeight - toolboxMargin;
         return {
            left: left,
            top: top
         };
      };

      var cancel = function cancel() {
         _utils.domprocess.remove(self.toolboxElement);
         _utils.domprocess.clearCanvasRect(self.interactiveCanvas);
      };

      var download = function download() {
         var element = getElement();
         _utils.domcapture.getCanvas(element).then(_utils.domprocess.canvasToImage).then(function (image) {
            return _utils.domprocess.clipImageToCanvas(image, self.rect.startX, self.rect.startY, self.rect.w, self.rect.h);
         }).then(_utils.domprocess.downloadCanvas);
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

      var getElement = function getElement() {
         return self.target ? angular.element(self.target)[0] : $element.children()[0];
      };
      var getTemplate = function getTemplate() {
         return self.template ? self.template : toolboxTemplate;
      };
      var getTemplateScope = function getTemplateScope() {
         return self.templateScope ? self.templateScope : $scope;
      };

      var setHightLevelZindex = function setHightLevelZindex() {
         var maxZindex = findMaxZindex();
         hightLevelZindex.second = maxZindex + 1;
         hightLevelZindex.top = hightLevelZindex.second + 1;
      };
      var canvasMousedownListener = function canvasMousedownListener() {
         _utils.domprocess.remove(self.toolboxElement);
      };

      var canvasMouseupListener = function canvasMouseupListener(canvas, rect) {
         if (rect.w != 0 && rect.h != 0) {
            self.rect = rect;
            var toolbox = $compile(getTemplate())(getTemplateScope());
            var toolboxElement = toolbox[0];
            /**
             * toolbox position setting
             * because read elememt's width sould indicated postion method, so we set position method first then move location with dom.
             */
            _utils.domprocess.setToolboxStackStyle(toolboxElement, hightLevelZindex.top).then(_utils.domprocess.appendToBody).then(function (element) {
               var position = calculateToolboxPosition(canvas.offsetLeft, canvas.offsetTop, rect, element.offsetWidth, element.offsetHeight);
               return _utils.domprocess.setToolboxPositionStyle(element, position.left, position.top);
            }).then(function (element) {
               self.toolboxElement = element;
            });
         }
      };

      var closeScreenshot = function closeScreenshot() {
         _utils.domprocess.remove(self.interactiveCanvas);
         _utils.domprocess.remove(self.toolboxElement);
      };

      var openScreenshot = function openScreenshot() {
         var element = getElement();
         var width = element.offsetWidth;
         var height = element.offsetHeight;
         var left = element.offsetLeft;
         var top = element.offsetTop;
         setHightLevelZindex();

         _utils.domprocess.createCanvas(width, height).then(function (canvas) {
            return _utils.domprocess.setCanvasStyle(canvas, left, top, colors.gray, hightLevelZindex.second);
         }).then(_utils.domprocess.appendToBody).then(function (canvas) {
            return _utils.domprocess.listenInteractiveCanvas(canvas, colors.lightGray, canvasMouseupListener, canvasMousedownListener);
         }).then(function (canvas) {
            return self.interactiveCanvas = canvas;
         });
      };

      self.cancel = cancel;
      self.download = download;
      self.interactiveCanvas;
      self.rect = {};
      self.toolboxElement;
      $timeout(function () {
         return self.api = {
            download: download,
            cancel: cancel
         };
      });

      $scope.$watch(function () {
         return self.isOpen;
      }, function (newVal) {
         if (newVal === true) {
            openScreenshot();
         } else if (newVal === false) {
            closeScreenshot();
         }
      });
   };
   return {
      restrict: 'AE',
      scope: {
         template: '=?',
         templateScope: '=?',
         target: '=',
         isOpen: '=',
         api: '=?'
      },
      controller: ['$scope', '$element', '$compile', '$timeout', screenshotController],
      controllerAs: 'screenshotCtrl',
      bindToController: true
   };
};
/**
 * @ngdoc directive
 * @name screenshot
 * @description
 * Capture dom setion with indicate element
 * 
 * @param {string=} [template=<div><button ng-click="download()">Download</button></div>] custom template for captured toolbox.
 * @param {string=} [templateScope=$scope] Scope to be passed to custom template - as $scope.
 * @param {string=} [target=element.children()] Use target element with capture section.
 * @param {boolean=} [isOpen=false] Flag indicating that open the capture canvas.
 * @param {object=} [api={download, cancel}] Expose api to interactive custom template action.
 */

angular.module('angular-screenshot', []).directive('screenshot', screenshot);

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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

var getCanvasImage = function getCanvasImage(element) {
   var cloneNode = element.cloneNode(true); //deep clone
   return Promise.resolve(cloneNode).then(addStylesheets).then(getSvgUrl).then(getImage);
};

var objectToArray = function objectToArray(obj) {
   return Object.keys(obj).map(function (key) {
      return obj[key];
   });
};

var domcapture = {
   getCanvas: getCanvas,
   getCanvasImage: getCanvasImage
};
exports.default = domcapture;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
   value: true
});
var appendToBody = function appendToBody(element) {
   document.body.appendChild(element);
   return Promise.resolve(element);
};

var canvasToImage = function canvasToImage(canvas) {
   return new Promise(function (resolve, reject) {
      var url = canvas.toDataURL('image/png');
      var image = new Image();
      image.onload = function () {
         resolve(image);
      };
      image.onerror = reject;
      image.src = url;
   });
};

var clearCanvasRect = function clearCanvasRect(canvas) {
   var context = canvas.getContext('2d');
   context.clearRect(0, 0, canvas.width, canvas.height);
};

var clipImageToCanvas = function clipImageToCanvas(image, clipStartX, clipStartY, clipWidth, clipHeight) {
   return createCanvas(Math.abs(clipWidth), Math.abs(clipHeight)).then(function (canvas) {
      var context = canvas.getContext('2d');
      context.drawImage(image, clipStartX, clipStartY, clipWidth, clipHeight, 0, 0, canvas.width, canvas.height);
      return canvas;
   });
};

var downloadCanvas = function downloadCanvas(canvas) {
   var downloadUrl = canvas.toDataURL('image/png');
   var downloadLink = document.createElement('a');
   downloadLink.href = downloadUrl;
   downloadLink.download = 'screenshot.png';
   downloadLink.target = '_blank';
   downloadLink.click();
   downloadLink.remove();
   return Promise.resolve(canvas);
};

var createCanvas = function createCanvas(width, height) {
   var canvas = document.createElement('canvas');
   canvas.width = width;
   canvas.height = height;
   return Promise.resolve(canvas);
};

var listenInteractiveCanvas = function listenInteractiveCanvas(canvas, rectBackground, mouseupListener, mousedownListener) {
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
   };

   var mousedown = function mousedown(e) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      rect.startX = e.pageX - canvas.offsetLeft;
      rect.startY = e.pageY - canvas.offsetTop;
      mousedownListener(rect);
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
      mouseupListener(canvas, rect);
   };
   canvas.addEventListener('mousedown', mousedown, false);
   canvas.addEventListener('mouseup', mouseup, false);
   canvas.addEventListener('mousemove', mousemove, false);
   return Promise.resolve(canvas);
};

var remove = function remove(element) {
   if (element) element.remove();
};

var setCanvasStyle = function setCanvasStyle(canvas, left, top, background, zIndex) {
   canvas.style.cursor = 'crosshair';
   canvas.style.position = 'absolute';
   canvas.style.left = left + 'px';
   canvas.style.top = top + 'px';
   canvas.style.background = background;
   canvas.style.zIndex = zIndex;
   canvas.style.opacity = 0.5;
   return Promise.resolve(canvas);
};

var setToolboxPositionStyle = function setToolboxPositionStyle(toolboxElement, left, top) {
   toolboxElement.style.left = left + 'px';
   toolboxElement.style.top = top + 'px';
   return Promise.resolve(toolboxElement);
};

var setToolboxStackStyle = function setToolboxStackStyle(toolboxElement, zIndex) {
   toolboxElement.style.position = 'absolute';
   toolboxElement.style.zIndex = zIndex;
   return Promise.resolve(toolboxElement);
};

var domprocess = {
   appendToBody: appendToBody,
   canvasToImage: canvasToImage,
   clearCanvasRect: clearCanvasRect,
   clipImageToCanvas: clipImageToCanvas,
   createCanvas: createCanvas,
   downloadCanvas: downloadCanvas,
   listenInteractiveCanvas: listenInteractiveCanvas,
   remove: remove,
   setCanvasStyle: setCanvasStyle,
   setToolboxPositionStyle: setToolboxPositionStyle,
   setToolboxStackStyle: setToolboxStackStyle
};

exports.default = domprocess;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
   value: true
});
exports.domprocess = exports.domcapture = undefined;

var _domCapture = __webpack_require__(2);

var _domCapture2 = _interopRequireDefault(_domCapture);

var _domProcess = __webpack_require__(3);

var _domProcess2 = _interopRequireDefault(_domProcess);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.domcapture = _domCapture2.default;
exports.domprocess = _domProcess2.default;
exports.default = {
   domcapture: _domCapture2.default,
   domprocess: _domProcess2.default
};

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = angular;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(0);
module.exports = __webpack_require__(1);


/***/ })
/******/ ]);