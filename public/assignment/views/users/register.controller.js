/**
 * Created by emma on 2/27/16.
 */
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", registerController);

    function registerController($rootScope, UserService, $location, $scope) {
        $scope.location = $location;
        $scope.register = register;

        function register() {
            UserService.createUser($scope.user, function (user) {
                $rootScope.user = user;
                $location.url("/profile");
            })
        }
    }
})();