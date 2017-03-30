'use strict';
import '../src/angular-screenshot';

describe('screenshot directive', function () {
   let $compile, $rootScope;
   beforeEach(() => {
      window.module('angular-screenshot');
      inject(function (_$compile_, _$rootScope_) {
         $compile = _$compile_;
         $rootScope = _$rootScope_;
      });
   });

   const dragSection = (canvas, startX, startY, endX, endY) => {
      const mousedown = document.createEvent("MouseEvents");
      mousedown.initMouseEvent("mousedown", true, true, window, 0, 0, 0, startX, startY, false, false, false, false, 0, null);
      canvas.dispatchEvent(mousedown);
      const mousemove = document.createEvent('MouseEvents');
      mousemove.initMouseEvent("mousemove", true, true, window, 0, 0, 0, endX, endY, false, false, false, false, 0, null);
      canvas.dispatchEvent(mousemove);
      const mouseup = document.createEvent("MouseEvents");
      mouseup.initMouseEvent("mouseup", true, true, window, 0, 0, 0, endX, endY, false, false, false, false, 0, null);
      canvas.dispatchEvent(mouseup);
      return Promise.resolve({
         canvas,
         startX,
         startY,
         endX,
         endY
      });
   };

   const getChildSelector = (element, childName) => element.find(childName);

   const waitFor = (timespan) => new Promise((resolve) => setTimeout(() => resolve(), timespan));

   describe('basic features', () => {
      let scope,
         element,
         body,
         screenshotCtrl;
      beforeEach(() => {
         scope = $rootScope.$new();
         element = angular.element('<screenshot is-open="isOpen"><div>Hello World</div></screenshot>');
         $compile(element)(scope);
         scope.$digest();
         screenshotCtrl = element.isolateScope().screenshotCtrl;
         body = angular.element(document.body);
         body.append(element);
      });
      afterEach(() => {
         scope.isOpen = false;
         scope.$digest();
         body.find(element).remove();
      });
      it('does not rendered the canvas when isOpen = false', (done) => {
         //Arrange
         scope.isOpen = false;
         //Act
         scope.$digest();
         //Act/Assert
         waitFor().then(() => {
            const canvas = getChildSelector(body, 'canvas')[0];
            expect(canvas).toBeUndefined();
            expect(screenshotCtrl.isOpen).toEqual(scope.isOpen);
            done();
         });
      });

      it('should rendered the canvas when isOpen = true', (done) => {
         //Arrange
         scope.isOpen = true;
         //Act
         scope.$digest();
         //Act/Assert
         waitFor().then(() => {
            const canvas = getChildSelector(body, 'canvas')[0];
            expect(canvas).not.toBeUndefined();
            expect(screenshotCtrl.isOpen).toEqual(scope.isOpen);
            done();
         });
      });

      it('does not rendered the canvas when open then send right click on canvas', (done) => {
         //Arrange
         scope.isOpen = true;
         //Act/Assert
         scope.$digest();
         waitFor()
            .then(() => {
               let canvas = getChildSelector(body, 'canvas')[0];
               const events = document.createEvent('HTMLEvents');
               events.initEvent('contextmenu', true, false);
               canvas.dispatchEvent(events);
               canvas = getChildSelector(body, 'canvas')[0];
               expect(canvas).toBeUndefined();
               done();
            });
      });

      it('should rendered the toolbox when drag with section', (done) => {
         //Arrange
         scope.isOpen = true;
         //Act/Assert
         scope.$digest();
         waitFor(100)
            .then(() => {
               const canvasSelector = getChildSelector(body, 'canvas');
               const offset = canvasSelector.offset();
               const startX = offset.left;
               const startY = offset.top;
               const endX = startX + (canvasSelector.width() / 2);
               const endY = startY + (canvasSelector.height() / 2);
               return dragSection(canvasSelector[0], startX, startY, endX, endY);
            })
            .then(() => {
               const toolboxSelector = getChildSelector(body, '.screenshot-toolbox');
               expect(toolboxSelector.length).toBeGreaterThan(0);
               done();
            });
      });
   });
});
