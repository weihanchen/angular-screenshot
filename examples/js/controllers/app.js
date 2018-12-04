'use strict';
(function () {
   angular.module('app', ['angular-screenshot'])
      .controller('AppController', ['$scope', appController])
      .directive('test', testDirecitve);

   function appController() {
      var self = this;
      self.advanceApi;
      self.cancel = cancel;
      self.download = download;
      self.downloadFull = downloadFull;
      self.imageApi;
      self.isOpenScreenshot = false;
      self.openScreenshot = openScreenshot;
      self.print = print;
      self.printApi;
      self.sendImage = sendImage;
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

      function downloadFull() {
         if (self.fullScreenApi) self.fullScreenApi.downloadFull();
      }

      function openScreenshot() {
         self.isOpenScreenshot = !self.isOpenScreenshot;
      }

      function sendImage() {
         if (self.imageApi) {
            self.imageApi.toPng(function (dataUrl) {
               console.log(dataUrl);
               alert('Please open console and print dataUrl then you can send dataUrl to your backend api do more feature like send mail.');
            });
         }
      }

      function print() {
         if (self.printApi) {
            self.printApi.toPng(function (dataUrl) {
               console.log(dataUrl)
               let windowContent = '<!DOCTYPE html>';
               windowContent += '<html>';
               windowContent += '<head><title>Print canvas</title></head>';
               windowContent += '<body>';
               windowContent += '<img src="' + dataUrl + '">';
               windowContent += '</body>';
               windowContent += '</html>';
     
               const printWin = window.open(
                 '',
                 '',
                 'width=' + 1000 + ',height=' + 1000
               );
               printWin.document.open();
               printWin.document.write(windowContent);
     
               printWin.document.addEventListener(
                 'load',
                 function() {
                   printWin.focus();
                   printWin.print();
                   printWin.document.close();
                   printWin.close();
                 },
                 true
               );
            });
         }
      }
   }

   function testDirecitve() {
      return {
         template: '<div><div class="well"></div></div>'
      };
   }
})();
