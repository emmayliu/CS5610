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
        vm.message = null;
        vm.currentUser = UserService.getCurrentUser();

        if(!vm.currentUser) {
            $location.url("/home");
        }


        vm.update = update;

        function update(user) {
            if (!user.password || !user.verifyPassword) {
                vm.message = "Password is required.";
                return;
            }
            if (user.verifyPassword != user.password) {
                vm.message = "Passwords don't match.";
                return;
            }
            if (!user.email) {
                vm.message = "Email is required.";
                return;
            }
            UserService
                .updateUser(vm.currentUser._id, user)
                .then(function (response) {
                    var cUser = response.data;
                    if (cUser != null) {
                        vm.currentUser = cUser;
                    }
                });
        }
    }
})();