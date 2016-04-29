/**
 * Created by emma on 4/20/16.
 */
"use strict";
var bcrypt = require("bcrypt-nodejs");


module.exports = function(app, userModel, passport, LocalStrategy) {
    var auth = authorized;
    var admin = isAdmin;

    app.post("/api/project/register", register);
    app.post("/api/project/login", passport.authenticate('local'), login);
    app.post("/api/project/logout", logout);
    app.get("/api/project/loggedin", loggedin);
    app.get("/api/project/user/:id", auth, profile);
    app.put("/api/project/user/:userId", auth, updateUser);
    app.post("/api/project/admin/user", admin, addUser);
    app.get("/api/project/admin/user", admin, getUser);
    app.delete("/api/project/admin/user/:userId", admin, deleteUser);
    app.put("/api/project/admin/user/:userId", admin, updateUserAdmin);
    app.get("/api/project/user", auth, getAllUsers);


    app.post("/api/project/user/:userId/following", userfollowOtherUser);
    app.delete("/api/project/user/:userId/otherUser/:otherUserId", userUnfollowOtherUser);


    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    // functions
    function localStrategy(username, password, done) {
        userModel
            .findUser({username: username, password: password})
            .then(
                function (user) {
                    if (!user) {
                        return done(null, false);
                    } else if (bcrypt.compareSync(password, user.password)) {
                        return done(null, user)
                    } else {
                        return done(null, false);
                    }

                },

                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }


    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function (user) {
                    done(null, user);
                },
                function (err) {
                    done(err, null);
                }
            );
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function getUser(req, res) {
        var uid = req.query.userId;
        if (uid != null) {
            findUserById(req, res);
        } else {
            all(req, res);
        }
    }

    function all(req, res) {
        userModel.findAllUsers()
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }



    function getAllUsers(req, res) {
        all(req, res);
    }





    function profile(req, res) {
        var id = req.params.id;
        if (req.user._id == id) {
            userModel.findUserById(id)
                .then(
                    function (doc) {
                        res.json(doc);
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
        } else {
            res.send(401);
        }
    }

    function findUserById(req, res) {
        var uid = req.query.uesrId;
        userModel.findUserById(uid)
            .then(
                function (user) {
                    delete user.password;
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function register(req, res) {
        var newUser = req.body;

        userModel
            .findUserByUsername(newUser.username)
            .then(
                function (user) {
                    if (user) {
                        res.json(null);
                    } else {
                        newUser.password = bcrypt.hashSync(newUser.password);
                        return userModel.register(newUser);
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (user) {
                    if (user) {
                        req.login(user, function (err) {
                            if (err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function addUser(req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);

        userModel.createUser(user)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function logout(req, res) {
        req.logout();
        res.send(200);
    }

    function updateUser(req, res) {
        var userId = req.params.userId;
        var newUser = req.body;
        if(typeof newUser.roles == "string") {
            newUser.roles = newUser.roles.split(",");
        }

        userModel
            .findUserById(userId)
            .then(function (user) {
                if(user.password != newUser.password) {
                    newUser.password = bcrypt.hashSync(newUser.password);
                }
                userModel
                    .updateUserById(userId, newUser)
                    .then(
                        function(user) {
                            res.json(user);
                        },
                        function(err) {
                            res.status(400).send(err);
                        }
                    );
            });

    }

    function updateUserAdmin(req, res) {
        var userId = req.params.userId;
        var newUser = req.body;

        if(typeof newUser.roles == "string") {
            newUser.roles = newUser.roles.split(",");
        }

        userModel
            .findUserById(userId)
            .then(function (user) {
                if(user.password != newUser.password) {
                    newUser.password = bcrypt.hashSync(newUser.password);
                }
                userModel
                    .updateUserById(userId, newUser)
                    .then(
                        function(doc) {
                            res.json(doc);
                        },
                        function(err) {
                            res.status(400).send(err);
                        }
                    );
            });


    }

    function deleteUser(req, res) {
        var id = req.params.userId;
        userModel.deleteUser(id)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function isAdmin(req, res, next) {
        if (!req.isAuthenticated() || req.user.roles.indexOf("admin") == -1) {
            res.send(403);
        } else {
            next();
        }
    }

    function authorized(req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }

    function userfollowOtherUser(req, res) {
        var userId = req.params.userId;
        var otherUser = req.body;

        userModel
            .userFollowOtherUser(userId, otherUser)
            .then(
                function (doc) {
                    res.json(doc);

                },
                function (err) {
                    res.status(400).send(err);

                }
            );
    }



    function userUnfollowOtherUser(req, res) {
        var userId = req.params.userId;
        var otherUser = req.body;
        var otherUserId = otherUser._id;

        console.log(otherUser);
        console.log(userId);

        userModel
            .userUnfollowOtherUser(userId, otherUser)
            .then(
                function (otherUser) {
                    return userModel.deleteFollower(userId, otherUser);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
}