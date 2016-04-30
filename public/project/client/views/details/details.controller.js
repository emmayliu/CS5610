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
                               MovieService,
                               ReviewService
    ) {
        var vm = this;
        var imdbID = $routeParams.imdbID;
        var currentUser = $rootScope.currentUser;
        vm.favorite = favorite;
        vm.create = create;
        vm.numberOfLikes = 0;
        vm.message = null;
        vm.movie;
        vm.reviews;
        vm.content;

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

        function create() {
            var review = {};
            review.title = vm.movie.title;
            review.imdbID = imdbID;
            review.user = currentUser;
            review.content = vm.content;
            ReviewService.createReview(currentUser._id, review);
            vm.message = "Thanks, Your review is saved!";
        }
    }

})();