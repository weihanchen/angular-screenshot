/*! Angular Screenshot - v0.1.1 - http://weihanchen.github.io/angular-screenshot - (c) 2017 weihanchen - MIT */
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
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _angular = __webpack_require__(9);

var angular = _interopRequireWildcard(_angular);

var _directives = __webpack_require__(2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

angular.module('angular-screenshot', []).directive('screenshot', _directives.screenshot).directive('screenshotToolbox', _directives.screenshotToolbox);

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
exports.screenshotToolbox = exports.screenshot = undefined;

var _screenshot = __webpack_require__(4);

var _screenshot2 = _interopRequireDefault(_screenshot);

var _screenshotToolbox = __webpack_require__(3);

var _screenshotToolbox2 = _interopRequireDefault(_screenshotToolbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.screenshot = _screenshot2.default;
exports.screenshotToolbox = _screenshotToolbox2.default;
exports.default = {
   screenshot: _screenshot2.default,
   screenshotToolbox: _screenshotToolbox2.default
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
   value: true
});
var screenshotToolbox = function screenshotToolbox() {
   var linkFn = function linkFn(scope, element, attrs, screenshotCtrl) {
      var template = '<div>' + element.children().html() + '</div>';
      screenshotCtrl.setTemplate(template, scope);
      element.remove();
   };
   return {
      restruct: 'E',
      template: '<div class="screenshot-toolbox-custom" ng-transclude></div>',
      require: '^screenshot',
      link: linkFn,
      transclude: true
   };
};
/**
 * @ngdoc directive
 * @name screenshot-toolbox
 * @description
 * Custom template of screenshot toolbox, connent with screenshot
*/
exports.default = screenshotToolbox;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
   value: true
});

var _utils = __webpack_require__(7);

var _domToImage = __webpack_require__(8);

