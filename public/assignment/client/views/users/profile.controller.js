/**
 * Created by emma on 2/27/16.
 */
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", profileController);

    function profileController($location, UserService) {
        var vm = this;
        vm.error = null;
        vm.message = null;
        vm.currentUser = UserService.getCurrentUser();

        if (!vm.currentUser) {
            $location.url("/home");
        } else {
            if(vm.currentUser.emails) {
                vm.currentUser.email = vm.currentUser.emails[0];
            }
        }


        vm.update = update;

        function update(user) {

            if(!user.verifyPassword) {
                vm.message = "Please update password for security";
                return;
            }

            if (user.verifyPassword) {
                if (user.verifyPassword != user.password) {
                    vm.message = "Passwords don't match.";
                    return;
                }
            } else {
                delete user.password;
            }



            if(!user.email) {
                vm.message = "Please enter email";
                return;
            }

            user.emails = [user.email];


            UserService
                .updateUser(vm.currentUser._id, user)
                .then(function (response) {
                    vm.message = "Update Succussfuly";
                    },
                    function (error) {
                        vm.error = error;
                    });
        }
    }
})();