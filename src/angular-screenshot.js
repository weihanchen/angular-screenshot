'use strict';
import 'babel-polyfill';
import * as angular from 'angular';
import {
   screenshot,
   screenshotToolbox
} from './directives';

angular.module('angular-screenshot', [])
   .directive('screenshot', screenshot)
   .directive('screenshotToolbox', screenshotToolbox);
