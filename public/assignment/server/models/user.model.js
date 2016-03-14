/**
 * Created by emma on 3/13/16.
 */
var mock = require("./user.mock.json");

module.exports = function() {
    var api = {
        /* CRUD operations */
        createUser: createUser,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        updateUser: updateUser,
        deleteUser: deleteUser,

        // specific service for user operation
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials
    };
    return api;

    /*Implementations of function listed in api */

    function createUser(user) {
        user._id = "ID_" + (new Date()).getTime();
        mock.push(user);
        return mock;
    }

    function findAllUsers() {
        return mock;
    }

    function findUserById(id) {
        for(var u in mock) {
            if(mock[u]._id === id) {
                return mock[u];
            }
        }
        return null;
    }

    function updateUser(id, user) {
        var index = mock.indexOf(findUserById(id));
        mock[index].username = user.username;
        mock[index].firstName = user.firstName;
        mock[index].lastName = user.lastName;
        mock[index].password = user.password;

        return mock;
    }

    function deleteUser(id) {
        for(var u in mock) {
            if(mock[u]._id === id) {
                mock.splice(u, 1);
            }
        }
        return mock;
    }

    function findUserByUsername(username) {
        for(var u in mock) {
            if(mock[u].username == username) {
                return mock[u];
            }
        }
        return null;
    }

    function findUserByCredentials(credentials) {
        for(var u in mock) {
            if(mock[u].username === credentials.username &&
               mock[u].password === credentials.password) {
               return mock[u];
            }
        }
        return null;
    }
}
