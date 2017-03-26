const screenshotToolbox = () => {
   const linkFn = (scope, element, attrs, screenshotCtrl) => {
      const template = element.children().html();
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