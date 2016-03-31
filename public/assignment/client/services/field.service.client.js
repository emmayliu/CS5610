/**
 * Created by emma on 3/24/16.
 */

"use strict";

(function () {
    angular
        .module("FormBuilderApp")
        .factory("FieldService", fieldService);

    function fieldService($http, $q) {
        var model = {
            createFieldForForm: createFieldForForm,
            getFieldsForForm: getFieldsForForm,
            getFieldForForm: getFieldForForm,
            deleteFieldFromForm: deleteFieldFromForm,
            updateField: updateField
        };
        return model;

        function createFieldForForm(formId, field) {
            var deferred = $q.defer();
            $http
                .post("/api/assignment/form/" + formId + "/field", field)
                .then(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function getFieldsForForm(formId) {
            console.log("get formId" +formId);
            var deferred = $q.defer();
            $http
                .get("/api/assignment/form/" + formId + "/field")
                .then(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function getFieldForForm(formId, fieldId) {
            var deferred = $q.defer();
            $http
                .get("/api/assignment/form/" + formId + "/field/" + fieldId)
                .then(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function deleteFieldFromForm(formId, fieldId) {
            var deferred = $q.defer();
            $http
                .delete("/api/assignment/form/" + formId + "/field/" + fieldId)
                .then(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function updateField(formId, fieldId, newField) {
            var deferred = $q.defer();
            $http
                .put("/api/assignment/form/" + formId + "/field/" + fieldId, newField)
                .then(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }
    }
})();