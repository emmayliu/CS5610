/**
 * Created by emma on 4/22/16.
 */
"use strict";
(function () {
    angular
        .module("MovieApp")
        .controller("AccountController", AccountController);

    function AccountController($location, UserService) {
        var model = this;
        model.error = null;
        model.message = null;
        model.currentUser = UserService.getCurrentUser();

        if (!model.currentUser) {
            $location.url("/home");
        }


        model.update = update;

        function update(user) {
            console.log("updaating in controller");

            if(!user.verifyPassword) {
                model.message = "Please update password for security";
                return;
            }

            if (user.verifyPassword) {
                if (user.verifyPassword != user.password) {
                    model.message = "Passwords don't match.";
                    return;
                }
            } else {
                delete user.password;
            }



            if(!user.email) {
                model.message = "Please enter email";
                return;
            }

            UserService
                .updateUser(model.currentUser._id, user)
                .then(function (response) {
                        model.message = "Update Succussfuly";
                    },
                    function (error) {
                        model.error = error;
                    });
        }
    }
})();