'use strict';
import angularScreenshot from '../src/angular-screenshot';

describe('screenshot directive', () => {
   let $compile, $rootScope, $document;
   beforeEach(() => {
      window.module(angularScreenshot);
      inject((_$compile_, _$rootScope_, _$document_) => {
         $compile = _$compile_;
         $rootScope = _$rootScope_;
         $document = _$document_;
      });
   });

   const compile = (template) => {
      const element = $compile(template)($rootScope);
      $rootScope.$digest();
      return element;
   };

   //  const getIsolateScope = (element) => element.isolateScope();

   const getCanvas = (element) => element.find('canvas');

   describe('basic features', () => {
      let basicElement,
          body;
      beforeEach(() => {
         basicElement = compile('<screenshot is-open="isOpen"><div>Hello World</div></screenshot>');
         body = angular.element('body');
         body.append(basicElement);
      });
      it('does not rendered the canvas when isOpen = false', () => {
         //Arrange
         $rootScope.isOpen = false;
         //Act
         $rootScope.$digest();
         const canvas = getCanvas(body)[0];
        
         //Assert
         expect(canvas).toBeUndefined();
      });

      it('should rendered the canvas when isOpen = true', () => {
         //Arrange
         $rootScope.isOpen = true;
         //Act
         $rootScope.$digest();
         const canvas = getCanvas(body)[0];
         console.log(body.find('screenshot')[0].offsetHeight)

         //Assert
         expect(canvas).not.toBeUndefined();
      });
   });
});
