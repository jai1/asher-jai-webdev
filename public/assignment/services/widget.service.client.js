(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", service);

    function service() {


        var apis = {
            createWidget : createWidget,
            findWidgetById : findWidgetById,
            findWidgetsByPageId : findWidgetsByPageId,
            updateWidget : updateWidget,
            deleteWidget : deleteWidget,
        };

        var widgets = [
            { "_id": 123, "widgetType": "HEADER", "pageId": 321, "size": 2, "text": "GIZMODO"},
            { "_id": 234, "widgetType": "HEADER", "pageId": 321, "size": 4, "text": "Lorem ipsum"},
            { "_id": 345, "widgetType": "IMAGE", "pageId": 321, "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": 456, "widgetType": "HTML", "pageId": 321, "text": "<p>Lorem ipsum</p>"},
            { "_id": 567, "widgetType": "HEADER", "pageId": 321, "size": 4, "text": "Lorem ipsum"},
            { "_id": 678, "widgetType": "YOUTUBE", "pageId": 321, "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": 789, "widgetType": "HTML", "pageId": 321, "text": "<p>Lorem ipsum</p>"}
        ];


        return apis;

        function createWidget(i_pageId, i_widget) {
            widgets.push(i_widget)
            return true;
        }

        function findWidgetsByPageId(i_pageId) {
            console.log("In findWidgetsByPageId")
            var widgetsList = [];
            for (var w in widgets) {
                var widget = widgets[w];
                if (widget.pageId === i_pageId) {
                    widgetsList.push(widget);
                }
            }
            return widgetsList;
        }

        function findWidgetById(i_widgetId) {
            console.log("In findWidgetById")
            for (var w in widgets) {
                var widget = widgets[w];
                if (widget._id === i_widgetId) {
                    return widget;
                }
            }
        }

        function updateWidget(i_widgetId, i_widget) {
            console.log("In updateWidget : ", i_widgetId)
            for (var w in widgets) {
                var wg = widgets[w];
                if (wg._id === i_widgetId) {
                    i_widget[w] = i_widget;
                }
            }

        }

        function deleteWidget(i_widgetId) {
            var leftWidgets = [];
            for (var w in widgets) {
                var widget = widgets[w];
                if (widget._id !== i_widgetId) {
                    leftWidgets.push(widget)
                }
            }
            widgets = leftWidgets;
        }
    }
})();