/**
 * Created by emma on 4/20/16.
 */
"use strict";
(function(){
    angular
        .module('MovieApp')
        .factory("UserService", userService);


    function userService($http, $rootScope, $q) {

        var model = {
            login: login,
            findUserById: findUserById,
            findAllUsers: findAllUsers,
            register: register,
            logout: logout,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            updateUserAdmin: updateUserAdmin,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser

        };

        return model;

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser() {
            return $rootScope.currentUser;
        }

        function login(user) {
            var deferred = $q.defer();
            $http
                .post("/api/project/login", user)
                .then(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function register(user) {
            var deferred = $q.defer();
            $http
                .post("/api/project/register", user)
                .then(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function logout(user) {
            var deferred = $q.defer();
            $http
                .post("/api/project/logout", user)
                .then(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;

        }

        function updateUserAdmin(userId, user) {
           return $http.put("/api/project/admin/user/" + userId, user);
        }



        function findAllUsers() {
            var deferred = $q.defer();
            $http
                .get("/api/project/admin/user")
                .then(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function createUser(user) {
            var deferred = $q.defer();
            $http
                .post("/api/project/admin/user", user)
                .then(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function deleteUserById(userId) {
            var deferred = $q.defer();
            $http
                .delete("/api/project/admin/user/" + userId)
                .then(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function updateUser(userId, user) {
            var deferred = $q.defer();
            $http
                .put("/api/project/user/" + userId, user)
                .then(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }



        function findUserById(id) {
            var deferred = $q.defer();
            $http
                .get("/api/project/admin/user/" + id)
                .then(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }


    }


})();