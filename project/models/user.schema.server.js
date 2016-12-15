/**
 * Created by jai1 on 12/14/2016.
 */
module.exports = function () {

    var mongoose = require("mongoose");
    var UserSchema = mongoose.Schema({
        username: {type: String, index: {unique: true}},
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        imgUrl: String,
        dateCreated: {type: Date, default: Date.now},
        phone: String,
        followers: [String],
        following: [String],
        roles: {type: String, default: "user", enum: ["user", "admin"]}
    });
    return UserSchema;
};