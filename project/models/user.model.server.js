/**
 * Created by jai1 on 12/14/2016.
 */
module.exports = function () {
    var model = {};
    var mongoose = require("mongoose");
    var Q = require("q");
    var UserSchema = require("./user.schema.server.js")();
    var UserModel = mongoose.model("UserModel", UserSchema);

    var api = {
        setModel: setModel,
        findUserByUsername: findUserByUsername,
        findUserById: findUserById,
        createUser: createUser
    };

    function findUserById(i_userId) {
        return UserModel
            .findById(i_userId);
    }


    function findUserByUsername(i_username) {
        return UserModel
            .findOne({username: i_username});
    }

    function setModel(_model) {
        model = _model;
    }


    function createUser(user) {
        console.log("Reached Create User");
        return UserModel.create(user);
    }

    return api;
};