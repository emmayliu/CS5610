/**
 * Created by emma on 2/27/16.
 */
(function(){
    angular
        .module("FormBuiderApp")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html"
            })
            .when("/", {
                templateUrl: "search/search.view.html",
                controller: "SearchController"
            })
            .when("/search/:title", {
                templateUrl: "search/search.view.html",
                controller: "SearchController"
            })

            .when("/detail/:imdbID", {
                templateUrl: "search/detail.view.html",
                controller: "DetailController"
            })
            .otherwise({
                redirectTo: "/home"

            });

    }

})()