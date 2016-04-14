/**
 * Created by emma on 4/05/16.
 */
"use strict";

module.exports = function (mongoose) {

    // declare a user schema by using mongoose
    var UserSchema = mongoose.Schema({
        username: { type: String, required: true },
        password: { type: String, required: true },
        firstName: String,
        lastName: String,
        email: [String],
        phones: [String],
        roles: [String]
    }, {collection: "user"});

    return UserSchema;
};