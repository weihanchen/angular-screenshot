'use strict';
const xmlsSource = 'http://www.w3.org/2000/svg',
   urlPattern = /url\(['"]?([^'"]+?)['"]?\)/g,
   dataUrlPattern = /^(data:)/;

const addStylesheets = (node) => getMatchedStyleText(node)
   .then(styleText => {
      const styleNode = document.createElement('style');
      node.appendChild(styleNode);
      styleNode.appendChild(document.createTextNode(styleText));
      return node;
   });

const dataUrlToCssText = (cssText, url, dataUrl) => {
   const pattern = new RegExp('(url\\([\'"]?)(' + escape(url) + ')([\'"]?\\))', 'g');
   return cssText.replace(pattern, '$1' + dataUrl + '$3');
};

const dataToUrl = (data, type) => `data:${type};base64,${data}`;

const escape = (str) => str.replace(/([.*+?^${}()|\[\]\/\\])/g, '\\$1');

const getAndEncode = (url) => {
   const timeout = 30000;
   return new Promise((resolve) => {
      const request = new XMLHttpRequest();
      const fail = (message) => {
         console.error(message);
         resolve('');
      };
      request.onreadystatechange = () => {
         if (request.readyState !== 4) return;
         if (request.status !== 200) {
            fail('cannot fetch resource: ' + url + ', status: ' + request.status);
            return;
         }
         const encoder = new FileReader();
         encoder.onloadend = () => {
            resolve(encoder.result.split(/,/)[1]);
         };
         encoder.readAsDataURL(request.response);
      };
      request.ontimeout = () => {
         fail('timeout of ' + timeout + 'ms occured while fetching resource: ' + url);
      };
      request.responseType = 'blob';
      request.timeout = timeout;
      request.open('GET', url, true);
      request.send();
   });
};

const getExtension = (url) => {
   const match = /\.([^\.\/]*?)$/g.exec(url);
   if (match) return match[1];
   else return '';
};

const getInline = (cssText, url, baseUrl) => Promise.resolve(url)
   .then(url => baseUrl ? resolveUrl(url, baseUrl) : url)
   .then(getAndEncode)
   .then(data => dataToUrl(data, getMimeType(url)))
   .then(dataUrl => dataUrlToCssText(cssText, url, dataUrl));

const getInilnes = (rule) => {
   const baseUrl = rule.parentStyleSheet ? rule.parentStyleSheet.href : rule.parentStyleSheet;
   const cssText = rule.cssText;
   if (!isUrl(cssText)) return Promise.resolve(cssText);
   return Promise.resolve(cssText)
      .then(getUrls)
      .then(urls => {
         let done = Promise.resolve(cssText);
         urls.forEach(url => {
            done = done.then(cssText => getInline(cssText, url, baseUrl));
         });
         return done;
      });
};

const getImage = (url) => new Promise((resolve, reject) => {
   const image = new Image();
   image.onload = () => {
      resolve(image);
   };
   image.onerror = reject;
   image.src = url;
});

const getCssRules = () => {
   const sheetsObj = document.styleSheets;
   if (!sheetsObj) return Promise.resolve([]);
   const sheetsArr = objectToArray(sheetsObj);
   const result = sheetsArr.reduce((sum, sheet) => {
      const rulesObject = sheet.rules || sheet.cssRules;
      if (rulesObject) {
         const rules = objectToArray(rulesObject);
         sum.push(...rules);
      }
      return sum;
   }, []);
   return Promise.resolve(result);
};

const getMatchedStyleText = () => getCssRules()
   .then(rules => rules.map(rule => getInilnes(rule)))
   .then(rules => Promise.all(rules))
   .then(cssTexts => cssTexts.join('\n'));

const getMimeType = (url) => {
   const mines = {
      woff: 'application/font-woff',
      woff2: 'application/font-woff',
      ttf: 'application/font-truetype',
      png: 'image/png',
      jpeg: 'image/jpeg',
      gif: 'image/gif',
      tiff: 'image/tiff',
      svg: 'image/svg+xml'
   };
   const extension = getExtension(url).toLowerCase();
   return mines.hasOwnProperty(extension) ? mines[extension] : '';
};

const getSvgUrl = (node) => Promise.resolve(node)
   .then(node => {
      node.setAttribute('xmlns', node.namespaceURI);
      return new XMLSerializer().serializeToString(node);
   })
   .then(xhtml => `<foreignObject x='0' y='0' width='100%' height='100%'>${xhtml}</foreignObject>`)
   .then(foreignObjectStr => `<svg xmlns='${xmlsSource}'>${foreignObjectStr}</svg>`)
   .then(svgContent => `data:image/svg+xml;charset=utf-8,${svgContent}`);


const getCanvas = (element, options) => {
   options = options || {};
   const cloneNode = element.cloneNode(true); //deep clone
   const boudingClientRect = element.getBoundingClientRect();
   const width = boudingClientRect.width;
   const height = boudingClientRect.height;
   return Promise.resolve(cloneNode)
      .then(addStylesheets)
      .then(getSvgUrl)
      .then(getImage)
      .then(image => {
         const canvas = document.createElement('canvas');
         canvas.width = options.width || width;
         canvas.height = options.height || height;
         canvas.getContext('2d').drawImage(image, 0, 0);
         return canvas;
      });
};

const getCanvasImage = (element) => {
   const cloneNode = element.cloneNode(true); //deep clone
   return Promise.resolve(cloneNode)
      .then(addStylesheets)
      .then(getSvgUrl)
      .then(getImage);
};

const getUrls = (cssText) => {
   const result = [];
   let match;
   while ((match = urlPattern.exec(cssText)) !== null) {
      result.push(match[1]);
   }
   return result.filter(url => !isDataUrl(url));
};

const isDataUrl = (url) => url.search(dataUrlPattern) !== -1;

const isUrl = (str) => str.search(urlPattern) !== -1;

const objectToArray = (obj) => Object.keys(obj).map(key => obj[key]);

const resolveUrl = (url, baseUrl) => {
   const doc = document.implementation.createHTMLDocument();
   const base = doc.createElement('base');
   doc.head.appendChild(base);
   const link = doc.createElement('a');
   doc.body.appendChild(link);
   base.href = baseUrl;
   link.href = url;
   return link.href;
};

const domcapture = {
   getCanvas,
   getCanvasImage
};
export default domcapture;
