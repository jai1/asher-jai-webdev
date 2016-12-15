/**
 * Created by jai1 on 12/14/2016.
 */
module.exports = function () {
    var model = {};
    var mongoose = require("mongoose");
    var Q = require("q");
    var ArticleSchema = require("./article.schema.server.js")();
    var ArticleModel = mongoose.model("ArticleModel", ArticleSchema);

    var api = {
        setModel : setModel
    };


    function setModel(_model) {
        model = _model;
    }

    return api;
};