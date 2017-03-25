'use strict';
(function () {
   angular.module('app', ['angular-screenshot'])
      .controller('AppController', ['$scope', appController]);

   function appController($scope) {
      var self = this;
      self.$scope = $scope;
      self.screenshotApi = {};
      self.isOpenScreenshot = false;
      self.openScreenshot = openScreenshot;
      self.download = download;
      function openScreenshot() {
         self.isOpenScreenshot = !self.isOpenScreenshot;
      }

      function download() {
         self.screenshotApi.download();
      }
   }
})();
