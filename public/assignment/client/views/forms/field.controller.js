"use strict";
/**
 * Created by Emma on 3/13/2016.
 */

(function () {
    angular
        .module("FormBuilderApp")
        .controller("FieldController", fieldController);

    function fieldController($routeParams, FieldService, UserService, $rootScope) {
        var vm = this;
        vm.addField = addField;
        vm.updateField = updateField;
        vm.deleteField = deleteField;
        vm.selectField = selectField;
        vm.cloneField = cloneField;
        vm.displayOptions = displayOptions;
        vm.fieldType = null;
        var formId = $rootScope.formId;
        console.log(formId);
        var userId = $routeParams.userId;
        console.log(userId);
        vm.fields = [];
        vm.fieldType = null;
        vm.newField ={};
        var currentUser = null;

        function init() {
            currentUser = UserService.getCurrentUser();
            if(currentUser != null) {
                FieldService
                    .getFieldsForForm(formId)
                    .then(function (response) {
                        vm.fields = response.data;
                        console.log(vm.fields);
                    })
            }
        }


        init();



        function addField(fieldType) {
            console.log("adding field" +fieldType);
            switch (fieldType) {
                case "text":
                    vm.newField = {"_id": null, "label": "New Text Field", "type": "TEXT", "placeholder": "New Field"};
                    break;
                case "textarea":
                    vm.newField = {"_id": null, "label": "New Text Field", "type": "TEXTAREA", "placeholder": "New" +
                    " Field"};
                    break;
                case "date":
                    vm.newField = {"_id": null, "label": "New Date Field", "type": "DATE"};
                    break;
                case "dropdown":
                    vm.newField = {
                        "_id": null, "label": "New Dropdown", "type": "OPTIONS", "options": [
                            {"label": "Option 1", "value": "OPTION_1"},
                            {"label": "Option 2", "value": "OPTION_2"},
                            {"label": "Option 3", "value": "OPTION_3"}
                        ]
                    };
                    break;
                case "checkbox":
                    vm.newField = {
                        "_id": null, "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                            {"label": "Option A", "value": "OPTION_A"},
                            {"label": "Option B", "value": "OPTION_B"},
                            {"label": "Option C", "value": "OPTION_C"}
                        ]
                    };
                    break;
                case "radio":
                    vm.newField = {
                        "_id": null, "label": "New Radio Buttons", "type": "RADIOS", "options": [
                            {"label": "Option X", "value": "OPTION_X"},
                            {"label": "Option Y", "value": "OPTION_Y"},
                            {"label": "Option Z", "value": "OPTION_Z"}
                        ]
                    };
                    break;
                default: return;
            }
                console.log("adding field by createFieldForForm");
                FieldService
                    .createFieldForForm(formId, vm.newField)
                    .then(init);

        }

        function updateField(field) {
        }


        function cloneField(field) {
            console.log("I am going to clone " +field.lable);
            FieldService
                .createFieldForForm(formId, field)
                .then(init);

        }

        function displayOptions(options) {
            var display = "";
            var tmp;
            for (var op in options) {
                tmp = options[op];
                display += tmp.label + ":" + tmp.value + "\n";
            }
            return display;
        }


        function deleteField(index) {
            console.log("deleting field");
            var fieldToDelete = vm.fields[index];
            console.log(fieldToDelete._id);
            FieldService
                .deleteFieldFromForm(formId, fieldToDelete._id)
                .then(init);
        }

        function selectField(index) {
            vm.selectedField = vm.fields[index];
            vm.newField.label = vm.selectedField.label;
        }
    }
})();