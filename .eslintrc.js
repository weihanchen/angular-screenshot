module.exports = {
   "env": {
      "commonjs": true,
      "es6": true,
      "browser": true
   },
   "extends": ["eslint:recommended", "angular"],
   "globals": {
      "beforeEach": true,
      "describe": true,
      "global": true,
      "inject": true,
      "process": true,
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
      "no-unreachable": "off",
      "prefer-const": "warn",
      "arrow-body-style": ["error", "as-needed", { "requireReturnForObjectLiteral": true }],
      "angular/no-service-method": "off",
      "angular/controll-name": "off",
      "angular/window-service": "off",
      "angular/log": "off",
      "angular/document-service": "off",
      "angular/definedundefined": "off"
   }
};
