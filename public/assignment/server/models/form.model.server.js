/**
 * Created by emma on 3/13/16.
 */

var mock = require("./form.mock.json");
var uuid = require('node-uuid');


module.exports = function() {
    var api = {
        // CRUD operations
        createForm: createForm,
        findAllForms: findAllForms,
        findFormById: findFormById,
        updateForm: updateForm,
        deleteForm: deleteForm,

        // specific service for form operation
        findFormByTitle: findFormByTitle,
        findFormsByUserId: findFormsByUserId,
        findAllFields: findAllFields,
        findFieldByIds: findFieldByIds,
        findIndexById: findIndexById,
        deleteField: deleteField,
        createField: createField,
        updateField: updateField
    };
    return api;

    // Implementations of function listed in api

    function createForm(userId, form) {
        form._id  = uuid.v1();
        form.userId = userId;
        mock.push(form);
        return form;
    }

    function findAllForms() {
        return mock;
    }

    function findFormById(id) {
        for(var f in mock) {
            if(mock[f]._id === id) {
                return mock[f];
            }
        }
        return null;
    }


    function updateForm(id, form) {
        var index = findIndexById(mock, id)
        if(index != -1) {
            for(var f in form) {
                mock[index][f] = form[f];
            }
        }

        return mock;
    }

    function deleteForm(id) {
        for(var f in mock) {
            if(mock[f]._id === id) {
                mock.splice(f, 1);
            }
        }
        return mock
    }

    function findFormByTitle(title) {
        for(var f in mock) {
            if(mock[f].title === title) {
                return mock[f];
            }
        }
        return null;
    }

    function findFormsByUserId(userId) {
        var userForms = [];
        for(var f in mock) {
            if(mock[f].userId === userId) {
                userForms.push(mock[f]);
            }
        }
        return userForms;
    }

    function findIndexById(array, id) {
         for (var a in array) {
             if(array[a]._id === id){
                 return a;
             }
         }
        return -1;
    }

    function findAllFields(formId) {
        var form = findFormById(formId);
        if(form != null) {
            return form.fields;
        }
        return [];
    }

    function findFieldByIds (formId, fieldId) {
        var form = findFormById(formId);
        for(var f in form.fields) {
            if(form.fields[f]._id === fieldId) {
                return form.fields[f];
            }
        }
    }

    function deleteField (formId, fieldId) {
        var form = findFormById(formId);
        for(var f in form.fields) {
            if(form.fields[f]._id === fieldId) {
                form.fields(f, 1);
            }
        }
        return form.fields;
    }

    function createField (formId, field) {
        var form = findFormById(formId);
        field._id = uuid.v1();
        form.fields.push(field);
        return form.fields;
    }

    function updateField (formId, field, fieldId) {
        var form = findFormById(formId);
        var index = form.fields.indexOf(findFieldByIds(formId, fieldId));
        form.fields[index] = field;
        return form.fields;
    }


}
