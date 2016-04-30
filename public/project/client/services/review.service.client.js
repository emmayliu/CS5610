/**
 * Created by emma on 4/28/16.
 */

(function () {
    "use strict";
    angular
        .module("MovieApp")
        .factory("ReviewService", ReviewService);

    function ReviewService($http, $q) {

        var api = {
            "createReview": createReview
        };

        return api;

        function createReview(userId, review) {
            var deferred = $q.defer();

            $http
                .post("/api/project/user/"+userId+"/review/", review)
                .then(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }


    }
})();


