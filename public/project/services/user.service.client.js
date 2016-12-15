/**
 * Created by jai1 on 12/14/2016.
 */
(function () {
    angular
        .module("NewsYouLike")
        .factory("UserService", Service);

    function Service($rootScope, $http) {
        var apis = {
            login: login,
            createUser: createUser,
            setCurrentUser: setCurrentUser
        };
        return apis;

        function login(user) {
            return $http.post("/api/login", user);
        }

        function createUser(user) {
            return $http.post("/api/user", user);
        }

        function setCurrentUser(user) {
            $rootScope.user = user;
        }
    }
})();