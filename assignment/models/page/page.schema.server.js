module.exports = function () {

    var mongoose = require("mongoose");
    var PageSchema = mongoose.Schema({
        _website: {type: mongoose.Schema.Types.ObjectId, ref: "WebsiteModel"},
        name: String,
        title: String,
        description: String,
        dateCreated: {type: Date, default: Date.now},
        // Widgets are rendered in the same order as they appear here
        widgets: [{type: mongoose.Schema.Types.ObjectId, ref: "WidgetModel"}]
    }, {collection: "page"});

    return PageSchema;
};