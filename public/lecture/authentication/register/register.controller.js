/**
 * Created by emma on 4/16/16.
 */
(function(){
    angular
        .module("WhiteBoardApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $location, UserService)
    {
        $scope.register = function(user)
        {
            UserService.createUser(user, function(user)
            {
                if(user != null) {
                    $location.url("/profile");
                }
            });
            //it's better to create service rather than let controller talk to db directly
        }
    }
})();