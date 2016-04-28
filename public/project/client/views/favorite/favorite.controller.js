/**
 * Created by emma on 4/27/16.
 */
(function() {
    angular
        .module("MovieApp")
        .controller("FavoriteController", favoriteController);

    function favoriteController($rootScope, OmdbService, MovieService) {
        var vm = this;
        var currentUser = $rootScope.currentUser;
        vm.message = null;
        vm.movies = [];
        vm.likes = currentUser.likes;
        vm.dislike = dislike;



        function init() {
                for(var id in vm.likes) {
                    OmdbService
                        .findMovieByImdbID(id)
                        .then(function (response) {
                            vm.movies.push(response);
                        })
                }
        }
        init();

        function dislike(index) {
            console.log("deleting from controller");
            var MovieToDelete = vm.likes[index];
            vm.likes.splice(index, 1);
            MovieService.
                dislikeMovie(currentUser._id, MovieToDelete)
                .then(function (response) {
                    vm.movies = response.data;
                });
            init();

        }
    }
})();