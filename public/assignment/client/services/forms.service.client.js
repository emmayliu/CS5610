/**
 * Created by emma on 2/28/16.
 */
"use strict";
(function(){
    angular
        .module('FormBuilderApp')
        .factory("FormService", formService);

    function formService() {

        var forms = [
                {"_id": "000", "title": "Contacts", "userId": 123},
                {"_id": "010", "title": "ToDo",     "userId": 123},
                {"_id": "020", "title": "CDs",      "userId": 234}
        ];

        var service;
        service = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById,
        };
        return service;

        function createFormForUser(userId, form, callback) {
            var newForm = {
                _id: (new Date).getTime(),
                userId: userId,
                title: form.title
            };
            forms.push(form);
            callback(newForm);
        }

        function findAllFormsForUser(userId, callback) {
            var results = [];
            for(var f in forms) {
                if(forms[f].userId == userId) {
                    results.push(forms[f]);
                }
            }
            callback(results);
        }

        function deleteFormById(formId, callback) {
            for(var f in forms) {
                if(forms[f]._id == formId) {
                    forms.splice(f,1);
                    console.log("delete Form id: " + form._id);
                }
            }
            callback(forms);
        }

        function updateFormById(formId, newForm, callback) {
            for(var f in forms) {
                if(forms[f]._id == formId) {
                    forms[f] = newForm;
                    callback(forms[f]);
                    console.log("update!");
                }
            }
        }


    }
})();