var _domToImage2 = _interopRequireDefault(_domToImage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var screenshot = function screenshot() {
   var screenshotController = function screenshotController($scope, $element, $compile, $timeout) {
      var colors = { gray: '#898b89', lightGray: '#e6e3e3' },
          hightLevelZindex = {
         top: 1,
         second: 0
      },
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
         // closeScreenshot();
         self.isOpen = false;
         $timeout(function () {
            var elementSelector = getElementSelector();
            var element = elementSelector[0];
            var options = getOptions(element);

            _domToImage2.default.toPng(element, options).then(_utils.domprocess.dataUrlToImage).then(function (image) {
               _utils.domprocess.remove(image);
               return _utils.domprocess.clipImageToCanvas(image, self.rect.startX, self.rect.startY, self.rect.w, self.rect.h);
            }).then(function (canvas) {
               return _utils.domprocess.downloadCanvas(canvas, self.filename);
            }).then(_utils.domprocess.remove);
         });

         //  domcapture.getCanvas(element)
         //     .then(canvas => domprocess.downloadCanvas(canvas, self.filename));
         //
         //  domcapture.getCanvas(element)
         //     .then(domprocess.canvasToImage)
         //     .then(image => domprocess.clipImageToCanvas(image, self.rect.startX, self.rect.startY, self.rect.w, self.rect.h))
         //     .then(canvas => domprocess.downloadCanvas(canvas, self.filename));
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

      var getElementSelector = function getElementSelector() {
         return self.target ? angular.element(self.target) : $element.filter(function (index, element) {
            var elementName = element.tagName.toLowerCase();
            return elementName !== 'screenshot-toolbox';
         });
      };

      var getOptions = function getOptions(element) {
         var boudingClientRect = element.getBoundingClientRect();
         var options = {
            width: boudingClientRect.width,
            height: boudingClientRect.height
         };
         if (_utils.domprocess.isTransparent(element)) {
            var parentBackgroundColor = _utils.domprocess.getStyle(element, 'backgroundColor');
            options = Object.assign({}, options, { 'bgcolor': parentBackgroundColor });
         }
         return options;
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
            _utils.domprocess.remove(self.toolboxElement);
            self.rect = rect;
            var toolbox = $compile(self.template)(self.templateScope);
            $scope.$apply();
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

      var canvasContextmenuListener = function canvasContextmenuListener() {
         self.isOpen = false;
         $scope.$apply();
      };

      var closeScreenshot = function closeScreenshot() {
         _utils.domprocess.remove(self.interactiveCanvas);
         _utils.domprocess.remove(self.toolboxElement);
      };

      var openScreenshot = function openScreenshot() {
         var elementSelector = getElementSelector();
         var boudingClientRect = elementSelector[0].getBoundingClientRect();
         var width = boudingClientRect.width;
         var height = boudingClientRect.height;
         var offset = elementSelector.offset();
         var left = offset.left;
         var top = offset.top;
         setHightLevelZindex();

         _utils.domprocess.createCanvas(width, height).then(function (canvas) {
            return _utils.domprocess.setCanvasStyle(canvas, left, top, colors.gray, hightLevelZindex.second);
         }).then(_utils.domprocess.appendToBody).then(function (canvas) {
            return _utils.domprocess.listenInteractiveCanvas(canvas, colors.lightGray, canvasMouseupListener, canvasMousedownListener, canvasContextmenuListener);
         }).then(function (canvas) {
            return self.interactiveCanvas = canvas;
         });
      };
      /**
       *
       * @param {string} template - allow screenshot-toolbox directive setting with
       * @param {string} templateScope - scope of $compile toolbox content
       */
      var setTemplate = function setTemplate(template, templateScope) {
         self.template = template;
         self.templateScope = templateScope;
      };

      self.cancel = cancel;
      self.download = download;
      self.interactiveCanvas;
      self.rect = {};
      self.toolboxElement;
      self.cancelText = 'Cancel';
      self.downloadText = 'Download';
      self.filename = 'screenshot.png';
      self.setTemplate = setTemplate;
      self.template = '<div class="screenshot-toolbox">' + '<button class="btn" type="button" ng-click="screenshotCtrl.cancel()">{{screenshotCtrl.cancelText}}</button>' + '<button class="btn" type="button" ng-click="screenshotCtrl.download()">{{screenshotCtrl.downloadText}}</button>' + '</div>';
      self.templateScope = $scope;
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

      $scope.$watch(function () {
         return self.toolboxOptions;
      }, function (newVal) {
         if (!angular.isObject(newVal)) return;
         self.cancelText = newVal.cancelText ? newVal.cancelText : self.cancelText;
         self.downloadText = newVal.downloadText ? newVal.downloadText : self.downloadText;
         self.filename = newVal.filename ? newVal.filename : self.filename;
      });
   };
   return {
      restrict: 'AE',
      scope: {
         target: '@',
         isOpen: '=',
         toolboxOptions: '=?',
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
 * @param {string@} [target=element.children()] Use target element with capture section.
 * @param {boolean=} [isOpen=false] Flag indicating that open the capture canvas.
 * @param {object=} [toolboxOptions=
 * {
 *    filename: 'screenshot.png',
 *    cancelText: 'Cancel',
 *    downloadText: 'Download'
 * }] toolboxOptions
 * @param {object=} [api={download, cancel}] Expose api to interactive custom template action.
 */
exports.default = screenshot;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
   value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var xmlsSource = 'http://www.w3.org/2000/svg',
    urlPattern = /url\(['"]?([^'"]+?)['"]?\)/g,
    dataUrlPattern = /^(data:)/;

var addStylesheets = function addStylesheets(node) {
   return getMatchedStyleText(node).then(function (styleText) {
      var styleNode = document.createElement('style');
      node.appendChild(styleNode);
      styleNode.appendChild(document.createTextNode(styleText));
      return node;
   });
};

var dataUrlToCssText = function dataUrlToCssText(cssText, url, dataUrl) {
   var pattern = new RegExp('(url\\([\'"]?)(' + escape(url) + ')([\'"]?\\))', 'g');
   return cssText.replace(pattern, '$1' + dataUrl + '$3');
};

var dataToUrl = function dataToUrl(data, type) {
   return 'data:' + type + ';base64,' + data;
};

var escape = function escape(str) {
   return str.replace(/([.*+?^${}()|\[\]\/\\])/g, '\\$1');
};

var getAndEncode = function getAndEncode(url) {
   var timeout = 30000;
   return new Promise(function (resolve) {
      var request = new XMLHttpRequest();
      var fail = function fail(message) {
         console.error(message);
         resolve('');
      };
      request.onreadystatechange = function () {
         if (request.readyState !== 4) return;
         if (request.status !== 200) {
            fail('cannot fetch resource: ' + url + ', status: ' + request.status);
            return;
         }
         var encoder = new FileReader();
         encoder.onloadend = function () {
            resolve(encoder.result.split(/,/)[1]);
         };
         encoder.readAsDataURL(request.response);
      };
      request.ontimeout = function () {
         fail('timeout of ' + timeout + 'ms occured while fetching resource: ' + url);
      };
      request.responseType = 'blob';
      request.timeout = timeout;
      request.open('GET', url, true);
      request.send();
   });
};

var getExtension = function getExtension(url) {
   var match = /\.([^\.\/]*?)$/g.exec(url);
   if (match) return match[1];else return '';
};

var getInline = function getInline(cssText, url, baseUrl) {
   return Promise.resolve(url).then(function (url) {
      return baseUrl ? resolveUrl(url, baseUrl) : url;
   }).then(getAndEncode).then(function (data) {
      return dataToUrl(data, getMimeType(url));
   }).then(function (dataUrl) {
      return dataUrlToCssText(cssText, url, dataUrl);
   });
};

var getInilnes = function getInilnes(rule) {
   var baseUrl = rule.parentStyleSheet ? rule.parentStyleSheet.href : rule.parentStyleSheet;
   var cssText = rule.cssText;
   if (!isUrl(cssText)) return Promise.resolve(cssText);
   return Promise.resolve(cssText).then(getUrls).then(function (urls) {
      var done = Promise.resolve(cssText);
      urls.forEach(function (url) {
         done = done.then(function (cssText) {
            return getInline(cssText, url, baseUrl);
         });
      });
      return done;
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

var getCssRules = function getCssRules() {
   var sheetsObj = document.styleSheets;
   if (!sheetsObj) return Promise.resolve([]);
   var sheetsArr = objectToArray(sheetsObj);
   var result = sheetsArr.reduce(function (sum, sheet) {
      var rulesObject = sheet.rules || sheet.cssRules;
      if (rulesObject) {
         var rules = objectToArray(rulesObject);
         sum.push.apply(sum, _toConsumableArray(rules));
      }
      return sum;
   }, []);
   return Promise.resolve(result);
};

var getMatchedStyleText = function getMatchedStyleText() {
   return getCssRules().then(function (rules) {
      return rules.map(function (rule) {
         return getInilnes(rule);
      });
   }).then(function (rules) {
      return Promise.all(rules);
   }).then(function (cssTexts) {
      return cssTexts.join('\n');
   });
};

var getMimeType = function getMimeType(url) {
   var mines = {
      woff: 'application/font-woff',
      woff2: 'application/font-woff',
      ttf: 'application/font-truetype',
      png: 'image/png',
      jpeg: 'image/jpeg',
      gif: 'image/gif',
      tiff: 'image/tiff',
      svg: 'image/svg+xml'
   };
   var extension = getExtension(url).toLowerCase();
   return mines.hasOwnProperty(extension) ? mines[extension] : '';
};

var getSvgUrl = function getSvgUrl(node) {
   return Promise.resolve(node).then(function (node) {
      node.setAttribute('xmlns', node.namespaceURI);
      return new XMLSerializer().serializeToString(node);
   }).then(function (xhtml) {
      return '<foreignObject x=\'0\' y=\'0\' width=\'100%\' height=\'100%\'>' + xhtml + '</foreignObject>';
   }).then(function (foreignObjectStr) {
      return '<svg xmlns=\'' + xmlsSource + '\'>' + foreignObjectStr + '</svg>';
   }).then(function (svgContent) {
      return 'data:image/svg+xml;charset=utf-8,' + svgContent;
   });
};

var getCanvas = function getCanvas(element, options) {
   options = options || {};
   var cloneNode = element.cloneNode(true); //deep clone
   var boudingClientRect = element.getBoundingClientRect();
   var width = boudingClientRect.width;
   var height = boudingClientRect.height;
   return Promise.resolve(cloneNode).then(addStylesheets).then(getSvgUrl).then(getImage).then(function (image) {
      var canvas = document.createElement('canvas');
      canvas.width = options.width || width;
      canvas.height = options.height || height;
      canvas.getContext('2d').drawImage(image, 0, 0);
      return canvas;
   });
};

var getCanvasImage = function getCanvasImage(element) {
   var cloneNode = element.cloneNode(true); //deep clone
   return Promise.resolve(cloneNode).then(addStylesheets).then(getSvgUrl).then(getImage);
};

var getUrls = function getUrls(cssText) {
   var result = [];
   var match = void 0;
   while ((match = urlPattern.exec(cssText)) !== null) {
      result.push(match[1]);
   }
   return result.filter(function (url) {
      return !isDataUrl(url);
   });
};

var isDataUrl = function isDataUrl(url) {
   return url.search(dataUrlPattern) !== -1;
};

var isUrl = function isUrl(str) {
   return str.search(urlPattern) !== -1;
};

var objectToArray = function objectToArray(obj) {
   return Object.keys(obj).map(function (key) {
      return obj[key];
   });
};

var resolveUrl = function resolveUrl(url, baseUrl) {
   var doc = document.implementation.createHTMLDocument();
   var base = doc.createElement('base');
   doc.head.appendChild(base);
   var link = doc.createElement('a');
   doc.body.appendChild(link);
   base.href = baseUrl;
   link.href = url;
   return link.href;
};

var domcapture = {
   getCanvas: getCanvas,
   getCanvasImage: getCanvasImage
};
exports.default = domcapture;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
   value: true
});
var DOMURL = window.URL || window.webkitURL || window;
var appendToBody = function appendToBody(element) {
   document.body.appendChild(element);
   return Promise.resolve(element);
};

var canvasToImage = function canvasToImage(canvas) {
   var url = canvas.toDataURL('image/png');
   return dataUrlToImage(url);
};

var clearCanvasRect = function clearCanvasRect(canvas) {
   var context = canvas.getContext('2d');
   context.clearRect(0, 0, canvas.width, canvas.height);
};

var clipImageToCanvas = function clipImageToCanvas(image, clipStartX, clipStartY, clipWidth, clipHeight) {
   return createCanvas(Math.abs(clipWidth), Math.abs(clipHeight)).then(function (canvas) {
      var context = canvas.getContext('2d');
      context.drawImage(image, clipStartX, clipStartY, clipWidth, clipHeight, 0, 0, canvas.width, canvas.height);
      remove(image);
      return canvas;
   });
};

var createCanvas = function createCanvas(width, height) {
   var canvas = document.createElement('canvas');
   canvas.width = width;
   canvas.height = height;
   return Promise.resolve(canvas);
};

var dataUrlToImage = function dataUrlToImage(url) {
   return new Promise(function (resolve, reject) {
      var image = new Image();
      image.onload = function () {
         resolve(image);
      };
      image.onerror = reject;
      image.src = url;
   });
};

var downloadCanvas = function downloadCanvas(canvas, filename) {
   var downloadUrl = canvas.toDataURL('image/png');
   var downloadLink = document.createElement('a');
   downloadLink.href = downloadUrl;
   downloadLink.download = filename;
   downloadLink.target = '_blank';
   downloadLink.click();
   downloadLink.remove();
   DOMURL.revokeObjectURL(downloadUrl);

   return Promise.resolve(canvas);
};

var getStyle = function getStyle(element, property) {
   var styles = window.getComputedStyle(element);
   return styles[property];
};

var isTransparent = function isTransparent(element) {
   var backgroundColor = window.getComputedStyle(element).backgroundColor;
   return backgroundColor === 'transparent' || backgroundColor === '' || backgroundColor === 'rgba(0,0,0,0)';
};

var listenInteractiveCanvas = function listenInteractiveCanvas(canvas, rectBackground, mouseupListener, mousedownListener, contextmenuListener) {
   var context = canvas.getContext('2d'),
       rect = {
      startX: 0,
      startY: 0,
      w: 0,
      h: 0
   };
   var dragging = false;

   var draw = function draw() {
      context.beginPath();
      context.fillStyle = rectBackground;
      context.fillRect(rect.startX, rect.startY, rect.w, rect.h);
      context.closePath();
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

   var contextmenu = function contextmenu(e) {
      contextmenuListener();
      e.preventDefault();
      return false;
   };
   canvas.addEventListener('mousedown', mousedown, false);
   canvas.addEventListener('mouseup', mouseup, false);
   canvas.addEventListener('mousemove', mousemove, false);
   canvas.addEventListener('contextmenu', contextmenu, false);
   return Promise.resolve(canvas);
};

var remove = function remove(element) {
   if (element) element.remove();
   element = null;
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
   dataUrlToImage: dataUrlToImage,
   downloadCanvas: downloadCanvas,
   getStyle: getStyle,
   isTransparent: isTransparent,
   listenInteractiveCanvas: listenInteractiveCanvas,
   remove: remove,
   setCanvasStyle: setCanvasStyle,
   setToolboxPositionStyle: setToolboxPositionStyle,
   setToolboxStackStyle: setToolboxStackStyle
};

exports.default = domprocess;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
   value: true
});
exports.domprocess = exports.domcapture = undefined;

var _domCapture = __webpack_require__(5);

var _domCapture2 = _interopRequireDefault(_domCapture);

var _domProcess = __webpack_require__(6);

var _domProcess2 = _interopRequireDefault(_domProcess);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.domcapture = _domCapture2.default;
exports.domprocess = _domProcess2.default;
exports.default = {
   domcapture: _domCapture2.default,
   domprocess: _domProcess2.default
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

(function (global) {
    'use strict';

    var util = newUtil();
    var inliner = newInliner();
    var fontFaces = newFontFaces();
    var images = newImages();

    var domtoimage = {
        toSvg: toSvg,
        toPng: toPng,
        toJpeg: toJpeg,
        toBlob: toBlob,
        toPixelData: toPixelData,
        impl: {
            fontFaces: fontFaces,
            images: images,
            util: util,
            inliner: inliner
        }
    };

    if (true)
        module.exports = domtoimage;
    else
        global.domtoimage = domtoimage;


    /**
     * @param {Node} node - The DOM Node object to render
     * @param {Object} options - Rendering options
     * @param {Function} options.filter - Should return true if passed node should be included in the output
     *          (excluding node means excluding it's children as well). Not called on the root node.
     * @param {String} options.bgcolor - color for the background, any valid CSS color value.
     * @param {Number} options.width - width to be applied to node before rendering.
     * @param {Number} options.height - height to be applied to node before rendering.
     * @param {Object} options.style - an object whose properties to be copied to node's style before rendering.
     * @param {Number} options.quality - a Number between 0 and 1 indicating image quality (applicable to JPEG only),
                defaults to 1.0.
     * @return {Promise} - A promise that is fulfilled with a SVG image data URL
     * */
    function toSvg(node, options) {
        options = options || {};
        return Promise.resolve(node)
            .then(function (node) {
                return cloneNode(node, options.filter, true);
            })
            .then(embedFonts)
            .then(inlineImages)
            .then(applyOptions)
            .then(function (clone) {
                return makeSvgDataUri(clone,
                    options.width || util.width(node),
                    options.height || util.height(node)
                );
            });

        function applyOptions(clone) {
            if (options.bgcolor) clone.style.backgroundColor = options.bgcolor;

            if (options.width) clone.style.width = options.width + 'px';
            if (options.height) clone.style.height = options.height + 'px';

            if (options.style)
                Object.keys(options.style).forEach(function (property) {
                    clone.style[property] = options.style[property];
                });

            return clone;
        }
    }

    /**
     * @param {Node} node - The DOM Node object to render
     * @param {Object} options - Rendering options, @see {@link toSvg}
     * @return {Promise} - A promise that is fulfilled with a Uint8Array containing RGBA pixel data.
     * */
    function toPixelData(node, options) {
        return draw(node, options || {})
            .then(function (canvas) {
                return canvas.getContext('2d').getImageData(
                    0,
                    0,
                    util.width(node),
                    util.height(node)
                ).data;
            });
    }

    /**
     * @param {Node} node - The DOM Node object to render
     * @param {Object} options - Rendering options, @see {@link toSvg}
     * @return {Promise} - A promise that is fulfilled with a PNG image data URL
     * */
    function toPng(node, options) {
        return draw(node, options || {})
            .then(function (canvas) {
                return canvas.toDataURL();
            });
    }

    /**
     * @param {Node} node - The DOM Node object to render
     * @param {Object} options - Rendering options, @see {@link toSvg}
     * @return {Promise} - A promise that is fulfilled with a JPEG image data URL
     * */
    function toJpeg(node, options) {
        options = options || {};
        return draw(node, options)
            .then(function (canvas) {
                return canvas.toDataURL('image/jpeg', options.quality || 1.0);
            });
    }

    /**
     * @param {Node} node - The DOM Node object to render
     * @param {Object} options - Rendering options, @see {@link toSvg}
     * @return {Promise} - A promise that is fulfilled with a PNG image blob
     * */
    function toBlob(node, options) {
        return draw(node, options || {})
            .then(util.canvasToBlob);
    }

    function draw(domNode, options) {
        return toSvg(domNode, options)
            .then(util.makeImage)
            .then(util.delay(100))
            .then(function (image) {
                var canvas = newCanvas(domNode);
                canvas.getContext('2d').drawImage(image, 0, 0);
                return canvas;
            });

        function newCanvas(domNode) {
            var canvas = document.createElement('canvas');
            canvas.width = options.width || util.width(domNode);
            canvas.height = options.height || util.height(domNode);

            if (options.bgcolor) {
                var ctx = canvas.getContext('2d');
                ctx.fillStyle = options.bgcolor;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }

            return canvas;
        }
    }

    function cloneNode(node, filter, root) {
        if (!root && filter && !filter(node)) return Promise.resolve();

        return Promise.resolve(node)
            .then(makeNodeCopy)
            .then(function (clone) {
                return cloneChildren(node, clone, filter);
            })
            .then(function (clone) {
                return processClone(node, clone);
            });

        function makeNodeCopy(node) {
            if (node instanceof HTMLCanvasElement) return util.makeImage(node.toDataURL());
            return node.cloneNode(false);
        }

        function cloneChildren(original, clone, filter) {
            var children = original.childNodes;
            if (children.length === 0) return Promise.resolve(clone);

            return cloneChildrenInOrder(clone, util.asArray(children), filter)
                .then(function () {
                    return clone;
                });

            function cloneChildrenInOrder(parent, children, filter) {
                var done = Promise.resolve();
                children.forEach(function (child) {
                    done = done
                        .then(function () {
                            return cloneNode(child, filter);
                        })
                        .then(function (childClone) {
                            if (childClone) parent.appendChild(childClone);
                        });
                });
                return done;
            }
        }

        function processClone(original, clone) {
            if (!(clone instanceof Element)) return clone;

            return Promise.resolve()
                .then(cloneStyle)
                .then(clonePseudoElements)
                .then(copyUserInput)
                .then(fixSvg)
                .then(function () {
                    return clone;
                });

            function cloneStyle() {
                copyStyle(window.getComputedStyle(original), clone.style);

                function copyStyle(source, target) {
                    if (source.cssText) target.cssText = source.cssText;
                    else copyProperties(source, target);

                    function copyProperties(source, target) {
                        util.asArray(source).forEach(function (name) {
                            target.setProperty(
                                name,
                                source.getPropertyValue(name),
                                source.getPropertyPriority(name)
                            );
                        });
                    }
                }
            }

            function clonePseudoElements() {
                [':before', ':after'].forEach(function (element) {
                    clonePseudoElement(element);
                });

                function clonePseudoElement(element) {
                    var style = window.getComputedStyle(original, element);
                    var content = style.getPropertyValue('content');

                    if (content === '' || content === 'none') return;

                    var className = util.uid();
                    clone.className = clone.className + ' ' + className;
                    var styleElement = document.createElement('style');
                    styleElement.appendChild(formatPseudoElementStyle(className, element, style));
                    clone.appendChild(styleElement);

                    function formatPseudoElementStyle(className, element, style) {
                        var selector = '.' + className + ':' + element;
                        var cssText = style.cssText ? formatCssText(style) : formatCssProperties(style);
                        return document.createTextNode(selector + '{' + cssText + '}');

                        function formatCssText(style) {
                            var content = style.getPropertyValue('content');
                            return style.cssText + ' content: ' + content + ';';
                        }

                        function formatCssProperties(style) {

                            return util.asArray(style)
                                .map(formatProperty)
                                .join('; ') + ';';

                            function formatProperty(name) {
                                return name + ': ' +
                                    style.getPropertyValue(name) +
                                    (style.getPropertyPriority(name) ? ' !important' : '');
                            }
                        }
                    }
                }
            }

            function copyUserInput() {
                if (original instanceof HTMLTextAreaElement) clone.innerHTML = original.value;
                if (original instanceof HTMLInputElement) clone.setAttribute("value", original.value);
            }

            function fixSvg() {
                if (!(clone instanceof SVGElement)) return;
                clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

                if (!(clone instanceof SVGRectElement)) return;
                ['width', 'height'].forEach(function (attribute) {
                    var value = clone.getAttribute(attribute);
                    if (!value) return;

                    clone.style.setProperty(attribute, value);
                });
            }
        }
    }

    function embedFonts(node) {
        return fontFaces.resolveAll()
            .then(function (cssText) {
                var styleNode = document.createElement('style');
                node.appendChild(styleNode);
                styleNode.appendChild(document.createTextNode(cssText));
                return node;
            });
    }

    function inlineImages(node) {
        return images.inlineAll(node)
            .then(function () {
                return node;
            });
    }

    function makeSvgDataUri(node, width, height) {
        return Promise.resolve(node)
            .then(function (node) {
                node.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
                return new XMLSerializer().serializeToString(node);
            })
            .then(util.escapeXhtml)
            .then(function (xhtml) {
                return '<foreignObject x="0" y="0" width="100%" height="100%">' + xhtml + '</foreignObject>';
            })
            .then(function (foreignObject) {
                return '<svg xmlns="http://www.w3.org/2000/svg" width="' + width + '" height="' + height + '">' +
                    foreignObject + '</svg>';
            })
            .then(function (svg) {
                return 'data:image/svg+xml;charset=utf-8,' + svg;
            });
    }

    function newUtil() {
        return {
            escape: escape,
            parseExtension: parseExtension,
            mimeType: mimeType,
            dataAsUrl: dataAsUrl,
            isDataUrl: isDataUrl,
            canvasToBlob: canvasToBlob,
            resolveUrl: resolveUrl,
            getAndEncode: getAndEncode,
            uid: uid(),
            delay: delay,
            asArray: asArray,
            escapeXhtml: escapeXhtml,
            makeImage: makeImage,
            width: width,
            height: height
        };

        function mimes() {
            /*
             * Only WOFF and EOT mime types for fonts are 'real'
             * see http://www.iana.org/assignments/media-types/media-types.xhtml
             */
            var WOFF = 'application/font-woff';
            var JPEG = 'image/jpeg';

            return {
                'woff': WOFF,
                'woff2': WOFF,
                'ttf': 'application/font-truetype',
                'eot': 'application/vnd.ms-fontobject',
                'png': 'image/png',
                'jpg': JPEG,
                'jpeg': JPEG,
                'gif': 'image/gif',
                'tiff': 'image/tiff',
                'svg': 'image/svg+xml'
            };
        }

        function parseExtension(url) {
            var match = /\.([^\.\/]*?)$/g.exec(url);
            if (match) return match[1];
            else return '';
        }

        function mimeType(url) {
            var extension = parseExtension(url).toLowerCase();
            return mimes()[extension] || '';
        }

        function isDataUrl(url) {
            return url.search(/^(data:)/) !== -1;
        }

        function toBlob(canvas) {
            return new Promise(function (resolve) {
                var binaryString = window.atob(canvas.toDataURL().split(',')[1]);
                var length = binaryString.length;
                var binaryArray = new Uint8Array(length);

                for (var i = 0; i < length; i++)
                    binaryArray[i] = binaryString.charCodeAt(i);

                resolve(new Blob([binaryArray], {
                    type: 'image/png'
                }));
            });
        }

        function canvasToBlob(canvas) {
            if (canvas.toBlob)
                return new Promise(function (resolve) {
                    canvas.toBlob(resolve);
                });

            return toBlob(canvas);
        }

        function resolveUrl(url, baseUrl) {
            var doc = document.implementation.createHTMLDocument();
            var base = doc.createElement('base');
            doc.head.appendChild(base);
            var a = doc.createElement('a');
            doc.body.appendChild(a);
            base.href = baseUrl;
            a.href = url;
            return a.href;
        }

        function uid() {
            var index = 0;

            return function () {
                return 'u' + fourRandomChars() + index++;

                function fourRandomChars() {
                    /* see http://stackoverflow.com/a/6248722/2519373 */
                    return ('0000' + (Math.random() * Math.pow(36, 4) << 0).toString(36)).slice(-4);
                }
            };
        }

        function makeImage(uri) {
            return new Promise(function (resolve, reject) {
                var image = new Image();
                image.onload = function () {
                    resolve(image);
                };
                image.onerror = reject;
                image.src = uri;
            });
        }

        function getAndEncode(url) {
            var TIMEOUT = 30000;

            return new Promise(function (resolve) {
                var request = new XMLHttpRequest();

                request.onreadystatechange = done;
                request.ontimeout = timeout;
                request.responseType = 'blob';
                request.timeout = TIMEOUT;
                request.open('GET', url, true);
                request.send();

                function done() {
                    if (request.readyState !== 4) return;

                    if (request.status !== 200) {
                        fail('cannot fetch resource: ' + url + ', status: ' + request.status);
                        return;
                    }

                    var encoder = new FileReader();
                    encoder.onloadend = function () {
                        var content = encoder.result.split(/,/)[1];
                        resolve(content);
                    };
                    encoder.readAsDataURL(request.response);
                }

                function timeout() {
                    fail('timeout of ' + TIMEOUT + 'ms occured while fetching resource: ' + url);
                }

                function fail(message) {
                    console.error(message);
                    resolve('');
                }
            });
        }

        function dataAsUrl(content, type) {
            return 'data:' + type + ';base64,' + content;
        }

        function escape(string) {
            return string.replace(/([.*+?^${}()|\[\]\/\\])/g, '\\$1');
        }

        function delay(ms) {
            return function (arg) {
                return new Promise(function (resolve) {
                    setTimeout(function () {
                        resolve(arg);
                    }, ms);
                });
            };
        }

        function asArray(arrayLike) {
            var array = [];
            var length = arrayLike.length;
            for (var i = 0; i < length; i++) array.push(arrayLike[i]);
            return array;
        }

        function escapeXhtml(string) {
            return string.replace(/#/g, '%23').replace(/\n/g, '%0A');
        }

        function width(node) {
            var leftBorder = px(node, 'border-left-width');
            var rightBorder = px(node, 'border-right-width');
            return node.scrollWidth + leftBorder + rightBorder;
        }

        function height(node) {
            var topBorder = px(node, 'border-top-width');
            var bottomBorder = px(node, 'border-bottom-width');
            return node.scrollHeight + topBorder + bottomBorder;
        }

        function px(node, styleProperty) {
            var value = window.getComputedStyle(node).getPropertyValue(styleProperty);
            return parseFloat(value.replace('px', ''));
        }
    }

    function newInliner() {
        var URL_REGEX = /url\(['"]?([^'"]+?)['"]?\)/g;

        return {
            inlineAll: inlineAll,
            shouldProcess: shouldProcess,
            impl: {
                readUrls: readUrls,
                inline: inline
            }
        };

        function shouldProcess(string) {
            return string.search(URL_REGEX) !== -1;
        }

        function readUrls(string) {
            var result = [];
            var match;
            while ((match = URL_REGEX.exec(string)) !== null) {
                result.push(match[1]);
            }
            return result.filter(function (url) {
                return !util.isDataUrl(url);
            });
        }

        function inline(string, url, baseUrl, get) {
            return Promise.resolve(url)
                .then(function (url) {
                    return baseUrl ? util.resolveUrl(url, baseUrl) : url;
                })
                .then(get || util.getAndEncode)
                .then(function (data) {
                    return util.dataAsUrl(data, util.mimeType(url));
                })
                .then(function (dataUrl) {
                    return string.replace(urlAsRegex(url), '$1' + dataUrl + '$3');
                });

            function urlAsRegex(url) {
                return new RegExp('(url\\([\'"]?)(' + util.escape(url) + ')([\'"]?\\))', 'g');
            }
        }

        function inlineAll(string, baseUrl, get) {
            if (nothingToInline()) return Promise.resolve(string);

            return Promise.resolve(string)
                .then(readUrls)
                .then(function (urls) {
                    var done = Promise.resolve(string);
                    urls.forEach(function (url) {
                        done = done.then(function (string) {
                            return inline(string, url, baseUrl, get);
                        });
                    });
                    return done;
                });

            function nothingToInline() {
                return !shouldProcess(string);
            }
        }
    }

    function newFontFaces() {
        return {
            resolveAll: resolveAll,
            impl: {
                readAll: readAll
            }
        };

        function resolveAll() {
            return readAll(document)
                .then(function (webFonts) {
                    return Promise.all(
                        webFonts.map(function (webFont) {
                            return webFont.resolve();
                        })
                    );
                })
                .then(function (cssStrings) {
                    return cssStrings.join('\n');
                });
        }

        function readAll() {
            return Promise.resolve(util.asArray(document.styleSheets))
                .then(getCssRules)
                .then(selectWebFontRules)
                .then(function (rules) {
                    return rules.map(newWebFont);
                });

            function selectWebFontRules(cssRules) {
                return cssRules
                    .filter(function (rule) {
                        return rule.type === CSSRule.FONT_FACE_RULE;
                    })
                    .filter(function (rule) {
                        return inliner.shouldProcess(rule.style.getPropertyValue('src'));
                    });
            }

            function getCssRules(styleSheets) {
                var cssRules = [];
                styleSheets.forEach(function (sheet) {
                    try {
                        util.asArray(sheet.cssRules || []).forEach(cssRules.push.bind(cssRules));
                    } catch (e) {
                        console.log('Error while reading CSS rules from ' + sheet.href, e.toString());
                    }
                });
                return cssRules;
            }

            function newWebFont(webFontRule) {
                return {
                    resolve: function resolve() {
                        var baseUrl = (webFontRule.parentStyleSheet || {}).href;
                        return inliner.inlineAll(webFontRule.cssText, baseUrl);
                    },
                    src: function () {
                        return webFontRule.style.getPropertyValue('src');
                    }
                };
            }
        }
    }

    function newImages() {
        return {
            inlineAll: inlineAll,
            impl: {
                newImage: newImage
            }
        };

        function newImage(element) {
            return {
                inline: inline
            };

            function inline(get) {
                if (util.isDataUrl(element.src)) return Promise.resolve();

                return Promise.resolve(element.src)
                    .then(get || util.getAndEncode)
                    .then(function (data) {
                        return util.dataAsUrl(data, util.mimeType(element.src));
                    })
                    .then(function (dataUrl) {
                        return new Promise(function (resolve, reject) {
                            element.onload = resolve;
                            element.onerror = reject;
                            element.src = dataUrl;
                        });
                    });
            }
        }

        function inlineAll(node) {
            if (!(node instanceof Element)) return Promise.resolve(node);

            return inlineBackground(node)
                .then(function () {
                    if (node instanceof HTMLImageElement)
                        return newImage(node).inline();
                    else
                        return Promise.all(
                            util.asArray(node.childNodes).map(function (child) {
                                return inlineAll(child);
                            })
                        );
                });

            function inlineBackground(node) {
                var background = node.style.getPropertyValue('background');

                if (!background) return Promise.resolve(node);

                return inliner.inlineAll(background)
                    .then(function (inlined) {
                        node.style.setProperty(
                            'background',
                            inlined,
                            node.style.getPropertyPriority('background')
                        );
                    })
                    .then(function () {
                        return node;
                    });
            }
        }
    }
})(this);


/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = angular;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(0);
module.exports = __webpack_require__(1);


/***/ })
/******/ ]);