/**
 * Created by jai1 on 12/14/2016.
 */
module.exports = function (app, model) {
    var bcrypt = require("bcrypt-nodejs");
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    // var FacebookStrategy = require('passport-facebook').Strategy;
    var cookieParser = require('cookie-parser');
    var session = require('express-session');

    app.use(session({
        secret: 'this is a secret',
        resave: true,
        saveUninitialized: true
    }));
    app.use(cookieParser());
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new LocalStrategy(localStrategy));
    // passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);


    // var facebookConfig = {
    //     clientID     : process.env.FACEBOOK_CLIENT_ID,
    //     clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
    //     callbackURL  : process.env.FACEBOOK_CALLBACK_URL,
    //     profileFields: ['emails','name','displayName']
    // };

    app.post("/api/login", passport.authenticate('local'), login);
    app.post("/api/user", createUser);
    app.put("/api/user/", updateUser);
    app.get("/api/loggedin", loggedin);
    app.get("/api/logout", logout);

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : null);
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function localStrategy(username, password, done) {
        console.log("localStrategy called");
        console.log(username);
        console.log(password);
        model
            .userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    console.log("findUserByUsername returned");
                    console.log(user);
                    if (user && password == user.password) {
                        console.log("Password same");
                        return done(null, user);
                    } else {
                        console.log("Password not same");
                        return done(null, false);
                    }
                },
                function (error) {
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
                function (user) {
                    done(null, user);
                },
                function (error) {
                    done(error);
                }
            )
    }

    function login(req, res) {
        console.log("Login called");
        console.log(req.user);
        var user = req.user;
        res.json(user);
    }

    function createUser(req, res) {
        var reqUser = req.body;
        console.log("create user input is ");
        console.log(reqUser);
        model
            .userModel
            .createUser(reqUser)
            .then(
                function (user) {
                    console.log("Created user");
                    console.log(user);
                    if (user) {
                        req.login(user, function (err) {
                            if (err) {
                                res.status(400).send(err);
                            }
                            else {
                                res.json(user);
                            }
                        });
                    }
                },
                function (err) {
                    console.log("Error Occured");
                    console.log(err);
                    res.status(400).send(err);
                }
            );
    }

    function updateUser(req, res) {
        var reqUser = req.body;
        model
            .userModel
            .updateUser(reqUser)
            .then(
                function (user) {
                    return model.userModel.findUserByUsername(reqUser.username);
                },
                function (err) {
                    console.log("Update failed");
                    console.log(err);
                    res.status(400).send(err);
                }
            )
            .then(
                function (user) {
                    if (user) {
                        req.session.currentUser = user;
                    }
                    res.json(user);
                },
                function (err) {
                    console.log("findUserByUsername failed");
                    console.log(err);
                    res.status(400).send(err);
                }
            );
    }


}