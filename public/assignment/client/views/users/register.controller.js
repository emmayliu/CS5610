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
            if(!user.email){
                vm.message = "Please enter a valid email";
                return;
            }
            if(!user.role) {
                vm.message = "Please enter the role";
                return;
            }

            user.firstName = "";
            user.lastName = "";
            user.roles = [user.role];
            user.emails = [user.email];
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