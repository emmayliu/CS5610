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

            else if(!user.username){
                vm.message ="Please enter username";
            }
            else if(!user.password || !user.verifyPassword)
            {
                vm.message = "Please enter passwords";

            }

            else if(user.password != user.verifyPassword) {
                vm.message = "Your passwords don't match";

            }

            else if(!user.email){
                vm.message = "Please enter a valid email";
            }

            else {

                UserService
                    .createUser(user)
                    .then(function (response) {
                        var newUser = response.data;
                        UserService.setCurrentUser(newUser);
                        //console.log(user);
                        $location.url("/profile");

                    });
            }



        }
    }
})();