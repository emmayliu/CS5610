/**
 * Created by emma on 4/16/16.
 */
(function() {
        angular
            .module("WhiteBoardApp")
            .factory("UserService", UserService);

        function UserService($http)
        {
            var service = {
                createUser: createUser
            };
            return service;


            function createUser(user, callback)
            {
                $http
                    .post("/rest/user", user)
                    .success(callback);
            }
        }
})();
