/**
 * Created by emma on 4/22/16.
 */
(function(){
    "use strict";
    angular
        .module("MovieApp")
        .controller("LoginController", loginController);


    function loginController($location, UserService) {
        var vm = this;
        vm.message = null;

        vm.login = login;

        function init() {
        }
        init();

        function login(user) {
            if(!user) {
                return;
            }
            UserService
                .login(user)
                .then(function (response) {
                        if (response.data) {
                            var resUser = response.data;
                            delete resUser.password;
                            UserService.setCurrentUser(resUser);
                            $location.url("/profile");
                        }
                    });

        }
    }
})();