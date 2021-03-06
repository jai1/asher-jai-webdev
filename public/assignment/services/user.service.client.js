(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", Service);

    function Service($http) {
        var apis = {
            createUser: createUser,
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            deleteUser: deleteUser,
            login                   : login,
            checkLoggedIn           : checkLoggedIn,
            logout                  : logout,
            updateUser: updateUser,
	    findCurrentUser         : findCurrentUser
        };

        return apis;

        function login(username, password) {
            var user = {
                username: username,
                password: password
            };
            return $http.post("/api/login",user);
        }

        function checkLoggedIn() {
            return $http.post("/api/checkLoggedIn");
        }
	
        /* Create a new user if the username doesn't exist, return true if operation successful. */
        function createUser(i_user) {

            var user = {
                username: i_user.username,
                password: i_user.password
            };
            return $http.post("/api/register", user);
        }
	
	function logout() {
            return $http.post("/api/logout");
        }

        /* Find a user with the given userId, else return undefined */
        function findUserById(i_userId) {
            return $http.get("/api/user/" + i_userId);
        }

        /* Find a user with the given userName, else return undefined */
        function findUserByUsername(i_username) {
            return $http.get("/api/user?username=" + i_username);
        }

        /* Find a user with the given credentials, else return undefined */
        function findUserByCredentials(i_username, i_password) {
            return $http.get("/api/user?username=" + i_username + "&password=" + i_password);
        }

        /* Find a user with the given userId and update it, else return false */
        function updateUser(i_user) {
            return $http.put("/api/user/" + i_user._id, i_user);
        }

        /* Find a user with the given userId and delete it, else return false */
        function deleteUser(i_userId) {
            return $http.delete("/api/user/" + i_userId);
        }
	
	function findCurrentUser() {
	    console.log("WTF 2");
            return $http.get("/api/user");
        }

    }
})();