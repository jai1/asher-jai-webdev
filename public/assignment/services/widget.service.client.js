(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", Service);

    function Service($http) {
        var apis = {
            createWidget: createWidget,
            findWidgetById: findWidgetById,
            findWidgetsByPageId: findWidgetsByPageId,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget,
            sortWidget: sortWidget
        };


        return apis;

        /* Creates a widget if it doesn't exist else returns undefined */
        function createWidget(i_pageId, i_widget) {
            return $http.post("/api/page/" + i_pageId + "/widget", i_widget);
        }

        /* Returns a list widgets on the given page. */
        function findWidgetsByPageId(i_pageId) {
            return $http.get("/api/page/" + i_pageId + "/widget");
        }

        /* Returns a widget if the given widgetId exists, else returns false. */
        function findWidgetById(i_widgetId) {
            return $http.get("/api/widget/" + i_widgetId);
        }

        /* Updates the widget if the given widgetId exists, else returns false. */
        function updateWidget(i_widgetId, i_widget) {
            return $http.put("/api/widget/" + i_widgetId, i_widget);
        }

        /* Deletes the widget if the given widgetId exists, else returns false. */
        function deleteWidget(i_widgetId) {
            return $http.delete("/api/widget/" + i_widgetId);
        }

        function sortWidget(i_pageId, i_start, i_end) {
            var url = "/page/" + i_pageId + "/widget?initial=" + i_start + "&final=" + i_end;
            return $http.put(url);
        }

    }
})();