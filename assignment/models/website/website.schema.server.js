module.exports = function () {

    var mongoose = require("mongoose");
    var WebsiteSchema = mongoose.Schema({
        _user: {type: mongoose.Schema.Types.ObjectId, ref: "UserModel"},
        dateCreated: {type: Date, default: Date.now},
        name: String,
        description: String,
        pages: [{type: mongoose.Schema.Types.ObjectId, ref: "PageModel"}]
    }, {collection: "website"});

    return WebsiteSchema;
};