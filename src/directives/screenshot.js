import {
   // domcapture,
   domprocess
} from '../utils';
import domtoimage from 'dom-to-image';
const screenshot = () => {
   const screenshotController = function ($scope, $element, $compile, $timeout, $window) {
      const colors = {gray: '#898b89', lightGray: '#e6e3e3'},
         hightLevelZindex = {
            top: 1,
            second: 0
         },
         toolboxMargin = 5,
         self = this;
      const calculateToolboxPosition = (offsetLeft, offsetTop, rect, toolboxWidth, toolboxHeight) => {
         let left = offsetLeft + rect.startX + rect.w;
         let top = offsetTop + rect.startY + rect.h;
         if (rect.w >= 0) left -= toolboxWidth;
         if (rect.h >= 0) top += toolboxMargin;
         else top = top - toolboxHeight - toolboxMargin;
         return {
            left,
            top
         };
      };

      const cancel = () => {
         domprocess.remove(self.toolboxElement);
         domprocess.clearCanvasRect(self.interactiveCanvas);
      };

      const download = () => {
         // closeScreenshot();
         self.isOpen = false;
         $timeout(() => {
            const elementSelector = getElementSelector();
            const element = elementSelector[0];
            const options = getOptions(element);

            domtoimage.toPng(element, options)
               .then(domprocess.dataUrlToImage)
               .then(image => {
                  domprocess.remove(image);
                  return domprocess.clipImageToCanvas(image, self.rect.startX, self.rect.startY, self.rect.w, self.rect.h);
               })
               .then(canvas => domprocess.downloadCanvas(canvas, self.filename))
               .then(domprocess.remove)
               .catch(error => console.error(error));
         });

         //  domcapture.getCanvas(element)
         //     .then(canvas => domprocess.downloadCanvas(canvas, self.filename));
         //
         //  domcapture.getCanvas(element)
         //     .then(domprocess.canvasToImage)
         //     .then(image => domprocess.clipImageToCanvas(image, self.rect.startX, self.rect.startY, self.rect.w, self.rect.h))
         //     .then(canvas => domprocess.downloadCanvas(canvas, self.filename));
      };

      const findMaxZindex = () => {
         let zMax = 0;
         angular.element('body *').each(function () {
            let zIndex = angular.element(this).css('zIndex');
            zIndex = parseInt(zIndex, 10);
            if (zIndex && zIndex > zMax) {
               zMax = zIndex;
            }
         });
         return zMax;
      };

      const getElementSelector = () => self.target ? angular.element(self.target) : $element.filter((index, element) => {
         const elementName = element.tagName.toLowerCase();
         return elementName !== 'screenshot-toolbox';
      });

      const getOptions = (element) => {
         const boudingClientRect = element.getBoundingClientRect();
         let options = {
            width: boudingClientRect.width,
            height: boudingClientRect.height
         };
         if (domprocess.isTransparent(element)) {
            const parentBackgroundColor = domprocess.getStyle(element, 'backgroundColor');
            options = Object.assign({}, options, { 'bgcolor': parentBackgroundColor });
         }
         return options;
      };

      const setHightLevelZindex = () => {
         const maxZindex = findMaxZindex();
         hightLevelZindex.second = maxZindex + 1;
         hightLevelZindex.top = hightLevelZindex.second + 1;
      };
      const canvasMousedownListener = () => {
         domprocess.remove(self.toolboxElement);
      };

      const canvasMouseupListener = (canvas, rect) => {
         if (rect.w != 0 && rect.h != 0) {
            domprocess.remove(self.toolboxElement);
            self.rect = rect;
            const toolbox = $compile(self.template)(self.templateScope);
            $scope.$apply();
            const toolboxElement = toolbox[0];
            /**
             * toolbox position setting
             * because read elememt's width sould indicated postion method, so we set position method first then move location with dom.
             */
            domprocess.setToolboxStackStyle(toolboxElement, hightLevelZindex.top)
               .then(domprocess.appendToBody)
               .then(element => {
                  const position = calculateToolboxPosition(canvas.offsetLeft, canvas.offsetTop, rect, element.offsetWidth, element.offsetHeight);
                  return domprocess.setToolboxPositionStyle(element, position.left, position.top);
               })
               .then(element => {
                  self.toolboxElement = element;
               });
         }
      };

      const canvasContextmenuListener = () => {
         self.isOpen = false;
         $scope.$apply();
      };

      const closeScreenshot = () => {
         domprocess.remove(self.interactiveCanvas);
         domprocess.remove(self.toolboxElement);
      };

      const openScreenshot = () => {
         const elementSelector = getElementSelector();
         const boudingClientRect = elementSelector[0].getBoundingClientRect();
         const width = boudingClientRect.width;
         const height = boudingClientRect.height;
         const offset = elementSelector.offset();
         const left = offset.left;
         const top = offset.top;
         setHightLevelZindex();

         domprocess.createCanvas(width, height)
            .then(canvas => domprocess.setCanvasStyle(canvas, left, top, colors.gray, hightLevelZindex.second))
            .then(domprocess.appendToBody)
            .then(canvas => domprocess.listenInteractiveCanvas(canvas, colors.lightGray, canvasMouseupListener, canvasMousedownListener, canvasContextmenuListener))
            .then(canvas => self.interactiveCanvas = canvas);
      };

      const resizeCanvas = () => {
         if (!self.interactiveCanvas) return;
         const elementSelector = getElementSelector();
         const boudingClientRect = elementSelector[0].getBoundingClientRect();
         const width = boudingClientRect.width;
         const height = boudingClientRect.height;
         const offset = elementSelector.offset();
         const left = offset.left;
         const top = offset.top;
         self.interactiveCanvas.width = width;
         self.interactiveCanvas.height = height;
         domprocess.setCanvasStyle(self.interactiveCanvas, left, top, colors.gray, hightLevelZindex.second)
            .then(() => domprocess.remove(self.toolboxElement));
      };

      /**
       *
       * @param {string} template - allow screenshot-toolbox directive setting with
       * @param {string} templateScope - scope of $compile toolbox content
       */
      const setTemplate = (template, templateScope) => {
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
      self.template = '<div class="screenshot-toolbox">' +
         '<button class="btn" type="button" ng-click="screenshotCtrl.cancel()">{{screenshotCtrl.cancelText}}</button>' +
         '<button class="btn" type="button" ng-click="screenshotCtrl.download()">{{screenshotCtrl.downloadText}}</button>' +
         '</div>';
      self.templateScope = $scope;
      $timeout(() => self.api = {
         download: download,
         cancel: cancel
      });

      $scope.$watch(() => self.isOpen, (newVal) => {
         if (newVal === true) {
            openScreenshot();
         } else if (newVal === false) {
            closeScreenshot();
         }
      });

      $scope.$watch(() => self.toolboxOptions, (newVal) => {
         if (!angular.isObject(newVal)) return;
         self.cancelText = newVal.cancelText ? newVal.cancelText : self.cancelText;
         self.downloadText = newVal.downloadText ? newVal.downloadText : self.downloadText;
         self.filename = newVal.filename ? newVal.filename : self.filename;
      });
      angular.element($window).bind('resize', resizeCanvas);
   };
   return {
      restrict: 'AE',
      scope: {
         target: '@',
         isOpen: '=',
         toolboxOptions: '=?',
         api: '=?'
      },
      controller: ['$scope', '$element', '$compile', '$timeout', '$window', screenshotController],
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
export default screenshot;
