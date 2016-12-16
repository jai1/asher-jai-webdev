/**
 * Created by jai1 on 12/14/2016.
 */
module.exports = function () {

    var mongoose = require("mongoose");
    var ArticleSchema = mongoose.Schema({
        title: {type: String, index: {unique: true}},
        abstract: String,
        byLine: String,
        imgUrl: String,
        // Username
        likedBy: [String],
        publishDate: {type: Date, default: Date.now()}
    });
    return ArticleSchema;
};