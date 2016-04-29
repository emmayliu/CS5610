/**
 * Created by emma on 4/24/16.
 */
(function(){
    angular
        .module("MovieApp")
        .controller("SearchController", searchController);

    // Scroll to appropriate position based on image index and width

    function searchController(OmdbService, MovieService, $rootScope, $location) {
        var vm = this;
        var currentUser = $rootScope.currentUser;

        vm.search = search;
        vm.favorite = favorite;
        vm.getMovieDetails = getMovieDetails;
        vm.directDetails = directDetails;
        vm.details = null;
        vm.movie = null;
        vm.message = null;

        function init() {

        }

        init();

        function search(movie) {
            OmdbService
                .searchMovieByTitle(movie.title)
                .then(function (response) {
                    vm.data = response.data;
                });
        }

        function favorite(movie) {
            if (currentUser) {
                vm.movie.likes = [];
                vm.movie.likes.push(currentUser._id);
                MovieService
                    .userLikesMovie(currentUser._id, movie);
            } else {
                $location.url("/login");
            }
        }


        function getMovieDetails(movie) {
            OmdbService
                .findMovieByImdbID(movie.imdbID)
                .then(function (response) {
                    vm.details = response.data;
                });
            MovieService
                .findUserLikes(movie.imdbID)
                .then(function (response) {
                    vm.movie = response.data;
                });
        }

        function directDetails(movie) {
            $location.url("/details/{{movie.imdbID}}");
        }
    }

})();