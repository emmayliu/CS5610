/**
 * Created by emma on 4/22/16.
 */

"use strict";
module.exports = function (mongoose) {
    var ReviewSchema = new mongoose.Schema({
        imdbID: String,
        content: String,
        time: Date,
        userId: String,
        title: String
    }, {collection: "project.review"});
    return ReviewSchema;
};