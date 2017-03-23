'use strict';
const DOMURL = window.URL || window.webkitURL || window;


//  const addBackground = (node) => {
//     const background = node.style.getPropertyValue('background');
//     if (!background) return Promise.resolve(node);
//
//     return inliner.inlineAll(background)
//        .then(function(inlined) {
//           node.style.setProperty(
//              'background',
//              inlined,
//              node.style.getPropertyPriority('background')
//           );
//        })
//        .then(function() {
//           return node;
//        });
//  }
//
//  const addImages = (node) => {
//
//  }

const addStylesheets = (node) => getMatchedStyleText(node)
   .then(styleText => {
      const styleNode = document.createElement('style');
      console.log(node);
      node.appendChild(styleNode);
      styleNode.appendChild(document.createTextNode(styleText));
      return node;
   });


const getImage = (url) => new Promise((resolve, reject) => {
   const image = new Image();
   image.onload = () => {
      resolve(image);
   };
   image.onerror = reject;
   image.src = url;
});

const getMatchedStyleText = (node) => {
   const sheetsObj = document.styleSheets;
   if (!sheetsObj) return Promise.resolve('');
   node.matches = node.matches || node.webkitMatchesSelector || node.mozMatchesSelector || node.msMatchesSelector || node.oMatchesSelector;
   const sheetsArr = objectToArray(sheetsObj);
   const result = sheetsArr.reduce((sum, sheet) => {
     const rules = objectToArray(sheet.rules || sheet.cssRules);
     sum.push(...rules.map(rule => rule.cssText));
     return sum;
   }, []).filter(result => result).join('');
   return Promise.resolve(result);
};

const getSvgUrl = (node) => Promise.resolve(node)
   .then(node => {
      node.setAttribute('xmlns', node.namespaceURI);
      return new XMLSerializer().serializeToString(node);
   })
   .then(xhtml => `<foreignObject x='0' y='0' width='100%' height='100%'>${xhtml}</foreignObject>`)
   .then(foreignObjectStr => `<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='100%' height='100%'>${foreignObjectStr}</svg>`)
   .then(svgContent => {
      // const svg = new Blob([svgContent], {
      //    type: 'image/svg+xml;charset=utf-8'
      // });
      // const url = DOMURL.createObjectURL(svg);
      // return url;
      return 'data:image/svg+xml;charset=utf-8,' + svgContent;
   });


const getCanvas = (element) => {
   const cloneNode = element.cloneNode(true); //deep clone
   const width = element.offsetWidth;
   const height = element.offsetHeight;
   return Promise.resolve(cloneNode)
      .then(addStylesheets)
      .then(getSvgUrl)
      .then(getImage)
      .then(image => {
         const canvas = document.createElement('canvas');
         console.log(image);
         canvas.width = width;
         canvas.height = height;
         canvas.getContext('2d').drawImage(image, 0, 0);
         return canvas;
      });
};

const objectToArray = (obj) => Object.keys(obj).map(key => obj[key]);

const domcapture = {
   getCanvas
};
export {
   domcapture
};
export default domcapture;
