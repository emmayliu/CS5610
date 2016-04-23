/**
 * Created by emma on 4/22/16.
 */
"use strict";
(function () {
    angular
        .module("MovieApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService, $scope) {

        $scope.$location = $location;
        $scope.register = register;


        function register(user)
        {
            console.log("registering in controller" +user);
            if(!user){
                $scope.message = "enter valid information";
                return;
            }

            if(!user.username){
                $scope.message ="Please enter username";
                return;
            }
            if(!user.password || !user.verifyPassword)
            {
                $scope.message = "Please enter passwords";
                return;

            }
            if(user.password != user.verifyPassword) {
                $scope.message = "Your passwords don't match";
                return;

            }
            user.firstName = "";
            user.lastName = "";


            UserService
                .register(user)
                .then(function (response) {
                    var newUser = response.data;
                    if(newUser == null) {
                        $scope.message = "Username already existed!";
                    }
                    else {
                        delete newUser.password;
                        UserService.setCurrentUser(newUser);
                        $('#loginModal').modal('hide');
                        $location.url("/profile");

                    }
                    //console.log("RETURNED USER", newUser);
                    //console.log(user)
                });



        }
    }
})();