/**
 * Created by emma on 4/24/16.
 */
(function(){
    angular
        .module("MovieApp")
        .factory("OmdbService", omdbService);

    function omdbService($http) {
        var api = {
            searchMovieByTitle: searchMovieByTitle,
            findMovieByImdbID: findMovieByImdbID,
            findMovieFullPlot: findMovieFullPlot
        };
        return api;

        function findMovieByImdbID(imdbID) {
            return $http.jsonp("http://www.omdbapi.com/?i="+imdbID+"&callback=JSON_CALLBACK");
        }

        function searchMovieByTitle(title) {
            return $http.jsonp("http://www.omdbapi.com/?s="+title+"&callback=JSON_CALLBACK");
        }

        function findMovieFullPlot(imdbID) {
            return $http.jsonp("http://www.omdbapi.com/?i="+imdbID+"&plot=full&callback=JSON_CALLBACK");
        }
    }
})();