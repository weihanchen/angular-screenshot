'use strict';
(function () {
   angular.module('app', ['angular-screenshot'])
      .controller('AppController', ['$scope', appController]);

   function appController() {
      var self = this;
      self.advanceApi;
      self.cancel = cancel;
      self.download = download;
      self.isOpenScreenshot = false;
      self.openScreenshot = openScreenshot;
      self.target1Options = {
         filename: 'target1.png',
         downloadText: 'Download me',
         cancelText: 'Close it!'
      };

      function cancel() {
         if (self.advanceApi) self.advanceApi.cancel();
      }


      function download() {
         if (self.advanceApi) self.advanceApi.download();
      }

      function openScreenshot() {
         self.isOpenScreenshot = !self.isOpenScreenshot;
      }
   }
})();
