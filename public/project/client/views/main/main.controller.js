/**
 * Created by emma on 4/20/16.
 */
"use strict";

(function(){
    angular
        .module("MovieApp")
        .controller("MainController", MainController);

    MainController.$inject = ["$scope", "$sce"];

    function MainController($scope, $location){
        $scope.$location = $location;
    }

})();


