/**
 * Created by emma on 4/22/16.
 */

"use strict";

var q = require("q");

module.exports = function (db, mongoose) {
    var ReviewSchema = require("./review.schema.server.js")(mongoose);
    var ReviewModel = mongoose.model("Review", ReviewSchema);
    var UserS = require('./user.schema.server.js')(mongoose);
    var User = mongoose.model('User', UserS);



    var api = {
        userReviewMovie: userReviewMovie
    };
    return api;


   function userReviewMovie (userId, review) {
       var deferred = q.defer();

       User.findOne({_id: userId},
           function (err, doc) {
               if(err) {
                   deferred.reject(err);
               }
               if(doc) {
                   var newReview = new ReviewModel({
                       imdbID: review.imdbID,
                       content: review.content,
                       userId: userId,
                       time: Date.now(),
                       title: review.title
                   });

                   doc.reviews.push(newReview);

                   doc.save (function (err, doc) {
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
};