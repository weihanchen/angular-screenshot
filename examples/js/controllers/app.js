'use strict';
(function() {
   angular.module('app', ['angular-screenshot'])
      .controller('AppController', [appController]);

   function appController() {
      var self = this;
      self.isOpenScreenshot = false;
      self.openScreenshot = openScreenshot;
      function openScreenshot() {
         self.isOpenScreenshot = !self.isOpenScreenshot;
      }
      
   }
})();
