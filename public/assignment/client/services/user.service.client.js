/**
 * Created by emma on 2/28/16.
 */
"use strict";
(function(){
    angular
        .module('FormBuilderApp')
        .factory("UserService", userService);


    function userService($http, $rootScope) {

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
            return $http.get("/api/assignment/user?username=" + username + "&password=" + password);
        }

        function findAllUsers() {
            return $http.get("/api/assignment/user");
        }

        function createUser(user) {
            return $http.post("/api/assignment/user", user);
        }

        function deleteUserById(userId) {
            return $http.delete("/api/assignment/user/:id" + userId);
        }

        function updateUser(userId, user) {
            return $http.put("/api/assignment/user/:id" + userId, user);
        }

        function findUserByUsername(username) {
            return $http.get("/api/assignment/user?username=" + username);
        }

        function findUserById(id) {
            return $http.get("/api/assignment/user/" + id);
        }


    }


})();
