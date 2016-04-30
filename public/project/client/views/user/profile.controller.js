/**
 * Created by emma on 4/22/16.
 */
(function(){
    "use strict";
    angular
        .module("MovieApp")
        .controller("ProfileController", ProfileController);


    function ProfileController($location, $scope) {
        $scope.$location = $location;
        $scope.isLoggedIn = false;

        function init() {
           $location.url("/favorite");
        }
        init();

    }
})();