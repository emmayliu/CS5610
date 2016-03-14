/**
 * Created by emma on 2/28/16.
 */
"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("MainController", MainController);

    MainController.$inject = ["$scope"];

    function MainController($scope, $location){
        $scope.$location = $location;
    }

})();