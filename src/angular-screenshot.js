import * as angular from 'angular';
import { canvasprocess } from './utils';

const screenshot = () => {
  const screenshotController = function ($scope, $element) {
    const self = this;
    const doClick = () => {
      const elements = self.parent ? angular.element(self.parent) : $element.parent();
      const element = elements[0];
      const width = element.offsetWidth;
      const height = element.offsetHeight;
      canvasprocess.generateCanvas(width, height)
        .then(canvas => {
          document.body.appendChild(canvas);
          canvas.style.cursor = 'crosshair';
          canvas.style.position = 'absolute';
          canvas.style.left = 0;
          canvas.style.top = 0;
          canvas.style.background = '#898b89';
          canvas.style.opacity = 0.5;
         
          
        });
      //  domcapture.getCanvas(element)
      //   .then(canvas => {
      //     angular.element('#render').append(canvas);
      //   });
    };
    $element.bind('click', doClick);
  };
  return {
    restrict: 'AE',
    scope: {
      parent: '=screenshot'
    },
    controller: ['$scope', '$element', screenshotController],
    controllerAs: 'screenshotCtrl',
    bindToController: true
  };
};

angular.module('angular-screenshot', [])
  .directive('screenshot', screenshot);
