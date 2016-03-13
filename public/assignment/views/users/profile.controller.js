/**
 * Created by emma on 2/27/16.
 */
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", profileController);

    function profileController($rootScope, UserService, $location, $scope) {

        // if there is no current user, back to home
        if (!$scope.user) {
            $location.url("/home");
        }

        $scope.location = $location;
        $scope.update = update;




        function update() {
            UserService.updateUser($rootScope.user._id, $scope.user, function (user) {
                $rootScope.user = user;
                $location.url("/profile");
                console.log("updated");
            })
        }
    }
})();