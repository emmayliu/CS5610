/**
 * Created by emma on 4/23/16.
 */
"use strict";

(function () {
    angular
        .module("MovieApp")
        .controller("AdminController", AdminController);

    function AdminController(UserService) {
        var model = this;
        model.addUser = addUser;
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.editUser = editUser;
        model.rolesToString = rolesToString;
        model.sortByUsername = sortByUsername;
        model.sortByFirstName = sortByFirstName;
        model.sortByLastName = sortByLastName;
        model.sortedByUsername = null;
        model.sortedByFirstName = null;
        model.sortedByLastName = null;
        model.getText = getText;

        model.users = [];

        function init() {
            UserService
                .findAllUsers()
                .then(function (response) {
                    model.users = response.data;
                })
        }

        init();

        function addUser(user) {
            user.roles = stringToRoles(user.roles);
            UserService
                .createUser(user)
                .then(function (response) {
                    model.users = response.data;
                });
        }

        function rolesToString(roles) {
            var rolesStr = "";
            for (var r in roles) {
                if (r != 0) {
                    rolesStr += ",";
                }
                rolesStr += roles[r];
            }
            return rolesStr;
        }

        function getText(roles) {
            return roles.toString();

        }



        function stringToRoles(rStr) {
            return rStr.split(',');
        }

        function updateUser() {
            if (model.newUser._id != null) {
                UserService
                    .updateUserAdmin(model.newUser._id, model.newUser)
                    .then(function (response) {
                        model.newUser = response.data;
                        model.newUser = {};
                        init();
                    });
            }
        }

        function deleteUser(index) {
            var userToDelete = model.users[index];
            UserService
                .deleteUserById(userToDelete._id)
                .then(function (response) {
                    model.users = response.data;
                });
        }

        function editUser(index) {
            model.newUser = model.users[index];
        }



        function sortByUsername() {
            if (model.sortedByUsername) {
                model.users.sort(function (a, b) {
                    return a.username.localeCompare(b.username);
                });
                model.sortedByUsername = false;
            } else {
                model.users.sort(function (a, b) {
                    return b.username.localeCompare(a.username);
                });
                model.sortedByUsername = true;
                model.sortedByFirstName = null;
                model.sortedByLastName = null;
            }
        }

        function sortByFirstName() {
            if (model.sortedByFirstName) {
                model.users.sort(function (a, b) {
                    return a.firstName.localeCompare(b.firstName);
                });
                model.sortedByFirstName = false;
            } else {
                model.users.sort(function (a, b) {
                    return b.firstName.localeCompare(a.firstName);
                });
                model.sortedByFirstName = true;
                model.sortedByUsername = null;
                model.sortedByLastName = null;
            }
        }

        function sortByLastName() {
            if (model.sortedByLastName) {
                model.users.sort(function (a, b) {
                    return a.lastName.localeCompare(b.lastName);
                });
                model.sortedByLastName = false;
            } else {
                model.users.sort(function (a, b) {
                    return b.lastName.localeCompare(a.lastName);
                });
                model.sortedByLastName = true;
                model.sortedByUsername = null;
                model.sortedByFirstName = null;
            }
        }
    }

})();