/**
 * Created by emma on 2/27/16.
 */
"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormController", formController);

    function formController($scope, $location, $rootScope, FormService) {

        // if there is no current user, back to home
        if (!$scope.user) {
            $location.url("/home");
        }

        $scope.$location = $location;


        $scope.forms = [];

        //event handler declarations
        $scope.addForm = addForm;
        $scope.findForm = findForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;
        $scope.updateForm = updateForm;




        if($rootScope.user != null) {
            findForm();
        }


        //event handler implementation
        function addForm() {
            FormService.createFormForUser($rootScope.user._id, $scope.form, function(newform) {
                $scope.forms.push(newform);
            });
        }


        function findForm() {
           FormService.findAllFormsForUser($rootScope.user._id, function(updateForms){
               $scope.forms = updateForms;
           });
        }


        function deleteForm(index) {
           var formToDelete = $scope.forms[index];

           FormService.deleteFormById({_id:formToDelete._id}, function(success) {
               $scope.forms.splice(index, 1);
           });
        }


        function selectForm(index) {
            document.getElementById('form_title').value = $scope.forms[index].title;
            $scope.currentForm = $scope.forms[index];
        }

        function updateForm() {
            $scope.currentForm.title = $scope.form.title;
            FormService.updateFormById($scope.currentForm._id, $scope.currentForm, function(success) {
                console.log("updated form");
            });
            $scope.currentForm = null;
        }

    }
})();