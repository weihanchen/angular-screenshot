'use strict';
import domprocess from '../src/utils/dom-process';

const getCanvas = (width, height) => {
   const canvas = document.createElement('canvas');
   canvas.width = width;
   canvas.height = height;
   return canvas;
};

describe('utils', () => {
   const width = 500,
      height = 500;
   let canvas;

   describe('dom process', () => {
      beforeEach(() => {
         canvas = getCanvas(width, height);
         document.body.appendChild(canvas);
      });
      afterEach(() => {
         document.body.removeChild(canvas);
      });
      it('should clip image with rect section', (done) => {
         //Arrange
         const startX = 0,
            startY = 0,
            rectWidth = width / 2,
            rectHeight = height / 2;
         //Act/Assert
         domprocess.canvasToImage(canvas)
            .then(image => domprocess.clipImageToCanvas(image, startX, startY, rectWidth, rectHeight))
            .then(clipedCanvas => {
               expect(clipedCanvas.width).toEqual(rectWidth);
               expect(clipedCanvas.height).toEqual(rectHeight);
               done();
            });
      });
   });
});