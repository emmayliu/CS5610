/**
 * Created by emma on 4/28/16.
 */
"use strict";

(function () {
    angular
        .module("MovieApp")
        .controller("FollowController", FollowController);

    function FollowController($rootScope, UserService) {
        var vm = this;
        var currentUser = $rootScope.currentUser;

        vm.follow = follow;
        vm.unfollow = unfollow;

        vm.following = [];
        vm.followers = [];
        vm.followingIds = [];
        vm.users = [];



        function init() {
            if(currentUser) {
                UserService
                    .findAll()
                    .then(function (response) {
                        vm.users = response.data;
                        for(var u in vm.users) {
                            var i = vm.followingIds.indexOf(u._id);
                            if(i > -1) {
                                var index = vm.users.indexOf(u);
                                vm.users.splice(index, 1);
                            }
                        }


                    });
            }
        }

        init();

        function follow(index) {
            var newFollowing = vm.users[index];
            vm.users.splice(index, 1);

            vm.followingIds.push(newFollowing._id);
            UserService
                    .userFollowOtherUser(currentUser._id, newFollowing)
                    .then(function(response){
                        vm.following = response.data.following;
                    });
            init();
        }

        function unfollow(index) {
            var followingToDelete = vm.following[index];
            vm.following.splice(index, 1);
            UserService
                .userUnfollowOtherUser(currentUser._id, followingToDelete)
                .then(function (response) {
                    vm.following = response.data;
                });
            init();
        }
    }

})();