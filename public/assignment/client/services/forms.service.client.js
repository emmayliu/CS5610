/**
 * Created by emma on 2/28/16.
 */
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .factory("FormService", formsService);

    function formsService($http, $q) {
        var model = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById,
            findFormById: findFormById
        };
        return model;

        function createFormForUser(userId, form) {
            var deferred = $q.defer();
            $http
                .post("/api/assignment/user/" + userId + "/form", form)
                .then(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findAllFormsForUser(userId) {
            var deferred = $q.defer();
            $http
                .get("/api/assignment/user/" + userId + "/form")
                .then(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function deleteFormById(formId) {
            var deferred = $q.defer();
            $http
                .delete("/api/assignment/form/" + formId)
                .then(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findFormById(formId) {
            var deferred = $q.defer();
            $http
                .get("/api/assignment/form/" + formId)
                .then(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function updateFormById(formId, newForm) {
            var deferred = $q.defer();
            $http
                .put("/api/assignment/form/" + formId, newForm)
                .then(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }
    }
})();

