/**
 * Created by emma on 2/27/16.
 */
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", registerController);

    function registerController($location, UserService) {
        var vm = this;
        vm.message =null;

        vm.register = register;


        function register(user)
        {
            if(!user){
                vm.message = "enter valid information";
            }

            if(!user.username){
                vm.message ="Please enter username";
            }
            if(!user.password || !user.verifyPassword)
            {
                vm.message = "Please enter passwords";
            }

            if(user.password != user.verifyPassword) {
                vm.message = "Your passwords don't match";
            }

            if(!user.email){
                vm.message = "Please enter a valid email";
            }
            UserService
                .createUser(user)
                .then(function (response) {
                        var users = response.data;
                        for(var u in users){
                            if(users[u].username === user.username) {
                                UserService.setCurrentUser(users[u]);
                                $location.url("/profile");
                                break;
                            }
                        }


                });



        }
    }
})();