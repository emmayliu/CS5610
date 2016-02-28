/**
 * Created by emma on 2/27/16.
 */
(function () {
    angular
        .module("MovieApp")
        .controller("NavController", navController);

    function navController($scope, $location) {
        $scope.$location = $location;
    }

})();