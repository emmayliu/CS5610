/**
 * Created by emma on 4/27/16.
 */
(function() {
    angular
        .module("MovieApp")
        .controller("FavoriteController", favoriteController);

    function favoriteController($rootScope, OmdbService) {
        var vm = this;
        var currentUser = $rootScope.currentUser;
        vm.message = null;
        vm.movies = [];
        vm.likes = currentUser.likes;



        function init() {
                for(var id in likes) {
                    OmdbService
                        .findMovieByImdbID(id)
                        .then(function (response) {
                            vm.movies.push(response);
                        })
                }
        }
        init();
    }
})();