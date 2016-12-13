module.exports = function () {

    var mongoose = require("mongoose");

    var ImageMetadataSchema = mongoose.Schema({
        originalName: String,
        filename: String,
        fullPath: String,
        size: String,
        mimeType: String
    });

    var WidgetSchema = mongoose.Schema({
        _page: {type: mongoose.Schema.Types.ObjectId, ref: "WebsiteModel"},
        widgetType: {type: String, enum: ['HEADER', 'IMAGE', 'YOUTUBE', 'HTML', 'TEXT']},
        dateCreated: {type: Date, default: Date.now},
        width: String,
        height: String,
        rows: Number,
        size: Number,
        name: String,
        text: String,
        placeholder: String,
        description: String,
        url: String,
        class: String,
        icon: String,
        deletable: Boolean,
        formatted: Boolean,
        metadata: ImageMetadataSchema
    }, {collection: "widget"});

    return WidgetSchema;
};