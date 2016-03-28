/**
 * Created by emma on 3/13/16.
 */


var mock = require("./user.mock.json");
var uuid = require('node-uuid');

module.exports = function () {
    var api = {
        createUser: createUser,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        updateUser: updateUser,
        deleteUser: deleteUser,
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername
    };
    return api;

    function createUser(user) {
        user._id = uuid.v1();
        mock.push(user);
        return mock;
    }


    function findAllUsers() {
        return mock;
    }

    function findUserById(id) {
        for (var u in mock) {
            if (mock[u]._id === id) {
                return mock[u];
            }
        }
        return null;
    }

    function findUserByUsername(username) {
        for (var u in mock) {
            if (mock[u].username === username) {
                return mock[u];
            }
        }
        return null;
    }

    function updateUser(id, user) {
        var i = findIndexById(id);
        if (i > -1) {
            for (var p in user) {
                mock[i][p] = user[p];
            }
            //return mock[u];
        }
        return mock;
    }

    function deleteUser(id) {
        var indexToRemove = findIndexById(id);
        if (indexToRemove > -1) {
            mock.splice(indexToRemove, 1);
        }
        return mock;
    }

    function findIndexById(id) {
        for (var u in mock) {
            if (mock[u]._id == id) {
                return i;
            }
        }
        return -1;
    }

    function findUserByCredentials(credentials) {
        for (var u in mock) {
            if (mock[u].username === credentials.username &&
                mock[u].password === credentials.password) {
                return mock[u];
            }
        }
        return  null;
    }
};