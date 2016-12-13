module.exports = function () {
    var model = {};
    var mongoose = require("mongoose");
    var WidgetSchema = require("./widget.schema.server.js")();
    var WidgetModel = mongoose.model("WidgetModel", WidgetSchema);

    var api = {
        setModel: setModel,
        createWidget: createWidget,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        removeWidget: removeWidget
    };
    return api;

    function setModel(_model) {
        model = _model;
    }

    function createWidget(i_pageId, i_widget) {
        return WidgetModel
            .create(i_widget)
            .then(function (widgetObj) {
                return model
                    .pageModel
                    .findPageById(i_pageId)
                    .then(function (pageObj) {
                        return findAllWidgetsForPage(i_pageId)
                            .then(function (widgets) {
                                pageObj.widgets.push(widgetObj._id);
                                pageObj.save();
                                widgetObj._page = pageObj._id;
                                return widgetObj.save();
                            });
                    });
            });
    }

    //use mode.pageModel.findWidgetsForPage(pageId) instead
    function findAllWidgetsForPage(i_pageId) {
        return WidgetModel
            .find({_page: i_pageId});
    }

    function findWidgetById(i_widgetId) {
        return WidgetModel
            .findById(i_widgetId);
    }

    function updateWidget(i_widgetId, i_widget) {
        return WidgetModel
            .update(
                {
                    _id: i_widgetId
                },
                {
                    name: i_widget.name ? i_widget.name : null,
                    text: i_widget.text ? i_widget.text : null,
                    placeholder: i_widget.placeholder ? i_widget.placeholder : null,
                    description: i_widget.description ? i_widget.description : null,
                    url: i_widget.url ? i_widget.url : null,
                    width: i_widget.width ? i_widget.width : null,
                    height: i_widget.height ? i_widget.height : null,
                    rows: i_widget.rows ? i_widget.rows : null,
                    size: i_widget.size ? i_widget.size : null,
                    class: i_widget.class ? i_widget.class : null,
                    icon: i_widget.icon ? i_widget.icon : null,
                    metadata: i_widget.metadata ? i_widget.metadata : null,
                    deletable: i_widget.deletable ? i_widget.deletable : null,
                    formatted: i_widget.formatted ? i_widget.formatted : null
                }
            );
    }

    function deleteWidget(i_widgetId) {
        return WidgetModel
            .findById(i_widgetId)
            .then(function (widgetObj) {
                var pageId = widgetObj._page;
                return model
                    .pageModel
                    .removeWidgetFromPage(pageId, i_widgetId)
                    .then(function (page) {
                        return removeWidget(i_widgetId);
                    });
            });
    }

    function removeWidget(i_widgetId) {
        return WidgetModel
            .remove({_id: i_widgetId});
    }
};