(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", service);

    function service() {
        var apis = {
            createUser: createUser,
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            deleteUser: deleteUser,
            updateUser: updateUser
        };

        var users = [
            {_id: 123, username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
            {_id: 234, username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
            {_id: 345, username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
            {_id: 456, username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
        ];

        return apis;

        /* Create a new user if the username doesn't exist, return true if operation successful. */
        function createUser(i_user) {
            // Delete the field confirm password to make the given object compatible with the one stored in DB
            delete i_user.confirmPassword;
            for (var user in users) {
                if (i_user.username === users[user].username) {
                    // User already Exists
                    return false;
                }
            }
            // Assuming that we create only one user per second - need to change it
            i_user._id = new Date().getTime();
            users.push(i_user);
            return true;
        }

        /* Find a user with the given userId, else return undefined */
        function findUserById(i_userId) {
            for (var user in users) {
                if (users[user]._id === i_userId) {
                    return users[user];
                }
            }
            return undefined;
        }

        /* Find a user with the given userName, else return undefined */
        function findUserByUsername(i_username) {
            for (var user in users) {
                if (users[user].username === i_username) {
                    return users[user];
                }
            }
            return undefined;
        }

        /* Find a user with the given credentials, else return undefined */
        function findUserByCredentials(i_username, i_password) {
            for (var user in users) {
                if (users[user].username === i_username && users[user].password === i_password) {
                    return users[user];
                }
            }
            return undefined;
        }

        /* Find a user with the given userId and update it, else return false */
        function updateUser(i_userId, i_user) {
            delete i_user.confirmPassword; // Delete the unwanted field
            for (var user in users) {
                if (users[user]._id === i_userId) {
                    users[user] = i_user;
                    return true;
                }
            }
            return false;
        }

        /* Find a user with the given userId and delete it, else return false */
        function deleteUser(i_userId) {
            for (var user in users) {
                if (users[user]._id === i_userId) {
                    users.splice(user, 1);
                    return true;
                }
            }
            return false;
        }
    }
})();