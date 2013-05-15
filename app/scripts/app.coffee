"use strict"
angular.module("lezed1ChatYeomanApp", ["chat.services"]).config ($routeProvider) ->
  $routeProvider.when("/",
    templateUrl: "views/chat.html"
    controller: "ChatCtrl"
  ).when("/main",
    templateUrl: "views/main.html"
  ).otherwise templateUrl: "404.html"