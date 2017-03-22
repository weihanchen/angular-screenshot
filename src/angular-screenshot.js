import * as angular from 'angular';

const screenshot = () => {
   const screenshotController = function($scope, $element) {
      const self = this;
      const watchParameter = () => self.parent;
      const watchListener = (newVal) => {
         if (newVal) {
             console.log($element.parent());
             console.log(angular.element(self.parent));
         }
      };
      $scope.$watch(watchParameter, watchListener);
   };
   return {
      restrict: 'AE',
      scope: {
         parent: '@'
      },
      controller: ['$scope', '$element', screenshotController],
      controllerAs: 'screenshotCtrl',
      bindToController: true
   };
};

angular.module('angular-screenshot', [])
   .directive('screenshot', screenshot);
