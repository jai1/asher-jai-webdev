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
            setCurrentUser: setCurrentUser,
            updateUser: updateUser,
            getCurrentUser: getCurrentUser,
            logout: logout,
            getUserByUsername: getUserByUsername
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

        function updateUser(user) {
            return $http.put("/api/user", user);
        }

        function getCurrentUser() {
            return $http.get("/api/loggedin");
        }

        function getUserByUsername(username) {
            return $http.get("/api/user/"+ username);
        }

        function logout() {
            return $http.get("/api/logout");
        }
    }
})();