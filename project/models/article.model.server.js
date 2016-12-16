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
        setModel: setModel,
        findArticlesForUser: findArticlesForUser,
        findArticleByTitle: findArticleByTitle,
        updateArticle: updateArticle,
        createArticle: createArticle
    };

    return api;
    function findArticlesForUser(username) {
        return ArticleModel.find({likedBy: username});
    }
    function findArticleByTitle(title) {
        return ArticleModel.findOne({title: title});
    }
    function updateArticle(article) {
        return ArticleModel.update({title: article.title}, {$set: article});
    }
    function createArticle(article) {
        console.log("Creating new article");
        console.log(article);
        return ArticleModel.create(article);
    }

    function setModel(_model) {
        model = _model;
    }


};