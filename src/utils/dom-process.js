'use strict';
const appendToBody = (element) => {
   document.body.appendChild(element);
   return Promise.resolve(element);
};

const canvasToImage = (canvas) => new Promise((resolve, reject) => {
   const url = canvas.toDataURL('image/png');
   const image = new Image();
   image.onload = () => {
      resolve(image);
   };
   image.onerror = reject;
   image.src = url;
});

const clearCanvasRect = (canvas) => {
   const context = canvas.getContext('2d');
   context.clearRect(0, 0, canvas.width, canvas.height);
};

const clipImageToCanvas = (image, canvasWidth, canvasHeight, clipStartX, clipStartY, clipWidth, clipHeight) => createCanvas(clipWidth, clipHeight)
   .then(canvas => {
      const context = canvas.getContext('2d');
      context.drawImage(image, clipStartX, clipStartY, clipWidth, clipHeight, 0, 0, clipWidth, clipHeight);
      return canvas;
   });


const downloadCanvas = (canvas) => {
   const downloadUrl = canvas.toDataURL('image/png');
   const downloadLink = document.createElement('a');
   downloadLink.href = downloadUrl;
   downloadLink.download = 'screenshot.png';
   downloadLink.target = '_blank';
   downloadLink.click();
   downloadLink.remove();
   return Promise.resolve(canvas);
};


const createCanvas = (width, height) => {
   const canvas = document.createElement('canvas');
   canvas.width = width;
   canvas.height = height;
   return Promise.resolve(canvas);
};

const listenInteractiveCanvas = (canvas, rectBackground, mouseupListener, mousedownListener) => {
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
   };

   const mousedown = (e) => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      rect.startX = e.pageX - canvas.offsetLeft;
      rect.startY = e.pageY - canvas.offsetTop;
      mousedownListener(rect);
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
      mouseupListener(canvas, rect);
   };
   canvas.addEventListener('mousedown', mousedown, false);
   canvas.addEventListener('mouseup', mouseup, false);
   canvas.addEventListener('mousemove', mousemove, false);
   return Promise.resolve(canvas);
};

const remove = (element) => {
   if (element) element.remove();
};

const setCanvasStyle = (canvas, left, top, background, zIndex) => {
   canvas.style.cursor = 'crosshair';
   canvas.style.position = 'absolute';
   canvas.style.left = left + 'px';
   canvas.style.top = top + 'px';
   canvas.style.background = background;
   canvas.style.zIndex = zIndex;
   canvas.style.opacity = 0.5;
   return Promise.resolve(canvas);
};

const setToolboxStyle = (toolboxElement, left, top, zIndex) => {
   toolboxElement.style.position = 'absolute';
   toolboxElement.style.left = left + 'px';
   toolboxElement.style.top = top + 'px';
   toolboxElement.style.zIndex = zIndex;
   return Promise.resolve(toolboxElement);
};

const domprocess = {
   appendToBody,
   canvasToImage,
   clearCanvasRect,
   clipImageToCanvas,
   createCanvas,
   downloadCanvas,
   listenInteractiveCanvas,
   remove,
   setCanvasStyle,
   setToolboxStyle
};

export default domprocess;
