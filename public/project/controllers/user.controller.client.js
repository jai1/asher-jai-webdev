/**
 * Created by jai1 on 12/14/2016.
 */
(function () {
    angular
        .module("NewsYouLike")
        .controller("UserController", Controller);

    function Controller($rootScope, UserService) {
        var vm = this;
        vm.error = "";
        vm.message = "";
        vm.user = {username: "", password: "", confirmPassword: "", email: "", firstName: "", lastName: "", phone: ""};
        vm.signUpDataShown = false;

        vm.login = function login(i_user) {
            vm.error = "";
            vm.message = "";
            if (vm.signUpDataShown) {
                $('#collapse1').collapse('hide');
                $('#collapse2').collapse('hide');
                vm.signUpDataShown = false;
                vm.message = "Confirm the details and click Log In";
                return;
            }
            console.log("login called");
            console.log(i_user);
            if (i_user) {
                if (!i_user.username) {
                    vm.error = "Please enter your username";
                } else if (!i_user.password) {
                    vm.error = "Please enter your password";
                }
            } else {
                vm.error = "User Disappeared";
            }

            if (!vm.error) {
                user = {
                    username: i_user.username,
                    password: i_user.password
                };
                UserService
                    .login(user)
                    .then(
                        function (response) {
                            console.log("Got Response");
                            console.log(response);
                            var resUser = response.data;
                            if (resUser) {
                                UserService.setCurrentUser(resUser);
                                $('#myModal').modal('hide');
                                if ($rootScope.populateLikedArticles) {
                                    $rootScope.populateLikedArticles();
                                }
                            }
                        },
                        function (err) {
                            vm.error = "Wrong username or password.";
                        });
                vm.error = "";

            }
        };

        vm.createUser = function (i_user) {
            console.log("i_user is ");
            console.log(i_user);
            vm.error = "";
            vm.message = "";
            if (!vm.signUpDataShown) {
                $('#collapse1').collapse('show');
                $('#collapse2').collapse('show');
                vm.signUpDataShown = true;
                vm.message = "Enter additional details and click Sign Up";
                return;
            }
            if (i_user) {
                if (!i_user.username) {
                    vm.error = "Please select a username";
                } else if (!i_user.password) {
                    vm.error = "Please select a password";
                } else if (i_user.password != i_user.confirmPassword) {
                    vm.error = "Passwords don't match";
                } else if (!i_user.email) {
                    vm.error = "Please enter a valid email address";
                } else if (!i_user.phone) {
                    vm.error = "Please enter a valid phone number";
                }
            } else {
                vm.error = "User Disappeared";
            }

            if (!vm.error) {
                var user = {
                    username: i_user.username,
                    password: i_user.password,
                    email: i_user.email,
                    firstName: i_user.firstName,
                    lastName: i_user.lastName,
                    phone: i_user.phone
                };
                UserService
                    .createUser(user)
                    .then(
                        function (response) {
                            var resUser = response.data;
                            if (resUser) {
                                UserService.setCurrentUser(resUser);
                                $('#myModal').modal('hide');
                                if ($rootScope.populateLikedArticles) {
                                    $rootScope.populateLikedArticles();
                                }
                            }
                        },
                        function (err) {
                            vm.error = "Username already exists please enter another username";
                        });
                vm.error = "";
            }
        };

    }

})();