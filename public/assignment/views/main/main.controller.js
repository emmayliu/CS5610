/**
 * Created by emma on 2/28/16.
 */
"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("MainController", mainController);

    function mainController($scope, $location){
        $scope.$location = $location;
    }


})()