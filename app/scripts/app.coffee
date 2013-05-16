"use strict"
angular.module("lezed1ChatYeomanApp", ["chat.services"]).config ($routeProvider) ->
  $routeProvider.otherwise(
    templateUrl: "views/chat.html"
    controller: "ChatCtrl"
  )