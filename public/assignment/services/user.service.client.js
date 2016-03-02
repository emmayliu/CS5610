/**
 * Created by emma on 2/28/16.
 */
"use strict";
(function(){
    angular
        .module('FormBuilderApp')
        .factory("UserService", userService);

    function userService() {

        var users;
        users = [
            {
                "_id": 123, "firstName": "Alice", "lastName": "Wonderland",
                "username": "alice", "password": "alice", "roles": ["student"]
            },
            {
                "_id": 234, "firstName": "Bob", "lastName": "Hope",
                "username": "bob", "password": "bob", "roles": ["admin"]
            },
            {
                "_id": 345, "firstName": "Charlie", "lastName": "Brown",
                "username": "charlie", "password": "charlie", "roles": ["faculty"]
            },
            {
                "_id": 456, "firstName": "Dan", "lastName": "Craig",
                "username": "dan", "password": "dan", "roles": ["faculty", "admin"]
            },
            {
                "_id": 567, "firstName": "Edward", "lastName": "Norton",
                "username": "ed", "password": "ed", "roles": ["student"]
            }
        ];

        var api = {
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
        };

        return api;


        function findUserByCredentials(username, password, callback) {
            for(var u in users) {
                if(users[u].username == username && users[u].password == password) {
                    callback(users[u]);
                }
                else {
                    callback(null);
                }
            }
        }

        function findAllUsers(callback) {
            callback(users);
        }

        function createUser(user, callback) {
            user._id = (new Date()).getTime();
            var newUser = user;
            users.push(newUser);
            callback(newUser);

        }

        function deleteUserById(userId, callback) {
            for(var u in users) {
                if(users[u]._id == userId) {
                    users.splice(userId, 1);
                }
            }
            callback(users);
        }

        function updateUser(userId, user, callback) {
           var updatedUser;
           for(var u in users) {
               if(users[u]._id == userId) {
                   users[u] = user;
               }
               updatedUser = user[u];
           }
           callback(updateUser);
        }

    }


})();
