(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        vm.userId = parseInt($routeParams.uid);
        vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
    }

    function NewWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.userId = parseInt($routeParams.uid);
        vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        vm.createWebsite = createWebsite;

        function createWebsite() {
            if (!WebsiteService.createWebsite(vm.userId, vm.website)) {
                vm.error = "Website with this title already exists";
            }
            if (!vm.error) $location.url("/user/" + vm.userId + "/website");
        }
    }

    function EditWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.userId = parseInt($routeParams.uid);
        vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        vm.websiteId = parseInt($routeParams.wid);
        vm.website = WebsiteService.findWebsiteById(vm.websiteId);
        vm.createWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function updateWebsite() {
            if (!WebsiteService.updateWebsite(vm.websiteId, vm.website)) {
                vm.error = "Could not update website";
            }
            if (!vm.error) $location.url("/user/" + vm.userId + "/website");
        }

        function deleteWebsite() {
            if (!WebsiteService.deleteWebsite(vm.websiteId)) {
                vm.error = "Could not delete website";
            }
            if (!vm.error) $location.url("/user/" + vm.userId + "/website");
        }
    }
})();