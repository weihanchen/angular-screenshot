'use strict';
const DOMURL = window.URL;
const appendToBody = (element) => {
   document.body.appendChild(element);
   return Promise.resolve(element);
};

const canvasToImage = (canvas) => {
   const url = canvas.toDataURL('image/png');
   return dataUrlToImage(url);
};

const clearCanvasRect = (canvas) => {
   const context = canvas.getContext('2d');
   context.clearRect(0, 0, canvas.width, canvas.height);
};

const clipImageToCanvas = (image, clipStartX, clipStartY, clipWidth, clipHeight) => createCanvas(Math.abs(clipWidth), Math.abs(clipHeight))
   .then(canvas => {
      const context = canvas.getContext('2d');
      context.drawImage(image, clipStartX, clipStartY, clipWidth, clipHeight, 0, 0, canvas.width, canvas.height);
      remove(image);
      return canvas;
   });

const createCanvas = (width, height) => {
   const canvas = document.createElement('canvas');
   canvas.width = width;
   canvas.height = height;
   return Promise.resolve(canvas);
};

const dataUrlToImage = (url) => new Promise((resolve, reject) => {
   const image = new Image();
   image.onload = () => {
      resolve(image);
   };
   image.onerror = reject;
   image.src = url;
});

const downloadByUrl = (url, filename) => {
   const downloadLink = document.createElement('a');
   downloadLink.href = url;
   downloadLink.download = filename;
   downloadLink.target = '_blank';
   downloadLink.click();
   downloadLink.remove();
   DOMURL.revokeObjectURL(url);
};

const downloadCanvas = (canvas, filename) => {
   const downloadUrl = canvas.toDataURL('image/png');
   downloadByUrl(downloadUrl, filename);
   return Promise.resolve(canvas);
};

const getStyle = (element, property) =>{
   const styles = window.getComputedStyle(element);
   return styles[property];
};

const isTransparent = (element) => {
   const backgroundColor = window.getComputedStyle(element).backgroundColor;
   return backgroundColor === 'transparent' || backgroundColor === '' || backgroundColor === 'rgba(0, 0, 0, 0)';
};

const listenInteractiveCanvas = (canvas, rectBackground, mouseupListener, mousedownListener, contextmenuListener) => {
   const context = canvas.getContext('2d'),
      rect = {
         startX: 0,
         startY: 0,
         w: 0,
         h: 0
      };
   let dragging = false;

   const draw = () => {
      context.beginPath();
      context.fillStyle = rectBackground;
      context.fillRect(rect.startX, rect.startY, rect.w, rect.h);
      context.closePath();
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

   const contextmenu = (e) => {
      contextmenuListener();
      e.preventDefault();
      return false;
   };

   const touchStart = (e) => {
      const touch = e.touches[0];
      const mouseEvent = new MouseEvent("mousedown", {
         pageX: touch.pageX,
         pageY: touch.pageY
      });
      canvas.dispatchEvent(mouseEvent);
   };

   const touched = () => {
      const mouseEvent = new MouseEvent("mouseup", {});
      canvas.dispatchEvent(mouseEvent);
   };

   const touchMove = (e) => {
      const touch = e.touches[0];
      const mouseEvent = new MouseEvent("mousemove", {
         pageX: touch.pageX,
         pageY: touch.pageY
      });
      canvas.dispatchEvent(mouseEvent);
   };

   canvas.addEventListener('mousedown', mousedown, false);
   canvas.addEventListener('mouseup', mouseup, false);
   canvas.addEventListener('mousemove', mousemove, false);
   canvas.addEventListener('touchstart', touchStart, false);
   canvas.addEventListener('touchend', touched, false);
   canvas.addEventListener('touchmove', touchMove, false);
   canvas.addEventListener('contextmenu', contextmenu, false);
   document.body.addEventListener('touchmove', (event) => event.preventDefault(), false);
   return Promise.resolve(canvas);
};

const remove = (element) => {
   if (element) element.remove();
   element = null;
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

const setToolboxPositionStyle = (toolboxElement, left, top) => {
   toolboxElement.style.left = left + 'px';
   toolboxElement.style.top = top + 'px';
   return Promise.resolve(toolboxElement);
};

const setToolboxStackStyle = (toolboxElement, zIndex) => {
   toolboxElement.style.position = 'absolute';
   toolboxElement.style.zIndex = zIndex;
   return Promise.resolve(toolboxElement);
};

const domprocess = {
   appendToBody,
   canvasToImage,
   clearCanvasRect,
   clipImageToCanvas,
   createCanvas,
   dataUrlToImage,
   downloadByUrl,
   downloadCanvas,
   getStyle,
   isTransparent,
   listenInteractiveCanvas,
   remove,
   setCanvasStyle,
   setToolboxPositionStyle,
   setToolboxStackStyle
};

export default domprocess;
