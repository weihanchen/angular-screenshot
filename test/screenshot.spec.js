'use strict';
import '../src/angular-screenshot';

describe('screenshot directive', function () {
   const toolboxClass = '.screenshot-toolbox';
   let $compile, $rootScope, $timeout;
   beforeEach(() => {
      window.module('angular-screenshot');
      inject(function (_$compile_, _$rootScope_, _$timeout_) {
         $compile = _$compile_;
         $rootScope = _$rootScope_;
         $timeout = _$timeout_;
      });
   });

   const dragLeftTopToRightBottom = (canvasSelector) => {
      const offset = canvasSelector.offset();
      const startX = offset.left;
      const startY = offset.top;
      const endX = startX + (canvasSelector.width() / 2);
      const endY = startY + (canvasSelector.height() / 2);
      return dragSection(canvasSelector[0], startX, startY, endX, endY);
   };

   const dragRightBottomToLeftTop = (canvasSelector) => {
      const offset = canvasSelector.offset();
      const endX = offset.left;
      const endY = offset.top;
      const startX = endX + (canvasSelector.width() / 2);
      const startY = endY + (canvasSelector.height() / 2);
      return dragSection(canvasSelector[0], startX, startY, endX, endY);
   };

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

   const findMaxZindex = () => {
      let zMax = 0;
      angular.element('body *').each(function () {
         let zIndex = angular.element(this).css('zIndex');
         zIndex = parseInt(zIndex, 10);
         if (zIndex && zIndex > zMax) {
            zMax = zIndex;
         }
      });
      return zMax;
   };

   const getChildSelector = (element, childName) => element.find(childName);

   const waitFor = (timespan) => new Promise((resolve) => setTimeout(() => resolve(), timespan));

   describe('basic features', () => {
      let scope,
         absoluteElement,
         blockElement,
         element,
         body,
         screenshotCtrl;
      beforeEach(() => {
         scope = $rootScope.$new();
         element = angular.element('<screenshot is-open="isOpen"><div>Hello World</div></screenshot>');
         absoluteElement = angular.element('<div></div>');
         blockElement = angular.element('<div></div>');
         $compile(element)(scope);
         scope.$digest();
         screenshotCtrl = element.isolateScope().screenshotCtrl;
         body = angular.element(document.body);
         body.width(500);
         body.height(500);
         body.append(blockElement);
         body.append(element);
         body.append(absoluteElement);
         absoluteElement.css({ top: body.height() / 2, left: body.width() / 2, position: 'absolute', zIndex: 1 });
         blockElement.css({ width: 50, height: 50, marginBottom: 5 });

      });
      afterEach(() => {
         scope.isOpen = false;
         scope.$digest();
         body.find(element).remove();
         body.find(toolboxClass).remove();
         body.find(absoluteElement).remove();
         body.find(blockElement).remove();
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
         waitFor()
            .then(() => {
               const canvasSelector = getChildSelector(body, 'canvas');
               return dragLeftTopToRightBottom(canvasSelector);
            })
            .then(() => {
               const toolboxSelector = getChildSelector(body, toolboxClass);
               expect(toolboxSelector.length).toBeGreaterThan(0);
               done();
            });
      });

      it('should rendered the toolbox when drag with section from right bottom to left top', (done) => {
         //Arrange
         scope.isOpen = true;
         //Act/Assert
         scope.$digest();
         waitFor()
            .then(() => {
               const canvasSelector = getChildSelector(body, 'canvas');
               return dragRightBottomToLeftTop(canvasSelector);
            })
            .then(() => {
               const canvasSelector = getChildSelector(body, 'canvas');
               const toolboxSelector = getChildSelector(body, toolboxClass);
               const canvasOffset = canvasSelector.offset();
               const toolboxOffset = toolboxSelector.offset();
               expect(canvasOffset.left).toEqual(toolboxOffset.left);
               done();
            });
      });

      it('should not rendered the toolbox when trigger the cancel', (done) => {
         //Arrange
         scope.isOpen = true;
         //Act/Assert
         scope.$digest();
         waitFor()
            .then(() => {
               const canvasSelector = getChildSelector(body, 'canvas');
               return dragLeftTopToRightBottom(canvasSelector);
            })
            .then(() => waitFor())
            .then(() => {
               screenshotCtrl.cancel();
               const toolboxSelector = getChildSelector(body, toolboxClass);
               expect(toolboxSelector.length).toEqual(0);
               done();
            });
      });

      it('should not rendered the toolbox when trigger the download', (done) => {
         //Arrange
         scope.isOpen = true;
         //Act/Assert
         scope.$digest();
         waitFor()
            .then(() => {
               const canvasSelector = getChildSelector(body, 'canvas');
               return dragLeftTopToRightBottom(canvasSelector);
            })
            .then(() => waitFor())
            .then(() => screenshotCtrl.download())
            .then(() => $timeout.flush())
            .then(() => waitFor())
            .then(() => {
               const toolboxSelector = getChildSelector(body, toolboxClass);
               expect(toolboxSelector.length).toEqual(0);
               done();
            });
      });

      it('should toolbox\'s z-index greater than canvas and origin max z-index', (done) => {
         //Arrange
         scope.isOpen = true;
         const originMaxZindex = findMaxZindex();
         //Act/Assert
         scope.$digest();
         waitFor()
            .then(() => {
               const canvasSelector = getChildSelector(body, 'canvas');
               return dragLeftTopToRightBottom(canvasSelector);
            })
            .then(() => {
               const canvasSelector = getChildSelector(body, 'canvas');
               const toolboxSelector = getChildSelector(body, toolboxClass);
               const canvasZindex = canvasSelector.css('z-index');
               const toolboxZindex = toolboxSelector.css('z-index');
               expect(toolboxZindex).toBeGreaterThan(canvasZindex);
               expect(canvasZindex).toBeGreaterThan(originMaxZindex);
               done();
            });
      });
   });

   describe('advance features', () => {
      let scope,
         targetSelector,
         elementSelector,
         body,
         screenshotCtrl;

      beforeEach(() => {
         scope = $rootScope.$new();
         elementSelector = angular.element('<screenshot target="{{target}}" is-open="isOpen"></screenshot>');
         targetSelector = angular.element('<div id="target">Hello World, I am target</div>');
         $compile(elementSelector)(scope);
         scope.$digest();
         screenshotCtrl = elementSelector.isolateScope().screenshotCtrl;
         body = angular.element(document.body);
         body.width(500);
         body.height(500);
         body.append(elementSelector);
         body.append(targetSelector);
         targetSelector.css({ width: 100, height: 100 });
      });

      afterEach(() => {
         scope.isOpen = false;
         scope.$digest();
         body.find(elementSelector).remove();
         body.find(targetSelector).remove();
         body.find(toolboxClass).remove();
      });

      it('should rendered the canvas on target position', (done) => {
         //Arrange
         scope.target = '#target';
         scope.isOpen = true;
         //Act/Assert
         scope.$digest();
         
         waitFor()
            .then(() => {
               const canvasSelector = getChildSelector(body, 'canvas');
               const canvasOffset = canvasSelector.offset();
               const targetOffset = targetSelector.offset();
               expect(canvasOffset.top).toEqual(targetOffset.top);
               expect(canvasOffset.left).toEqual(targetOffset.left);
               expect(screenshotCtrl.target).toEqual(scope.target);
               done();
            });
      });
   });
});
