'use strice';
const appendToBody = (canvas) => {
   document.body.appendChild(canvas);
   return canvas;
};

const createCanvas = (width, height) => {
   const canvas = document.createElement('canvas');
   canvas.width = width;
   canvas.height = height;
   return Promise.resolve(canvas);
};

const listenInteractiveCanvas = (canvas, rectBackground, listener) => {
   const context = canvas.getContext('2d'),
      rect = {
         startX: 0,
         startY: 0,
         w: 0,
         h: 0
      };
   let dragging = false;

   const draw = () => {
      context.fillStyle = rectBackground;
      context.fillRect(rect.startX, rect.startY, rect.w, rect.h);
      // context.stroke();
   };

   const mousedown = (e) => {
      rect.startX = e.pageX - canvas.offsetLeft;
      rect.startY = e.pageY - canvas.offsetTop;
      rect.w = 0;
      rect.h = 0;
      dragging = true;
   };

   const mousemove = (e) => {
      if (dragging) {
         rect.w = (e.pageX - canvas.offsetLeft) - rect.startX;
         rect.h = (e.pageY - canvas.offsetTop) - rect.startY;
         context.clearRect(0, 0, canvas.width, canvas.height);
         draw();
      }
   };

   const mouseup = () => {
      dragging = false;
      if (rect.w != 0 && rect.h != 0) {
         listener(canvas, rect);
      }
   };
   canvas.addEventListener('mousedown', mousedown, false);
   canvas.addEventListener('mouseup', mouseup, false);
   canvas.addEventListener('mousemove', mousemove, false);
   return Promise.resolve(canvas);
};

const setCanvasStyle = (canvas, left, top, background, zIndex) => {
   canvas.style.cursor = 'crosshair';
   canvas.style.position = 'absolute';
   canvas.style.left = left + 'px';
   canvas.style.top = top + 'px';
   canvas.style.background = background;
   canvas.style.zIndex = zIndex;
   canvas.style.opacity = 0.5;
   return canvas;
};

const canvasprocess = {
   appendToBody,
   createCanvas,
   listenInteractiveCanvas,
   setCanvasStyle
};

export default canvasprocess;
