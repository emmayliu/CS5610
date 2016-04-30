/**
 * Created by emma on 4/29/16.
 */
(function () {
    angular
        .module("MovieApp")
        .controller("ReviewController", reviewController);

    function reviewController($rootScope) {
        var model = this;
        model.currentUser = $rootScope.currentUser;
        model.reviews = null;



        function init() {
            model.reviews = model.currentUser.reviews;
        }

        init();

    }

})();