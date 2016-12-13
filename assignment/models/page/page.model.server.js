module.exports = function () {
    var model = {};
    var mongoose = require("mongoose");
    var Q = require("q");
    var PageSchema = require("./page.schema.server.js")();
    var PageModel = mongoose.model("PageModel", PageSchema);

    var api = {
        setModel: setModel,
        findPageById: findPageById,
        updatePage: updatePage,
        deletePage: deletePage,
        createPageForWebsite: createPageForWebsite,
        removeWidgetFromPage: removeWidgetFromPage,
        findWidgetsForPage: findWidgetsForPage,
        reorderWidgetsForPage: reorderWidgetsForPage,
        findAllPagesForWebsite: findAllPagesForWebsite,
        removePage: removePage
    };
    return api;

    function setModel(_model) {
        model = _model;
    }

    function createPageForWebsite(i_websiteId, page) {
        return PageModel
            .create(page)
            .then(function (pageObj) {
                return model
                    .websiteModel
                    .findWebsiteById(i_websiteId)
                    .then(function (websiteObj) {
                        websiteObj.pages.push(pageObj._id);
                        websiteObj.save();
                        pageObj._website = websiteObj._id;
                        return pageObj.save();
                    });
            });
    }

    function findAllPagesForWebsite(i_websiteId) {
        return PageModel
            .find({_website: i_websiteId});
    }

    function findPageById(i_pageId) {
        return PageModel
            .findById(i_pageId);
    }

    function updatePage(i_pageId, i_page) {
        return PageModel
            .update(
                {
                    _id: i_pageId
                },
                {
                    name: i_page.name,
                    title: i_page.title,
                    description: i_page.description
                }
            );
    }

    function deletePage(i_pageId) {
        return PageModel
            .findById(i_pageId)
            .then(function (pageObj) {
                var websiteId = pageObj._website;
                return model
                    .websiteModel
                    .removePageFromWebsite(websiteId, i_pageId)
                    .then(function (website) {
                        return removePage(i_pageId);
                    });
            });
    }

    function removePage(i_pageId) {
        return PageModel
            .findById(i_pageId)
            .select({"_id": 0, "widgets": 1})
            .then(function (pageWidgets) {
                var promises = pageWidgets.widgets.map(function (widget) {
                    return model.widgetModel.removeWidget(widget);
                });
                return Q
                    .all(promises)
                    .then(function () {
                        return PageModel.remove({_id: i_pageId});
                    });
            });
    }

    function removeWidgetFromPage(i_pageId, i_widgetId) {
        return PageModel
            .findById(i_pageId)
            .then(function (pageObj) {
                var widgets = pageObj.widgets;
                for (var w in widgets) {
                    if (widgets[w].toString() === i_widgetId) {
                        widgets.splice(w, 1);
                    }
                }
                pageObj.widgets = widgets;
                return pageObj.save();
            });
    }

    function findWidgetsForPage(i_pageId) {
        return PageModel
            .findById(i_pageId)
            .populate('widgets')
            .select({'widgets': 1, '_id': 0});
    }

    //remove from initial and put it in the end
    function reorderWidgetsForPage(i_pageId, i_initial, i_final) {
        return findPageById(i_pageId)
            .then(function (page) {
                var widgets = page.widgets;
                var movedWidget = widgets.splice(i_initial, 1)[0];
                widgets.splice(i_final, 0, movedWidget);
                page.widgets = widgets;
                return page.save();
            });
    }
};