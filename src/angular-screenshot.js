import * as angular from 'angular';
import domcapture from './utils/dom-capture';

const screenshot = () => {
   const screenshotController = function($scope, $element) {
      const self = this;
      const doClick = () => {
         const element = self.parent ? angular.element(self.parent) : $element.parent();
         console.log(element);
         domcapture.getCanvas(element[0])
          .then(canvas => {
            console.log(canvas);
            angular.element('#render').append(canvas);
          });
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
