/**
 * Created by emma on 4/28/16.
 */

(function () {
    "use strict";
    angular
        .module("MovieApp")
        .factory("ReviewService", ReviewService);

    function ReviewService($http) {

        var api = {
            "createReview": createReview
        };

        return api;

        function createReview(userId, review) {

            return $http.post("/api/project/user/"+userId+"/review", review);

        }


    }
})();


