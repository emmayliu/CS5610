/**
 * Created by emma on 4/24/16.
 */
(function(){
    angular
        .module("MovieApp")
        .controller("SearchController", searchController);

    // Scroll to appropriate position based on image index and width

    function searchController(OmdbService) {
        var vm = this;

        vm.search = search;

        function init() {

        }
        init();

        function search(movie) {
            OmdbService
                .searchMovieByTitle(movie.title)
                .then(function(response){
                    vm.data = response.data;
                });
        }
    }
})();