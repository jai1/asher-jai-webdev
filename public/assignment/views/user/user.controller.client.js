(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);

    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;

        function login(username, password) {
            // console.log('in login');
            vm.error = null;
            if (!username || !password) {
                vm.error = "Enter username and password to login!";
            }
            if (!vm.error) {
                UserService
                    .findUserByCredentials(username, password)
                    .success(function (user) {
                        if (user) $location.url("/user/" + user._id);
                        else vm.error = "Username or Password do not match";
                    })
                    .error(function (err) {

                    });
            }
        }
    }

    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;

        function register(user) {
            vm.error = null;
            // console.log('in register');
            if (!user || !user.username) {
                vm.error = "Enter a valid username";
            } else if (!user || !user.password) {
                vm.error = "Enter a password";
            } else if (!user || (user.password !== user.confirmPassword)) {
                vm.error = "Passwords don't match!";
            } else {
                UserService
                    .createUser(user)
                    .success(function (user) {
                        if (user) {
                            $location.url("/user/" + user._id);
                        }
                        else vm.error = "Username already exists";
                    })
                    .error(function (err) {

                    });
            }
        }
    }

    function ProfileController($routeParams, $location, UserService) {
        var vm = this;

        vm.deleteUser = deleteUser;
        vm.updateUserProfile = updateUserProfile;

        function init() {
            vm.userId = $routeParams.uid;
            UserService
                .findUserById(vm.userId)
                .success(function (user) {
                    if (user) {
                        vm.user = user;
                    }
                })
                .error(function (err) {

                });
        }

        init();

        function updateUserProfile() {
            vm.success = null;
            vm.error = null;
            UserService
                .updateUser(vm.user)
                .success(function (user) {
                    if (user) {
                        vm.success = "Successfully Updated User Profile";
                    } else {
                        vm.error = "Unable to update User Profile";
                    }
                })
                .error(function (err) {

                });
        }

        function deleteUser() {
            vm.error = null;
            UserService
                .deleteUser(vm.userId)
                .success(function (status) {
                    if (!status) {
                        vm.error = "Unable to delete the User";
                    } else {
                        // This "/login" should be the same name as the when section
                        $location.url("/login");
                    }
                })
                .error(function (err) {

                });
        }
    }
})();