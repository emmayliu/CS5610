/**
 * Created by emma on 4/16/16.
 */
(function()
{
    angular
        .module("WhiteBoardApp")
        .config(Config);

    function Config($routeProvider)
    {
        $routeProvider
            .when("/home", {templateUrl: "home.html"})
            .when("/register", {
                templateUrl: "register/register.view.html",
                controller: "RegisterController"
            })
            .when("/login", {templateUrl: "login.html"})
            .when("/profile", {templateUrl: "profile.html"})
            .otherwise({redirectTo: "/home"})
    }
})();