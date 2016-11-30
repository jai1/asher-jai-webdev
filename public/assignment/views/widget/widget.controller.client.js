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
            WidgetService
                .findWidgetsByPageId(vm.pageId)
                .success(function (widgets) {
                    vm.widgets = widgets;
                })
                .error(function (err) {

                });
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
            var id = parts[parts.length-1];
            if(id.includes("watch")) id = id.split('=')[1];
            url = "https://www.youtube.com/embed/"+id;
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
            if(type!='HEADER' && type!='IMAGE' && type!='YOUTUBE' && type!='HTML' && type!='TEXT') {
                vm.error = 'Widget Type not available';
		return;
            }
            var widget = {};
            widget.widgetType = type;
            WidgetService
                .createWidget(vm.pageId, widget)
                .success(function (widget) {
                    if (!widget) {

                        vm.error = "Unable to create new Widget";
                    } else {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + widget._id);
                    }
                })
                .error(function (err) {

                });
        }
    }

    function EditWidgetController($routeParams, $location, WidgetService) {
        var vm = this;

        function init() {
            vm.userId = $routeParams.uid;
            vm.websiteId = $routeParams.wid;
            vm.pageId = $routeParams.pid;
            vm.widgetId = $routeParams.wgid;
            WidgetService
                .findWidgetById(vm.widgetId)
                .success(function (widget) {
                    vm.widget = widget;
                })
                .error(function (err) {

                });
        }

        init();

        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        return;

        function updateWidget() {
            vm.error = null;

            if (vm.widget.widgetType == "HEADER" && !(vm.widget.size && vm.widget.size >= 1 && vm.widget.size <= 6)) {
                vm.error = "Size needs to be in [1 6]";
                return;
            }
            WidgetService
                .updateWidget(vm.widgetId, vm.widget)
                .success(function (widget) {
                    if (!widget) {
                        vm.error = "Unable to update new Widget";
                    } else {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                    }
                })
                .error(function (err) {

                });
            // WidgetService.printDataOnConsole();
        }

        function deleteWidget() {
            vm.error = null;
            WidgetService
                .deleteWidget(vm.widgetId)
                .success(function (status) {
                    if (!status) {
                        vm.error = "Unable to delete the Widget";
                    } else {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                    }
                })
                .error(function (err) {

                });
        }
    }
})();