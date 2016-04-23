/**
 * Created by emma on 3/13/16.
 */

"use strict";
var bcrypt = require("bcrypt-nodejs");


module.exports = function(app, userModel, passport, LocalStrategy){
    var auth = authorized;
    var admin = isAdmin;

    app.post("/api/assignment/register", register);
    app.post("/api/assignment/login", passport.authenticate('local'), login);
    app.post("/api/assignment/logout", logout);
    app.get("/api/assignment/loggedin", loggedin);
    app.get("/api/assignment/user/:id", auth, profile);
    app.put("/api/assignment/user/:userId", auth, updateUser);
    app.post("/api/assignment/admin/user", admin, addUser);
    app.get("/api/assignment/admin/user", admin, getUser);
    app.delete("/api/assignment/admin/user/:userId", admin, deleteUser);
    app.put("/api/assignment/admin/user/:userId", admin, updateUserAdmin);


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
                    }else if(bcrypt.compareSync(password, user.password)){
                        return done(null, user)
                    } else {
                        return done(null, false);
                    }

                },

                function(err) {
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

        for(var e in newUser.emails) {
          newUser.emails[e] = newUser.emails[e].trim();
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
};