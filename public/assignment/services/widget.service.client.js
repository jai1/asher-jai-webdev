(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", Service);

    function Service() {
        var apis = {
            createWidget: createWidget,
            findWidgetById: findWidgetById,
            findWidgetsByPageId: findWidgetsByPageId,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget,
            printDataOnConsole: printDataOnConsole
        };

        var widgets = [
            {"_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
            {"_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            {
                "_id": "345",
                "widgetType": "IMAGE",
                "pageId": "321",
                "width": "100%",
                "url": "http://lorempixel.com/400/200/"
            },
            {"_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            {"_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            {
                "_id": "678",
                "widgetType": "YOUTUBE",
                "pageId": "321",
                "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E"
            },
            {"_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum" +
            "\n" +
            "\n" +
            "</p>"},
            {"_id": "123", "widgetType": "HEADER", "pageId": "1", "size": 2, "text": "GIZMODO"},
            {"_id": "234", "widgetType": "HEADER", "pageId": "1", "size": 4, "text": "Lorem ipsum"},
            {
                "_id": "345",
                "widgetType": "IMAGE",
                "pageId": "1",
                "width": "100%",
                "url": "http://lorempixel.com/400/200/"
            },
            {"_id": "456", "widgetType": "HTML", "pageId": "1", "text": "<p>Lorem ipsum</p>"},
            {"_id": "567", "widgetType": "HEADER", "pageId": "1", "size": 4, "text": "Lorem ipsum"},
            {
                "_id": "678",
                "widgetType": "YOUTUBE",
                "pageId": "1",
                "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E"
            },
            {"_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum" +
            "\n" +
            "\n" +
            "</p>"}
        ];

        return apis;

        /* Creates a widget if it doesn't exist else returns undefined */
        function createWidget(i_pageId, i_widget) {
            i_widget._id = new Date().getTime();
            i_widget.pageId = i_pageId;
            for (var widget in widgets) {
                if (widgets[widget]._id == i_widget._id && widgets[widget].pageId == i_pageId) {
                    return undefined;
                }
            }
            widgets.push(i_widget);
            return i_widget._id;
        }

        /* Returns a list widgets on the given page. */
        function findWidgetsByPageId(i_pageId) {
            var o_widgets = [];
            for (var widget in widgets) {
                if (widgets[widget].pageId == i_pageId) {
                    o_widgets.push(widgets[widget]);
                }
            }
            return o_widgets;
        }

        /* Returns a widget if the given widgetId exists, else returns false. */
        function findWidgetById(i_widgetId) {
            for (var widget in widgets) {
                if (widgets[widget]._id == i_widgetId) {
                    return widgets[widget];
                }
            }
            return undefined;
        }

        /* Updates the widget if the given widgetId exists, else returns false. */
        function updateWidget(i_widgetId, i_widget) {
            for (var widget in widgets) {
                if (widgets[widget]._id == i_widgetId) {
                    i_widget._id = widgets[widget]._id;
                    i_widget.pageId = widgets[widget].pageId;
                    widgets[widget] = i_widget;
                    return true;
                }
            }
            return false;
        }

        /* Deletes the widget if the given widgetId exists, else returns false. */
        function deleteWidget(i_widgetId) {
            for (var widget in widgets) {
                if (widgets[widget]._id == i_widgetId) {
                    // Remove widget from array
                    widgets.splice(widget, 1);
                    return true;
                }
            }
            return false;
        }

        function printDataOnConsole() {
            console.log("WidgetService Widgets { ");
            for (var widget in widgets) {
                console.log(widgets[widget]);
            }
            console.log("}");
        }
    }
})();