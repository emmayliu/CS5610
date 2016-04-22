/**
 * Created by emma on 4/22/16.
 */
"use strict";
(function () {
    angular
        .module("MovieApp")
        .controller("RegisterController", registerController);

    function registerController($location, UserService) {
        var vm = this;
        vm.message =null;

        vm.register = register;


        function register(user)
        {
            console.log("registering in controller" +user);
            if(!user){
                vm.message = "enter valid information";
                return;
            }

            if(!user.username){
                vm.message ="Please enter username";
                return;
            }
            if(!user.password || !user.verifyPassword)
            {
                vm.message = "Please enter passwords";
                return;

            }
            if(user.password != user.verifyPassword) {
                vm.message = "Your passwords don't match";
                return;

            }
            user.firstName = "";
            user.lastName = "";


            UserService
                .register(user)
                .then(function (response) {
                    var newUser = response.data;
                    if(newUser == null) {
                        vm.message = "Username already existed!";
                    }
                    else {
                        delete newUser.password;
                        UserService.setCurrentUser(newUser);
                        $location.url("/profile");

                    }
                    //console.log("RETURNED USER", newUser);
                    //console.log(user)
                });



        }
    }
})();