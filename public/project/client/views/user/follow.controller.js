/**
 * Created by emma on 4/28/16.
 */
"use strict";

(function () {
    angular
        .module("MovieApp")
        .controller("FollowController", FollowController);

    function FollowController($rootScope, $location, UserService) {
        var vm = this;
        var currentUser = $rootScope.currentUser;
        vm.$location = $location;
        vm.follow = follow;
        vm.unfollow = unfollow;
        vm.following = currentUser.following;
        vm.follower = currentUser.followers;
        vm.followingIds = [];
        vm.users = [];



        function init() {
            for(var f in vm.following) {
                vm.followingIds.push(f._id);
                console.log(vm.followingIds);
            }
            if(currentUser) {
                UserService
                    .findAll()
                    .then(function(response) {
                        vm.users = response.data;
                        for(var u in vm.users) {
                            if(vm.following.indexOf(u) > -1) {
                                vm.users.splice(u, 1);
                            }
                        }
                    });
            }
        }

        init();

        function follow(index) {
            var newFollowing = vm.users[index];
            console.log(newFollowing);
            vm.users.splice(index, 1);
            UserService
                .userFollowOtherUser(currentUser._id, newFollowing)
                .then(function (response) {
                    vm.following = response.data;
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