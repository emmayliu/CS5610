/**
 * Created by emma on 2/27/16.
 */
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", headerController);

    function headerController($scope, $location, UserService) {
        function init() {
            $scope.$location = $location;
            $scope.logout = logout;
            $scope.isAdmin = isAdmin;
        }
        init();

        function logout() {
            UserService
                .logout()
                .then(function (response) {
                    UserService.setCurrentUser(null);
                    $location.url("/home");

                },
                function(err) {
                    $scope.error = err;
                });
        }

        function isAdmin() {
            var user = UserService.getCurrentUser();
            return (user != null && user.roles != null && user.roles.indexOf("admin") != -1);
        }
    }
})();