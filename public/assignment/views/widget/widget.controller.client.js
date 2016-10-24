(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController);

    function WidgetListController($routeParams, $sce, WidgetService) {
        var vm = this;

        function init() {
            vm.userId = $routeParams.uid;
            vm.websiteId = $routeParams.wid;
            vm.pageId = $routeParams.pid;
            vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId);
        }

        init();

        vm.safeCheckHTML = safeCheckHTML;
        vm.safeCheckYoutubeURL = safeCheckYoutubeURL;
        vm.safeCheckImageURL = safeCheckImageURL;

        return;

        function safeCheckHTML(html) {
            return $sce.trustAsHtml(html);
        }

        function safeCheckYoutubeURL(url) {
            var parts = url.split('/');
            var id = parts[parts.length - 1];
            url = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(url);
        }

        function safeCheckImageURL(url) {
            return $sce.trustAsResourceUrl(url);
        }
    }

    function NewWidgetController($routeParams, $location, WidgetService) {
        var vm = this;

        function init() {
            vm.userId = $routeParams.uid;
            vm.websiteId = $routeParams.wid;
            vm.pageId = $routeParams.pid;
        }

        init();

        vm.createWidget = createWidget;

        return;

        function createWidget(type) {
            vm.error = null;
            var widget = {};
            widget.widgetType = type;
            var newWidgetId = WidgetService.createWidget(vm.pageId, widget);
            if (!newWidgetId) {
                vm.error = "Unable to create new Widget";
            }

            if (!vm.error) {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + newWidgetId);
            }
            // WidgetService.printDataOnConsole();
        }
    }

    function EditWidgetController($routeParams, $location, WidgetService) {
        var vm = this;

        function init() {
            vm.userId = $routeParams.uid;
            vm.websiteId = $routeParams.wid;
            vm.pageId = $routeParams.pid;
            vm.widgetId = $routeParams.wgid;
            vm.widget = WidgetService.findWidgetById(vm.widgetId);
        }

        init();

        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        return;

        function updateWidget() {
            vm.error = null;
            console.log(vm.widget);
            if (vm.widget.widgetType == "HEADER" && !(vm.widget.size && vm.widget.size >= 1 && vm.widget.size <= 6)) {
                vm.error = "Size needs to be in [1 6]";
            }
            if (!vm.error && !WidgetService.updateWidget(vm.widgetId, vm.widget)) {
                vm.error = "Unable to update new Widget";
            }
            if (!vm.error) {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
            }
            // WidgetService.printDataOnConsole();
        }

        function deleteWidget() {
            vm.error = null;
            if (!WidgetService.deleteWidget(vm.widgetId)) {
                vm.error = "Unable to delete the Widget";
            }
            if (!vm.error) {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
            }
            // WidgetService.printDataOnConsole();
        }
    }
})();