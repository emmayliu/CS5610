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
        }


        vm.update = update;

        function update(user) {

            if (user.verifyPassword != null)
            {
                if (user.verifyPassword != user.password) {
                    vm.message = "Password doesn't match";
                    return;
                }
            }
            else
            {
                delete user.password;
            }


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