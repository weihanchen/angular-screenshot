const screenshotToolbox = () => {
   const linkFn = (scope, element, attrs, screenshotCtrl) => {
      const template = `<div>${element.children().html()}</div>`;
      screenshotCtrl.setTemplate(template, scope);
   };
   return {
      restruct: 'E',
      template: '<div class="screenshot-toolbox-custom" ng-transclude></div>',
      require: '^screenshot',
      link: linkFn,
      transclude: true
   };
};
/**
 * @ngdoc directive
 * @name screenshot-toolbox
 * @description
 * Custom template of screenshot toolbox, connent with screenshot
*/
export default screenshotToolbox;