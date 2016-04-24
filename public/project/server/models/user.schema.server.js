/**
 * Created by emma on 4/20/16.
 */
"use strict";

module.exports = function (mongoose) {
    var FollowSchema = require("./follow.schema.server.js")(mongoose);
    var ReviewSchema = require("./review.schema.server.js")(mongoose);
    var MovieSchema = require("./movie.schema.server.js")(mongoose);

    // declare a user schema by using mongoose
    var UserSchema = mongoose.Schema({
        username: { type: String, required: true },
        password: { type: String, required: true },
        firstName: String,
        lastName: String,
        email: String,
        roles: [String],
        movies: {type: [MovieSchema], default: []},
        reviews: {type: [ReviewSchema], default: []},
        following: {type: [FollowSchema], default: []},
        followers: {type: [FollowSchema], default: []}
    }, {collection: "projectUser"});

    return UserSchema;
};