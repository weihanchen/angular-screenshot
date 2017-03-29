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

   //    const compile = (template) => {
   //       const element = $compile(template)($scope);
   //       $scope.$digest();
   //       return element;
   //    };

   //  const getIsolateScope = (element) => element.isolateScope();

   const getCanvas = (element) => element.find('canvas');

   const waitFor = (timespan) => new Promise((resolve) => setTimeout(() => resolve(), timespan));

   describe('basic features', () => {
      let scope,
         element,
         body;
      beforeEach(() => {
         scope = $rootScope.$new();
         element = angular.element('<screenshot is-open="isOpen"><div>Hello World</div></screenshot>');
         $compile(element)(scope);
         scope.$digest();
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
         //Assert
         waitFor().then(() => {
            const canvas = getCanvas(body)[0];
            expect(canvas).toBeUndefined();
            done();
         });
      });

      it('should rendered the canvas when isOpen = true', (done) => {
         //Arrange
         scope.isOpen = true;
         //Act
         scope.$digest();
         //Assert
         waitFor().then(() => {
            const canvas = getCanvas(body)[0];
            expect(canvas).not.toBeUndefined();
            done();
         });
      });

      it('does not rendered the canvas when open then send right click on canvas', (done) => {
         //Arrange
         scope.isOpen = true;
         //Act
         scope.$digest();
         //Assert
         waitFor()
            .then(() => {
               let canvas = getCanvas(body)[0];
               const events = document.createEvent('HTMLEvents');
               events.initEvent('contextmenu', true, false);
               canvas.dispatchEvent(events);
               canvas = getCanvas(body)[0];
               expect(canvas).toBeUndefined();
               done();
            });
      });
   });
});
