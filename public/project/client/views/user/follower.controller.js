/**
 * Created by emma on 4/29/16.
 */
(function () {
    angular
        .module("MovieApp")
        .controller("FollowController", FollowController);

    function FollowController($rootScope, UserService) {
        var vm = this;
        var currentUser = $rootScope.currentUser;

        vm.follow = follow;
        vm.unfollow = unfollow;

        vm.following = currentUser.following;
        vm.followers = currentUser.followers;
        vm.followingIds = [];
        vm.users = [];




        function init() {
            if(currentUser) {
                for(var f in vm.following) {
                    vm.followingIds.push(vm.following[f]._id);
                }
                UserService
                    .findAll()
                    .then(function (response) {
                        vm.users = response.data;
                        for(var u in vm.users) {
                            if(vm.followingIds.indexOf(vm.users[u]._id) > -1) {
                                vm.users.splice(u, 1);
                            }
                            console.log(vm.users);
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
                    currentUser.following = response.data.following;
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