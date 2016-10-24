(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;

        function init() {
            vm.userId = parseInt($routeParams.uid);
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        }

        init();
    }

    function NewWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;

        function init() {
            vm.userId = parseInt($routeParams.uid);
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        }

        init();

        vm.createWebsite = createWebsite;

        function createWebsite() {
            vm.error = null;
            if (!WebsiteService.createWebsite(vm.userId, vm.website)) {
                vm.error = "A website with the same name already exists";
            }
            if (!vm.error) $location.url("/user/" + vm.userId + "/website");
        }
    }

    function EditWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;

        function init() {
            vm.userId = parseInt($routeParams.uid);
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
            vm.websiteId = parseInt($routeParams.wid);
            vm.website = WebsiteService.findWebsiteById(vm.websiteId);
        }

        init();

        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function updateWebsite() {
            vm.error = null;
            if (!WebsiteService.updateWebsite(vm.websiteId, vm.website)) {
                vm.error = "Unable to update the website";
            }
            if (!vm.error) {
                $location.url("/user/" + vm.userId + "/website");
            }
        }

        function deleteWebsite() {
            vm.error = null;
            if (!WebsiteService.deleteWebsite(vm.websiteId)) {
                vm.error = "Unable to delete the website";
            }
            if (!vm.error) {
                $location.url("/user/" + vm.userId + "/website");
            }
        }
    }
})();