/**
 * Created by emma on 2/27/16.
 */
"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("SidebarController", SidebarController);

    function SidebarController($location, $scope) {
        $scope.$location = $location;

    }
})();