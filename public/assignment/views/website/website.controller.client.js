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
            WebsiteService
                .findWebsitesByUser(vm.userId)
                .success(function (websites) {
                    vm.websites = websites;
                })
                .error(function (err) {

                });
        }

        init();
    }

    function NewWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;

        function init() {
            vm.userId = parseInt($routeParams.uid);
            WebsiteService
                .findWebsitesByUser(vm.userId)
                .success(function (websites) {
                    vm.websites = websites;
                })
                .error(function (err) {

                });
        }

        init();

        vm.createWebsite = createWebsite;

        function createWebsite() {
            vm.error = null;
            WebsiteService
                .createWebsite(vm.userId, vm.website)
                .success(function (website) {
                    if (website) {
                        $location.url("/user/" + vm.userId + "/website");
                    } else {
                        vm.error = "A website with the same name already exists";
                    }
                })
                .error(function (err) {

                });
        }
    }

    function EditWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;

        function init() {
            vm.userId = parseInt($routeParams.uid);
            WebsiteService
                .findWebsitesByUser(vm.userId)
                .success(function (websites) {
                    vm.websites = websites;
                })
                .error(function (err) {

                });
            vm.websiteId = $routeParams.wid;
            WebsiteService
                .findWebsiteById(vm.websiteId)
                .success(function (website) {
                    vm.website = website;
                })
                .error(function (err) {

                });
        }

        init();

        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function updateWebsite() {
            vm.error = null;
            WebsiteService
                .updateWebsite(vm.websiteId, vm.website)
                .success(function (website) {
                    if (!website) {
                        vm.error = "Unable to update the website";
                    } else {
                        $location.url("/user/" + vm.userId + "/website");
                    }
                })
                .error(function (err) {

                });
        }

        function deleteWebsite() {
            vm.error = null;
            WebsiteService
                .deleteWebsite(vm.websiteId)
                .success(function (status) {
                    if (!status) {
                        vm.error = "Unable to delete the website";
                    } else {
                        $location.url("/user/" + vm.userId + "/website");
                    }
                })
                .error(function (err) {

                });
        }
    }
})();