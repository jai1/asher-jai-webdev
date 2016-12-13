module.exports = function () {

    var mongoose = require("mongoose");
    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        dateCreated: {type: Date, default: Date.now},
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        websites: [{type: mongoose.Schema.Types.ObjectId, ref: "WebsiteModel"}]
    }, {collection: "user"});

    return UserSchema;
};