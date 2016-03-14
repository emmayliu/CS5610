/**
 * Created by emma on 2/27/16.
 */
"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($location, $scope, $rootScope) {
        $scope.$location = $location;
        $scope.logout = logout;

        function logout() {
            $rootScope.user = null;
            $location.url("/home");
        }
    }
})();