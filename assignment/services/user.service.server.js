module.exports = function (app, model) {
    var bcrypt = require("bcrypt-nodejs");
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;
    var cookieParser = require('cookie-parser');
    var session = require('express-session');
    var facebookConfig = {
        clientID     : process.env.FACEBOOK_CLIENT_ID,
        clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL  : process.env.FACEBOOK_CALLBACK_URL,
        profileFields: ['emails','name','displayName']
    };

    app.use(session({
        secret: 'this is a secret',
        resave: true,
        saveUninitialized: true
    }));
    app.use(cookieParser());
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new LocalStrategy(localStrategy));
    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    app.post("/api/login", passport.authenticate('local'), login);
    app.get ('/auth/facebook', passport.authenticate('facebook'));
    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect: '/assignment/#/user',failureRedirect: '/assignment/#/login'}));
    app.post("/api/checkLoggedIn", checkLoggedIn);
    app.post("/api/logout", logout);
    app.post("/api/register", register);
    app.get("/api/user", findUser);
    app.get("/api/user/:uid", findUserById);
    app.put("/api/user/:uid", updateUser);
    app.delete("/api/user/:uid", deleteUser);

    function facebookStrategy(token, refreshToken, profile, done) {
        model
            .userModel
            .findUserByFacebookId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var email = profile.emails[0].value;
                        var emailParts = email.split("@");
                        var newFacebookUser = {
                            username:  emailParts[0],
                            firstName: profile.name.givenName,
                            lastName:  profile.name.familyName,
                            email:     email,
                            facebook: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return model
                            .userModel
                            .createUser(newFacebookUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }

    function login(req, res) {
        res.send(req.user);
    }

    function localStrategy(username, password, done) {
        model
            .userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    if(user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function(error) {
                    return done(error);
                }
            );
    }

    function serializeUser(user, done) {
        //put user into the current session
        done(null, user);
    }

    function deserializeUser(user, done) {
        model
            .userModel
            .findUserById(user._id)
            .then(
                function(user) {
                    done(null, user);
                },
                function(error) {
                    done(error);
                }
            )
    }

    function checkLoggedIn(req, res) {
        res.send(req.isAuthenticated()? req.user: undefined);
    }

    function logout(req, res) {
        req.logout();
        res.sendStatus(200);
    }

    function register(req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        model
            .userModel
            .createUser(i_user)
            .then(
                function (persistedUser) {
                    req.login(persistedUser, function(err) {
                        if(err) {
                            res.sendStatus(400).send(err);
                        } else {
                            res.send(persistedUser);
                        }
                    });
                    res.send(persistedUser);
                },
                function (error) {
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
                function (persistedUser) {
                    res.send(persistedUser);
                },
                function (error) {
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
                function (persistedUser) {
                    res.send(persistedUser);
                },
                function (error) {
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
                function (persistedUser) {
                    res.send(persistedUser);
                },
                function (error) {
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
                function (status) {
                    res.sendStatus(200);
                },
                function (error) {
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
                function (status) {
                    res.send(true);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );

    }
};