/**
 * Created by emma on 4/20/16.
 */
"use strict";

var q = require("q");


module.exports = function (mongoose) {
    var UserSchema = require('./user.schema.server.js')(mongoose);
    var UserModel = mongoose.model('UserModel', UserSchema);
    var api = {
        createUser: createUser,
        register: register,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        updateUserById: updateUser,
        updateUserByIdAdmin: updateUserAdmin,
        deleteUser: deleteUser,
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        userLikesMovie: userLikesMovie,
        findUsersByIds: findUsersByIds,
        findUser: findUser,
        userDislikeMovie: userDislikeMovie,
        userFollowOtherUser: userFollowOtherUser,
        userUnfollowOtherUser: userUnfollowOtherUser,
        addFollower: addFollower,
        deleteFollower: deleteFollower


    };
    return api;

    function createUser(user) {
        var deferred = q.defer();


        UserModel.findOne({username: user.username},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                }
                if (doc) {
                    deferred.resolve(null);
                } else {
                    UserModel.create(user, function (err, newUser) {
                        if (err) {
                            deferred.reject(err);
                        } else {
                            UserModel.find({}, function(err, users) {
                                if(err) {
                                    deferred.reject(err);
                                } else {
                                    deferred.resolve(users);
                                }
                            });

                        }
                    });
                }
            });

        return deferred.promise;
    }


    function register(user) {
        var deferred = q.defer();

        UserModel.findOne({username: user.username},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                }
                if (doc) {
                    deferred.resolve(null);
                } else {
                    UserModel.create(user, function (err, newUser) {
                        if (err) {
                            // reject promise if error
                            deferred.reject(err);
                        } else {
                            // resolve promise
                            deferred.resolve(newUser);
                        }
                    });
                }
            });

        return deferred.promise;
    }




    function findAllUsers(){
        var deferred = q.defer();
        UserModel.find({}, function (err,users) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(users);
            }
        });


        return deferred.promise;
    }

    function findUserById(id) {
        var deferred = q.defer();
        UserModel.findById(id, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findUserByUsername(username) {
        var deferred = q.defer();

        UserModel.findOne({
            username: username
        }, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function updateUser(id, user) {
        var deferred = q.defer();

        delete user._id;
        UserModel.update({_id: id}, {$set: user}, function (err, doc) {

            if (err) {
                deferred.reject(err);
            } else {
                UserModel
                    .findOne({_id: id}, function(err, user){
                        if(err){
                            deferred.reject(err);
                        }
                        else{
                            deferred.resolve(user);
                        }
                    });
            }
        });

        return deferred.promise;
    }


    function updateUserAdmin(id, user) {
        var deferred = q.defer();

        delete user._id;
        UserModel.update({_id: id}, user, function (err, doc) {

            if (err) {
                console.log(err);
                deferred.reject(err);
            } else {
                // resolve promise with user
                UserModel.find({}, function (err, users) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(users);
                    }
                });
            }
        });

        return deferred.promise;
    }

    function deleteUser(id) {
        var deferred = q.defer();
        UserModel.remove({_id: id}, function (err, removed) {
            if (err) {
                deferred.reject(err);
            } else {
                UserModel.find({}, function (err, doc) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(doc);
                    }
                });
            }
        });

        return deferred.promise;
    }

    function userLikesMovie (userId, movie) {

        var deferred = q.defer();

        // find the user
        UserModel.findById(userId, function (err, doc) {

            if (err) {
                deferred.reject(err);
            } else {

                // add details id to user likes
                doc.likes.push (movie);

                // save user
                doc.save (function (err, doc) {

                    if (err) {
                        deferred.reject(err);
                    } else {

                        // resolve promise with user
                        deferred.resolve (doc);
                    }
                });
            }
        });

        return deferred;
    }

    function addFollower (userId, otherUser) {

        var deferred = q.defer();

        UserModel.findOne({_id: otherUser._id},
            function(err, doc) {
                if(err) {
                    deferred.reject(err);
                }
                if(doc) {
                    doc.follower.push(userId);
                    doc.save(function(err, doc) {
                        if(err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(doc);
                        }
                    });
                }
            });
        return deferred;
    }

    function userFollowOtherUser (userId, otherUser) {
        var deferred = q.defer();

        UserModel.findById(userId, function (err, doc) {
            if(err) {
                deferred.reject(err);
            } else {
                doc.following.push(otherUser);

                doc.save(function (err, doc) {
                    if(err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(doc);
                    }
                });
            }

        });
        return deferred.promise;
    }



    function findUsersByIds (userIds) {
        var deferred = q.defer();

        UserModel.find({
            _id: {$in: userIds}
        }, function (err, users) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(users);
            }
        });

        return deferred.promise;
    }


    function findUserByCredentials(credentials) {
        var deferred = q.defer();

        UserModel.findOne(
            {
                username: credentials.username,
                password: credentials.password
            },

            function (err, doc) {

                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(doc);
                }

            });

        return deferred.promise;

    }

    function findUser(credentials) {
        var deferred = q.defer();
        UserModel.findOne({
            username : credentials.username
        }, function(err, user) {
            if(err) {
                deferred.reject(err);
            }else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    function userDislikeMovie(userId, movie) {
        var deferred = q.defer();

        UserModel.findById(userId, function(err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                var index = doc.likes.indexOf(movie);
                doc.likes.splice(index, 1);

                doc.save(function (err, doc) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(doc);
                    }
                });
            }
        });
    }

    function userUnfollowOtherUser(userId, otherUser) {
        var deferred = q.defer();

        UserModel.findById(userId, function (err, doc) {
            if(err) {
                deferred.reject(err);
            } else {
                var index = doc.following.indexOf(otherUser);
                doc.following.splice(index, 1);

                doc.save(function (err, doc) {
                    if(err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(doc);
                    }
                });
            }

        });
    }




    function deleteFollower(userId, otherUser) {
        var deferred = q.defer();

        UserModel.findOne({_id: otherUser._id}, function (err, doc) {
            if(err) {
                deferred.reject(err);
            }

            if(doc) {
                for(var f in doc.followers) {
                    if (f.id == userId) {
                        follower.splice(f, 1);
                    }
                    doc.save(function(err, doc) {
                        if(err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(doc);
                        }
                    });
                }
            }
        });
        return deferred.promise;
    }

};