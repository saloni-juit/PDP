'use strict';

/**
 * @ngdoc overview
 * @name LoweApp
 * @description
 * # LoweApp
 *
 * Main module of the application.
 */
angular
  .module('LoweApp', [
    'ngAnimate',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
