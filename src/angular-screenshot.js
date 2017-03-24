import * as angular from 'angular';

import {
   canvasprocess
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
         const template = '<button ng-click="screenshotCtrl.download()">Download</button>';
         const toolbox = $compile(template)($scope);
         document.body.appendChild(toolbox[0]);
         console.log(canvas.offsetTop + rect.startY + rect.h + 5)
         toolbox.offset({
            top: canvas.offsetTop + rect.startY + rect.h + 5,
            left: canvas.offsetLeft + rect.startX
         });
         toolbox.css('zIndex', hightLevelZindex.top);
         toolbox.css({
            'position': 'absolute'
         });
      };

      const start = () => {
         const elements = self.parent ? angular.element(self.parent) : $element;
         const element = elements[0];
         const width = element.offsetWidth;
         const height = element.offsetHeight;
         const left = element.offsetLeft;
         const top = element.offsetTop;
         setHightLevelZindex();

         canvasprocess.createCanvas(width, height)
            .then(canvas => canvasprocess.setCanvasStyle(canvas, left, top, colors.gray, hightLevelZindex.second))
            .then(canvasprocess.appendToBody)
            .then(canvas => canvasprocess.listenInteractiveCanvas(canvas, colors.lightGray, interactiveCanvasListener))
            .then(canvas => self.interactiveCanvas = canvas);
         //  domcapture.getCanvas(element)
         //   .then(canvas => {
         //     angular.element('#render').append(canvas);
         //   });
      };
      self.cancel = cancel;
      self.download = download;
      self.interactiveCanvas;
      self.showToolbox = false;
      $scope.$watch(() => self.isOpen, (newVal) => {
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

angular.module('angular-screenshot', [])
   .directive('screenshot', screenshot);
