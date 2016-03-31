/**
 * Created by emma on 2/28/16.
 */
"use strict";
(function(){
    angular
        .module('FormBuilderApp')
        .factory("UserService", userService);


    function userService($http, $rootScope, $q) {

        var model = {
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            findUserByUsername: findUserByUsername,
            findUserById: findUserById,
            getCurrentUser: getCurrentUser,
            setCurrentUser: setCurrentUSer

        };

        return model;

        function setCurrentUSer(user) {
            $rootScope.currentUser = user;
        }
        function getCurrentUser() {
            return $rootScope.currentUser;
        }



        function findUserByCredentials(username, password) {
            var deferred = $q.defer();
            $http
                .get("/api/assignment/user?username=" + username + "&password=" + password)
                .then(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findAllUsers() {
            var deferred = $q.defer();
            $http
                .get("/api/assignment/user")
                .then(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function createUser(user) {
            var deferred = $q.defer();
            $http
                .post("/api/assignment/user", user)
                .then(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function deleteUserById(userId) {
            var deferred = $q.defer();
            $http
                .delete("/api/assignment/user/" + userId)
                .then(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function updateUser(userId, user) {
            var deferred = $q.defer();
            $http
                .put("/api/assignment/user/" + userId, user)
                .then(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findUserByUsername(username) {
            var deferred = $q.defer();
            $http
                .get("/api/assignment/user?username=" + username)
                .then(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findUserById(id) {
            var deferred = $q.defer();
            $http
                .get("/api/assignment/user/" + id)
                .then(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }


    }


})();
