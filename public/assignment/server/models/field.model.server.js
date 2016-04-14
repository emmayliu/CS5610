/**
 * Created by emma on 4/13/16.
 */
"use strict";

var q = require('q');

module.exports = function(mongoose, db) {
    var FormSchema = require('./form.schema.server.js')(mongoose);
    var FormModel2 = mongoose.model('FormModel2', FormSchema);

    var FieldModel = mongoose.model('FieldModel', FormSchema);

    var api = {
        findAllFields: findAllFields,
        findFieldByIds: findFieldByIds,
        findIndexById: findIndexById,
        deleteField: deleteField,
        createField: createField,
        updateField: updateField
    };
    return api;


    function findIndexById(id, array) {
        for (var a in array) {
            if(array[a]._id == id){
                return a;
            }
        }
        return -1;
    }

    function findAllFields(formId) {
        var deferred = q.defer();
        FormModel2.findById(formId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc.fields);
            }
        });
        return deferred.promise;
    }

    function findFieldByIds (formId, fieldId) {
        var deferred = q.defer();
        FormModel2.findById(formId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                var f;
                for (f in doc.fields) {
                    if (doc.fields[f] === fieldId) {
                        deferred.resolve(doc.fields[f]);
                    }
                }
            }
        });
        return deferred.promise;
    }

    function deleteField (formId, fieldId) {
        var deferred = q.defer();

        FormModel2.findById(formId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {

                var index = findIndexById(fieldId, doc.fields);
                if (index > -1) {
                    doc.fields.splice(index, 1);
                }
                doc.save(function (err, updatedForm) {

                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(updatedForm.fields);

                    }
                });
            }
        });

        return deferred.promise;
    }


    function createField (formId, field) {
        var deferred = q.defer();

        FormModel2.findById(formId, function (err, doc) {

            if (err) {
                deferred.reject(err);
            } else {

                field._id = mongoose.Types.ObjectId();
                doc.fields.push(field);

                doc.save(function (err, updatedForm) {

                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(updatedForm.fields);
                    }
                });
            }
        });

        return deferred.promise;
    }

    function updateField (formId, fieldId, field) {
        var deferred = q.defer();

        FormModel2.findById(formId, function (err, doc) {

            if (err) {
                deferred.reject(err);
            } else {
                var index = findIndexById(fieldId, doc.fields);
                if (index > -1) {
                    for (var p in field) {
                        doc.fields[index][p] = field[p];
                    }
                }

                doc.save(function (err, updatedForm) {

                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(updatedForm.fields);

                    }
                });
            }
        });

        return deferred.promise;
    }


}
