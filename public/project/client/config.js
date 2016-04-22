/**
 * Created by emma on 4/20/16.
 */
"use strict";
(function(){
    angular
        .module("MovieApp", ["ngRoute"])
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.html",
                controller: "HomeController",
                resolve: {
                    loggedin: checkCurrentUser
                }
            })

            .when("/search", {
                templateUrl: "views/search/search.html"
            })
            .when("/account", {
                templateUrl: "views/user/account.html"
            })
            .when("/profile", {
                templateUrl: "views/user/profile.html"
            })


            .otherwise({
                redirectTo: "/home"

            })

    }
    var checkAdmin = function ($q, $timeout, $http, $location, $rootScope, UserService) {
        var deferred = $q.defer();

        $http.get('/api/assignment/loggedin').success(function (user) {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0' && user.roles.indexOf('admin') != -1) {
                UserService.setCurrentUser(user);
                deferred.resolve();
            } else {
                deferred.reject();
                $location.url('/home');
            }
        });

        return deferred.promise;
    };


    var checkLoggedin = function ($q, $timeout, $http, $location, $rootScope, UserService) {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function (user) {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0') {
                UserService.setCurrentUser(user);
                deferred.resolve();
            }
            // User is Not Authenticated
            else {
                $rootScope.errorMessage = 'You need to log in.';
                deferred.reject();
                $location.url('/login');
            }
        });

        return deferred.promise;
    };

    var checkCurrentUser = function ($q, $timeout, $http, $location, $rootScope, UserService) {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function (user) {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0') {
                UserService.setCurrentUser(user);
            }
            deferred.resolve();
        });

        return deferred.promise;
    };

})();