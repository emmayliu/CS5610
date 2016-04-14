/**
 * Created by emma on 3/13/16.
 */
"use strict";
// var mock = require("./form.mock.json");
// var uuid = require('node-uuid');

var q = require('q');

module.exports = function(mongoose, db) {
    var FormSchema = require('./form.schema.server.js')(mongoose);

    var FormModel = mongoose.model('FormModel', FormSchema);

    var api = {
        // CRUD operations
        createForm: createForm,
        findFormById: findFormById,
        updateForm: updateForm,
        deleteForm: deleteForm,

        // specific service for form operation
        findFormByTitle: findFormByTitle,
        findFormsByUserId: findFormsByUserId,

    };
    return api;

    // Implementations of function listed in api

    function createForm(form) {
        var deferred = q.defer();

        FormModel.create(form, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                FormModel.find({}, function (err, forms) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(forms);
                    }
                });
            }
        });

        return deferred.promise;
    }


    function findFormById(id) {
        var deferred = q.defer();
        FormModel.findById(id, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }



    function updateForm(id, form) {
        var deferred = q.defer();

        // find the form
        FormModel.update({_id: id}, form, function (err, doc) {

            // reject promise if error
            if (err) {
                deferred.reject(err);
            } else {
                // resolve promise with form
                FormModel.find({}, function (err, doc) {
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

    function deleteForm(id) {
        var deferred = q.defer();
        FormModel.remove({_id: id}, function (err, removed) {
            if (err) {
                deferred.reject(err);
            } else {
                FormModel.find({}, function (err, doc) {
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

    function findFormByTitle(title) {
        var deferred = q.defer();

        FormModel.findOne({
            title: title
        }, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function findFormsByUserId(userId) {
        var deferred = q.defer();

        FormModel
            .find({userId: userId}, function(err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                   // console.log("finding in model");
                   // console.log(doc);
                    deferred.resolve(doc);
                }

            });
        return deferred.promise;
    }

    function findIndexById(id, array) {
         for (var a in array) {
             if(array[a]._id == id){
                 return a;
             }
         }
        return -1;
    }




}
