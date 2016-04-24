/**
 * Created by emma on 2/26/16.
 */
(function(){
    angular
        .module("MovieAdminApp", [])
        .controller("MovieController", MovieController);

    function MovieController($scope) {
        $scope.movies = [
            {id: 123, title: "Harry", director: "JJ Abrams"},
            {id: 234, title: "Blade Runner", director: "xx dakg"},
            {id: 345, title: "Aliens", director: "James"}
        ];

        //event handler declaration
        $scope.addMovie = addMovie;
        $scope.deleteMovie = deleteMovie;
        $scope.selectMovie = selectMovie;
        $scope.updateMovie = updateMovie;


        // event handler implementation
        function addMovie(movie) {
            //console.log("Add favorite;" + $scope.favorite.title);
            var newMovie = {
                id: movie.id,
                title: movie.title,
                director: movie.director
            }
            $scope.movies.push(newMovie);

            $scope.movie = {};
        }

        function deleteMovie(movie) {
            var index = $scope.movies.indexOf(movie);
            $scope.movies.splice(index, 1);
        }

        var selectedMovieIndex = null;
        function selectMovie(movie) {
            console.log(movie);
            selectedMovieIndex = $scope.movies.indexOf(movie);

            $scope.movie = {
                id: movie.id,
                title: movie.title,
                director: movie.director
            }
        }

        function updateMovie(movie){
            $scope.movies[selectedMovieIndex] = {
                id: movie.id,
                title: movie.title,
                director: movie.director

            };


        }
    }
})();