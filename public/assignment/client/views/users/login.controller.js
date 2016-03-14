/**
 * Created by emma on 2/27/16.
 */
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("LoginController", loginController);

    function loginController($rootScope, UserService, $location, $scope) {
        $scope.location = $location;
        $scope.login = login;

        function login() {
            UserService.findUserByCredentials($scope.user.username, $scope.user.password, function(user) {
                if(user){
                    $rootScope.user = user;
                    $location.path("/profile");

                }

            });
        }
    }
})();