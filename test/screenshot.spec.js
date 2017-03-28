'use strict';

describe('screenshot directive', () => {
   let $compile, $rootScope;
   beforeEach(() => {
      module('angular-screenshot');
      inject((_$compile_, _$rootScope_) => {
         $compile = _$compile_;
         $rootScope = _$rootScope_;
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
      it('does not rendered the canvas when isOpen = false', () => {
         //Arrange
         $rootScope.isOpen = false;
         //Act
         const element = compile('<screenshot is-open="isOpen"></screenshot>');
         const canvas = getCanvas(element)[0];
         //Assert
         expect(canvas).toBeUndefined();
      });
   });
});
