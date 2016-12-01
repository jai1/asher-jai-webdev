module.exports = function (app, model) {
    app.post("/api/user", createUser);
    // Handles both Credentials and Username
    app.get("/api/user", findUser);
    app.get("/api/user/:uid", findUserById);
    app.put("/api/user/:uid", updateUser);
    app.delete("/api/user/:uid", deleteUser);

    function createUser(req, res) {
        var i_user = req.body;
        // Delete the field confirm password to make the given object compatible with the one stored in DB
        model
            .userModel
            .createUser(i_user)
            .then(
                function(persistedUser) {
                    res.send(persistedUser);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            );

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
        model
            .userModel
            .findUserByUsername(i_username)
            .then(
                function(persistedUser) {
                    res.send(persistedUser);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            );

    }

    function findUserByCredentials(req, res) {
        var i_username = req.query.username;
        var i_password = req.query.password;
        model
            .userModel
            .findUserByCredentials(i_username, i_password)
            .then(
                function(persistedUser) {
                    res.send(persistedUser);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            );

    }

    function findUserById(req, res) {
        var i_userId = req.params.uid;
        model
            .userModel
            .findUserById(i_userId)
            .then(
                function(persistedUser) {
                    res.send(persistedUser);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            );

    }

    function updateUser(req, res) {
        var i_user = req.body;
        var i_userId = req.params.uid;
        model
            .userModel
            .updateUser(i_userId, i_user)
            .then(
                function(status) {
                    res.sendStatus(200);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            );

    }

    function deleteUser(req, res) {
        var i_userId = req.params.uid;
        model
            .userModel
            .deleteUser(i_userId)
            .then(
                function(status) {
                    res.send(true);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            );

    }
};