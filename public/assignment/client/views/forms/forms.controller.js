/**
 * Created by emma on 2/27/16.
 */
(function () {
    angular
        .module("FormBuilderApp")
        .controller("FormController", formController);

    function formController(UserService, FormService, $rootScope) {
        var vm = this;
        vm.message = null;
        vm.addForm = addForm;
        vm.updateForm = updateForm;
        vm.deleteForm = deleteForm;
        vm.selectForm = selectForm;
        vm.getFormId = getFormId;
        vm.newForm = {"title": ""};
        vm.forms = [];
        var currentUser = null;

        function init() {
            currentUser = UserService.getCurrentUser();
            if (currentUser != null) {
                FormService
                    .findAllFormsForUser(currentUser._id)
                    .then(function (response) {
                        vm.forms = response.data;
                        //console.log(vm.forms);
                    })
            }
        }

        init();

        function getFormId(form) {
            $rootScope.formId =form._id;
        }


        function addForm(form) {
            //console.log("add form");
            form.fields = [];
            FormService
                .createFormForUser(currentUser._id, form)
                .then(init);
        }


        function updateForm() {
            if (vm.selectedForm != null) {
                FormService
                    .updateFormById(vm.selectedForm._id, vm.newForm)
                    .then(init);


            }
        }

        function deleteForm(index) {
            var formToDelete = vm.forms[index];
            FormService
                .deleteFormById(formToDelete._id)
                .then(init);

        }

        function selectForm(index) {
            vm.selectedForm = vm.forms[index];
            vm.newForm.title = vm.selectedForm.title;
        }


    }
})();