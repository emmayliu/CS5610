/**
 * Created by emma on 4/20/16.
 */
"use strict";
(function(){
    angular
        .module("MovieApp", ["ngRoute"]).run(function ($rootScope, $uibModalStack) {
        $uibModalStack.dismissAll();

    });
})();