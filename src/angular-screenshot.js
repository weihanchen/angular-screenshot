'use strict';
import * as angular from 'angular';

import {
   domcapture,
   domprocess
} from './utils';

const screenshot = () => {
   const screenshotController = function ($scope, $element, $compile) {
      const colors = { gray: '#898b89', lightGray: '#e6e3e3' },
         hightLevelZindex = {
            top: 1,
            second: 0
         },
         toolboxTemplate = '<div><button ng-click="screenshotCtrl.download()">Download</button><button ng-click="screenshotCtrl.cancel()">Cancel</button></div>',
         toolboxMargin = 5,
         self = this;
      const calculateToolboxPosition = (offsetLeft, offsetTop, rect, toolboxWidth, toolboxHeight) => {
         let left = offsetLeft + rect.startX + rect.w;
         let top = offsetTop + rect.startY + rect.h;
         if (rect.w >= 0) left -= toolboxWidth;
         if (rect.h >= 0) top += toolboxMargin;
         else top = top -  toolboxHeight - toolboxMargin;
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
         const element = getElement();
         domcapture.getCanvas(element)
            .then(domprocess.canvasToImage)
            .then(image => domprocess.clipImageToCanvas(image, self.rect.startX, self.rect.startY, self.rect.w, self.rect.h))
            .then(domprocess.downloadCanvas);
      };

      const findMaxZindex = () => {
         let zMax = 0;
         angular.element('body *').each(function () {
            const zIndex = angular.element(this).css('zIndex');
            if (zIndex > zMax) {
               zMax = zIndex;
            }
         });
         return zMax;
      };

      const getElement = () => self.parent ? angular.element(self.parent)[0] : $element.children()[0];
      const getTemplate = () => self.templete ? self.template : toolboxTemplate;
      const getTemplateScope = () => self.templateScope ? self.templateScope : $scope;

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
            self.rect = rect;
            const toolbox = $compile(getTemplate())(getTemplateScope());
            const toolboxElement = toolbox[0];
            /**
             * toolbox position setting
             * because read elememt's width sould indicated postion method, so we set position method first then move location with dom.
             */
            domprocess.setToolboxStackStyle(toolboxElement, hightLevelZindex.top)
               .then(domprocess.appendToBody)
               .then(element => {
                  const position = calculateToolboxPosition(canvas.offsetLeft, canvas.offsetTop ,rect, element.offsetWidth, element.offsetHeight);
                  return domprocess.setToolboxPositionStyle(element, position.left, position.top);
               })
               .then(element => {
                  self.toolboxElement = element;
               });
         }
      };

      const closeScreenshot = () => {
         domprocess.remove(self.interactiveCanvas);
         domprocess.remove(self.toolboxElement);
      };

      const openScreenshot = () => {
         const element = getElement();
         const width = element.offsetWidth;
         const height = element.offsetHeight;
         const left = element.offsetLeft;
         const top = element.offsetTop;
         setHightLevelZindex();

         domprocess.createCanvas(width, height)
            .then(canvas => domprocess.setCanvasStyle(canvas, left, top, colors.gray, hightLevelZindex.second))
            .then(domprocess.appendToBody)
            .then(canvas => domprocess.listenInteractiveCanvas(canvas, colors.lightGray, canvasMouseupListener, canvasMousedownListener))
            .then(canvas => self.interactiveCanvas = canvas);
      };

      self.cancel = cancel;
      self.download = download;
      self.interactiveCanvas;
      self.rect = {};
      self.toolboxElement;
      self.api = {
         download,
         cancel
      };
      $scope.$watch(() => self.isOpen, (newVal) => {
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
         parent: '=',
         isOpen: '=',
         api: '=?'
      },
      controller: ['$scope', '$element', '$compile', screenshotController],
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
 * @param {string=} [parent=element.parent()] Use parent element with capture section.
 * @param {boolean=} [isOpen=false] Flag indicating that open the capture canvas.
 * @param {object=} [api={download, cancel}] Expose api to interactive custom template action.
 */

angular.module('angular-screenshot', [])
   .directive('screenshot', screenshot);
