/**
 * Created by emma on 3/13/16.
 */

var mock = require("./form.mock.json");
var uuid = require('uuid');


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
        deleteField: deleteField,
        createField: createField,
        updateField: updateField
    };
    return api;

    // Implementations of function listed in api

    function createForm(form) {
        form._id = uuid.v1();
        mock.push(form);
        return mock;
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
        var index = mock.indexOf(findFormById(id));
        mock[index].title = form.title;
        mock[index].fields = form.fields;

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
        var forms = {};
        for(var f in mock) {
            if(mock[f].userId === userId) {
                forms.push(mock[f]);
            }
        }
        return forms;
    }

    function findAllFields(formId) {
        var form = findFormById(formId);
        if(form) {
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
        field._id = uuid.vi();
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
