'use strice';


const generateCanvas = (width, height) => {
   const canvas = document.createElement('canvas');
   canvas.width = width;
   canvas.height = height;
   return Promise.resolve(canvas);
};

const canvasprocess = {
   generateCanvas
};

export default canvasprocess;