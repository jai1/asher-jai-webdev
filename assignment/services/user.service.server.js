module.exports = function (app) {

    var users = [
        {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
        {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
        {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
    ];

    app.post("/api/user", createUser);
    // Handles both Credentials and Username
    app.get("/api/user", findUser);
    app.get("/api/user/:uid", findUserById);
    app.put("/api/user/:uid", updateUser);
    app.delete("/api/user/:uid", deleteUser);

    function createUser(req, res) {
        var i_user = req.body;
        // Delete the field confirm password to make the given object compatible with the one stored in DB
        delete i_user.confirmPassword;
        for (var user in users) {
            if (i_user.username == users[user].username) {
                // User already Exists
                res.send(null);
                return;
            }
        }
        // Assuming that we create only one user per second - need to change it
        i_user._id = new Date().getTime();
        users.push(i_user);
        res.send(i_user);
    }

    function findUser(req, res) {
        var i_username = req.query.username;
        var i_password = req.query.password;
        if (i_username) {
            if (i_password) {
                findUserByCredentials(req, res);
            } else {
                findUserByUsername(req, res);
            }
        }
    }

    function findUserByUsername(req, res) {
        var i_username = req.query.username;
        for (var user in users) {
            if (users[user].username == i_username) {
                res.send(users[user]);
                return;
            }
        }
        res.send(undefined);
    }

    function findUserByCredentials(req, res) {
        var i_username = req.query.username;
        var i_password = req.query.password;
        for (var user in users) {
            if (users[user].username == i_username && users[user].password == i_password) {
                res.send(users[user]);
                return;
            }
        }
        res.send(undefined);
    }

    function findUserById(req, res) {
        var i_userId = req.params.uid;
        for (var user in users) {
            if (users[user]._id == i_userId) {
                res.send(users[user]);
                return;
            }
        }
        res.send(undefined);
    }

    function updateUser(req, res) {
        var i_user = req.body;
        var i_userId = req.params.uid;
        delete i_user.confirmPassword; // Delete the unwanted field
        for (var user in users) {
            if (users[user]._id == i_userId) {
                users[user] = i_user;
                res.send(user);
                return;
            }
        }
        res.send(null);
    }

    function deleteUser(req, res) {
        var i_userId = req.params.uid;
        for (var user in users) {
            if (users[user]._id == i_userId) {
                users.splice(user, 1);
                res.send(true);
                return;
            }
        }
        res.send(false);
    }
};