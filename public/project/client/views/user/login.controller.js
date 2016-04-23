/**
 * Created by emma on 4/22/16.
 */
(function(){
    "use strict";
    angular
        .module("MovieApp")
        .controller("LoginController", LoginController);


    function LoginController($location, UserService, $rootScope, $scope) {
        $scope.$location = $location;
        $scope.isLoggedIn = false;
        $scope.login = login;


        function login(user) {
            console.log("log in controller");
            UserService
                .login(user)
                .then(function (response) {
                        if (response.data) {
                            $scope.isLoggedIn = "true";
                            $rootScope.user = response.data;
                            UserService.setCurrentUser($rootScope.user);
                            $('#loginModal').modal('hide');
                            $location.url("/profile");
                        }
                    });

        }
    }
})();