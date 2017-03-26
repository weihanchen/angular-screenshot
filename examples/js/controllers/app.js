'use strict';
(function () {
   angular.module('app', ['angular-screenshot'])
      .controller('AppController', ['$scope', appController]);

   function appController($scope) {
      var self = this;
      self.download = download;
      self.isOpenScreenshot = false;
      self.screenshotApi = {};
      self.openScreenshot = openScreenshot;
      self.target1Options = {
         filename: 'target1.png',
         downloadText: '',
         cancelText: '&times;'
      };
      self.$scope = $scope;

      function openScreenshot() {
         self.isOpenScreenshot = !self.isOpenScreenshot;
      }

      function download() {
         self.screenshotApi.download();
      }
   }
})();
