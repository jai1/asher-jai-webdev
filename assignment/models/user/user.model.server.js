module.exports = function () {
    var model = {};
    var mongoose = require("mongoose");
    var Q = require("q");
    var UserSchema = require("./user.schema.server.js")();
    var UserModel = mongoose.model("UserModel", UserSchema);

    var api = {
        setModel: setModel,
        createUser: createUser,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        findUserById: findUserById,
        updateUser: updateUser,
        deleteUser: deleteUser,
        removeWebsiteFromUser: removeWebsiteFromUser,
        count: count,
	findUserByFacebookId    : findUserByFacebookId
    };
    return api;

    function setModel(_model) {
        model = _model;
    }

    function createUser(i_user) {
        return UserModel
            .create(i_user);
    }

    function findUserByUsername(i_username) {
        return UserModel
            .findOne({username: i_username});
    }

    function findUserByCredentials(i_username, i_password) {
        return UserModel
            .findOne({
                username: i_username,
                password: i_password
            });
    }

    function findUserById(i_userId) {
        return UserModel
            .findById(i_userId);
    }

    function findUserByFacebookId(i_facebookId) {
        return UserModel
            .findOne({'facebook.id': i_facebookId});
    }

    function updateUser(i_userId, i_user) {
        return UserModel
            .update(
                {
                    _id: i_userId
                },
                {
                    firstName: i_user.firstName,
                    lastName: i_user.lastName,
                    email: i_user.email,
                    phone: i_user.phone
                }
            );
    }

    function deleteUser(i_userId) {
        return removeUser(i_userId);
    }

    function removeUser(i_userId) {
        return UserModel
            .findById(i_userId)
            .select({"_id": 0, "websites": 1})
            .then(function (userWebsites) {
                var promises = userWebsites.websites.map(function (website) {
                    return model.websiteModel.removeWebsite(website);
                });
                return Q
                    .all(promises)
                    .then(function () {
                        return UserModel.remove({_id: i_userId});
                    });
            });
    }

    function removeWebsiteFromUser(i_userId, i_websiteId) {
        return UserModel
            .findById(i_userId)
            .then(function (userObj) {
                var websites = userObj.websites;
                for (var w in websites) {
                    if (websites[w].toString() == i_websiteId) {
                        websites.splice(w, 1);
                    }
                }
                userObj.websites = websites;
                return userObj.save();
            });
    }

    function count() {
        return UserModel.count();
    }
};