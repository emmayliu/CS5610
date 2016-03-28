/**
 * Created by emma on 2/27/16.
 */
"use strict";
(function(){
    angular
        .module("FormBuilderApp", ["ngRoute"])
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html"
            })
            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller: "LoginController",
                controllerAs: "model"
            })

            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model"
            })

            .when("/forms", {
                templateUrl: "views/forms/forms.view.html",
                controller: "FormController",
                controllerAs: "model"
            })

            .when("/admin", {
                templateUrl: "views/admin/admin.view.html"
            })

            .when("/form/:formId/fields", {
                templateUrl: "views/forms/fields.view.html",
                controller: "FieldController",
                controllerAs: "model"
            })

            .when("/header", {
                templateUrl: "views/header/header.view.html",
                controller: "HeaderController"
            })

            .when("/sidebar", {
                templateUrl: "views/sidebar/sidebar.view.html",
                controller: "SidebarController"
            })

            .when("/404", {
                templateUrl: "views/404.html"
            })


            .otherwise({
                redirectTo: "/home"

            })

    }

})();