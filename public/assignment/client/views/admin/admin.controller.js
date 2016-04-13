/**
 * Created by emma on 2/27/16.
 */
(function () {
    angular
        .module("FormBuilderApp")
        .controller("AdminController", adminController);

    function adminController(UserService, $rootScope) {
        var vm = this;
        vm.message = null;
        vm.addUser = addUser;
        vm.deleteUser = deleteUser;
        vm.updateUser = updateUser;
        vm.selectUser = selectUser;
        vm.currentUser = null;
        vm.users = [];
        vm.newUser = {"username": "", "password": "", "roles": ""};
        var currentUser = null;

        function init() {
            currentUser = UserService.getCurrentUser();
            if(currentUser != null && currentUser.roles.indexOf('admin') >= 0) {
                UserService
                    .findAllUsers()
                    .then(function (response) {
                        vm.users = response.data;
                        console.log(vm.users);

                    })
            }
        }

        init();

        function addUser(user) {
            console.log("adding user");
            UserService
                .createUser(user)
                .then(init);
        }


        function selectUser(index) {
            vm.selectedUser = vm.users[index];
            vm.newUser.username = vm.selectedUser.username;
            vm.newUser.password = vm.selectedUser.password;
            vm.newUser.roles = vm.selectedUser.roles;
        }

        function deleteUser(index) {
            var userToDelete = vm.users[index];
            UserService
                .deleteUserById(userToDelete._id)
                .then(init);
        }

        function updateUser() {
            if(vm.selectedUser != null) {
                UserService
                    .updateUser(vm.selectedUser._id, vm.newUser)
                    .then(init);

            }
        }

    }

})();