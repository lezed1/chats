'use strict';

angular.module('lezed1ChatYeomanApp', [])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/chat.html',
        controller: 'MainCtrl'
      })
      .when('/main', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        templateUrl: '404.html'
      });
      /*.otherwise({
        redirectTo: '/'
      });*/
  });
