/**
 * Created by emma on 4/16/16.
 */
(function () {
        angular
            .module("WhiteBoardApp")
            .controller("MainController", MainController);


        function MainController($scope, $location) {
            $scope.$location = $location;
        }
    })();