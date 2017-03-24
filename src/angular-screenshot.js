import * as angular from 'angular';

import {
   domprocess
} from './utils';

const screenshot = () => {
   const screenshotController = function($scope, $element, $compile) {
      const colors = {
            gray: '#898b89',
            lightGray: '#e6e3e3',
         },
         hightLevelZindex = {
            top: 1,
            second: 0
         },
         toolboxTemplate = '<div><button ng-click="screenshotCtrl.download()">Download</button><button ng-click="screenshotCtrl.cancel()">Cancel</button></div>',
         self = this;
      const cancel = ($event) => {
         self.showToolbox = false;
         $event.stopPropagation();
      };
      const download = ($event) => {
         console.log('download');
         $event.stopPropagation();
      };

      const findMaxZindex = () => {
         let zMax = 0;
         angular.element('body *').each(function() {
            const zIndex = angular.element(this).css('zIndex');
            if (zIndex > zMax) {
               zMax = zIndex;
            }
         });
         return zMax;
      };

      const setHightLevelZindex = () => {
         const maxZindex = findMaxZindex();
         hightLevelZindex.second = maxZindex + 1;
         hightLevelZindex.top = hightLevelZindex.second + 1;
      };

      const interactiveCanvasListener = (canvas, rect) => {
         self.rect = rect;
         const template = '<div><button ng-click="screenshotCtrl.download()">Download</button></div>';
         const toolbox = $compile(template)($scope);
         document.body.appendChild(toolbox[0]);
         const top = canvas.offsetTop + rect.startY + rect.h + 5;
         const left = canvas.offsetLeft + rect.startX;
         toolbox.offset({
            top: `${top}px`,
            left: `${left}px`
         });
         toolbox.css('zIndex', hightLevelZindex.top);
         toolbox.css({
            'position': 'absolute'
         });
      };

      const closeScreenshot = () => {
           if (self.interactiveCanvas) self.interactiveCanvas.remove();
           if (self.toolboxElement) self.toolboxElement.remove();  
      };

      const openScreenshot = () => {
         const elements = self.parent ? angular.element(self.parent) : $element;
         const element = elements[0];
         const width = element.offsetWidth;
         const height = element.offsetHeight;
         const left = element.offsetLeft;
         const top = element.offsetTop;
         setHightLevelZindex();

         domprocess.createCanvas(width, height)
            .then(canvas => domprocess.setCanvasStyle(canvas, left, top, colors.gray, hightLevelZindex.second))
            .then(domprocess.appendToBody)
            .then(canvas => domprocess.listenInteractiveCanvas(canvas, colors.lightGray, interactiveCanvasListener))
            .then(canvas => self.interactiveCanvas = canvas);
         //  domcapture.getCanvas(element)
         //   .then(canvas => {
         //     angular.element('#render').append(canvas);
         //   });
      };
      self.cancel = cancel;
      self.download = download;
      self.interactiveCanvas;
      self.toolboxElement;
      $scope.$watch(() => self.isOpen, (newVal) => {
         if (newVal === true) {
            openScreenshot();
         } else if (newVal === false){
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
         isOpen: '='
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
 */

angular.module('angular-screenshot', [])
   .directive('screenshot', screenshot);
