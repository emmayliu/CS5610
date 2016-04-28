/**
 * Created by emma on 4/27/16.
 */
(function(){
    angular
        .module("MovieApp")
        .controller("DetailsController", detailsController);

    function detailsController($routeParams,
                               OmdbService,
                               $rootScope,
                               $location,
                               MovieService
    ) {
        var vm = this;
        var imdbID = $routeParams.imdbID;
        var currentUser = $rootScope.currentUser;
        vm.favorite = favorite;
        vm.numberOfLikes = 0;

        function init() {
            OmdbService
                .findMovieFullPlot(imdbID)
                .then(function(response){
                    vm.data = response.data;
                });

            MovieService
                .findUserLikes (imdbID)
                .then(function(response){
                    vm.movie = response.data;
                    vm.numberOfLikes = vm.movie.likes.length;
                });
        }
        init();

        function favorite(movie) {
            if(currentUser) {
                vm.movie.likes = [];
                vm.movie.likes.push(currentUser._id);
                MovieService
                    .userLikesMovie(currentUser._id, movie);
            } else {
                $location.url("/login");
            }
        }
    }
})();