module.exports = function () {
    var model = {};
    var mongoose = require("mongoose");
    var Q = require("q");
    var WebsiteSchema = require("./website.schema.server.js")();
    var WebsiteModel = mongoose.model("WebsiteModel", WebsiteSchema);

    var api = {
        setModel: setModel,
        createWebsiteForUser: createWebsiteForUser,
        findWebsiteById: findWebsiteById,
        updateWebsite: updateWebsite,
        findAllWebsitesForUser: findAllWebsitesForUser,
        deleteWebsite: deleteWebsite,
        removePageFromWebsite: removePageFromWebsite,
        removeWebsite: removeWebsite
    };
    return api;

    function setModel(_model) {
        model = _model;
    }

    function createWebsiteForUser(i_userId, i_website) {
        return WebsiteModel
            .create(i_website)
            .then(function (websiteObj) {
                return model
                    .userModel
                    .findUserById(i_userId)
                    .then(function (userObj) {
                        userObj.websites.push(websiteObj._id);
                        userObj.save();
                        websiteObj._user = userObj._id;
                        return websiteObj.save();
                    });
            });
    }

    function findAllWebsitesForUser(i_userId) {
        return WebsiteModel
            .find({_user: i_userId});
    }

    function findWebsiteById(i_websiteId) {
        return WebsiteModel
            .findById(i_websiteId);
    }

    function updateWebsite(i_websiteId, i_website) {
        return WebsiteModel
            .update(
                {
                    _id: i_websiteId
                },
                {
                    name: i_website.name,
                    description: i_website.description
                }
            );
    }

    function deleteWebsite(i_websiteId) {
        return WebsiteModel
            .findById(i_websiteId)
            .then(function (websiteObj) {
                var userId = websiteObj._user;
                return model
                    .userModel
                    .removeWebsiteFromUser(userId, i_websiteId)
                    .then(function (user) {
                        return removeWebsite(i_websiteId);
                    });
            });
    }

    function removeWebsite(i_websiteId) {
        return WebsiteModel
            .findById(i_websiteId)
            .select({"_id": 0, "pages": 1})
            .then(function (websitePages) {
                var promises = websitePages.pages.map(function (page) {
                    return model.pageModel.removePage(page);
                });
                return Q
                    .all(promises)
                    .then(function () {
                        return WebsiteModel.remove({_id: i_websiteId});
                    });
            });
    }

    function removePageFromWebsite(i_websiteId, i_pageId) {
        return WebsiteModel
            .findById(i_websiteId)
            .then(function (websiteObj) {
                var pages = websiteObj.pages;
                for (var p in pages) {
                    if (pages[p].toString() == i_pageId) {
                        pages.splice(p, 1);
                    }
                }
                websiteObj.pages = pages;
                return websiteObj.save();
            });
    }
};