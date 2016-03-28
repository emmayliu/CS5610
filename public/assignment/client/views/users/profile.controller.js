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
            console.log("updating in function update");
            if (!user.password) {
                vm.message = "Password is required.";
            }

            if (!user.email) {
                vm.message = "Please enter your email.";
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