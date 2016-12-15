/**
 * Created by jai1 on 12/14/2016.
 */
(function () {
    angular
        .module("NewsYouLike")
        .controller("UserController", Controller);

    function Controller(UserService) {
        var vm = this;
        vm.user = {username: "", password: ""};
        vm.login = function login(user) {
            var flag = validateUser(user);

            if (flag) {
                if (user) {
                    UserService
                        .login(user)
                        .then(
                            function (response) {
                                var resUser = response.data;
                                if (resUser) {
                                    UserService.setCurrentUser(resUser);
                                }
                            },
                            function (err) {
                                vm.error = "Wrong username or password.";
                            });
                    vm.error = "";
                }
            }
            else {
                vm.error = "Please enter your user name and password.";
            }
        };

        vm.createUser = function(user) {
            UserService
                .createUser(user)
                .then(
                    function (response) {
                        var resUser = response.data;
                        if (resUser) {
                            UserService.setCurrentUser(resUser);
                        }
                    },
                    function (err) {
                        vm.error = "Username already exists please enter another username";
                    });
            vm.error = "";
        };

        function validateUser(user) {
            return user && user.username && user.password;
        }
    }

})();