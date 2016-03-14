/**
 * Created by emma on 3/13/16.
 */

var mock = require("./form.mock.json");

module.exports = function() {
    var api = {
        // CRUD operations
        createForm: createForm,
        findAllForms: findAllForms,
        findFormById: findFormById,
        updateForm: updateForm,
        deleteForm: deleteForm,

        // specific service for form operation
        findFormByTitle: findFormByTitle
    };
    return api;

    // Implementations of function listed in api

    function createForm(form) {
        form._id = "ID_" + (new Date()).getTime();
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
            if(mock[f].title == title) {
                return mock[f];
            }
        }
        return null;
    }

}
