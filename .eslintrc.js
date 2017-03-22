module.exports = {
   "env": {
      "commonjs": true,
      "es6": true,
      "browser": true
   },
   "extends": ["eslint:recommended", "angular"],
   "globals": {
      "process": true,
      "describe": true,
      "beforeEach": true,
      "inject": true,
      "window": true,
      "Timeline": true,
      "__dirname": true,
      "__testBase": true

   },
   "parserOptions": {
      "sourceType": "module"
   },
   "rules": {
      "linebreak-style": [
         "error",
         "windows"
      ],
      "semi": [
         "error",
         "always"
      ],
      "no-console": "off",
      "no-var": "warn",
      "no-unreachable": "off",
      "prefer-const": "warn",
      "arrow-body-style": ["error", "as-needed", { "requireReturnForObjectLiteral": true }],
      "angular/no-service-method": "off",
      "angular/window-service": "off",
      "angular/log": "off"
   }
};