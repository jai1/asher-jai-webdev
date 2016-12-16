/**
 * Created by jai1 on 12/9/2016.
 */
(function () {
    angular
        .module("NewsYouLike")
        .controller("TopPageController", Controller);

    function Controller($interval, $routeParams, HomePageService, CommonService) {

        /** Common For All Controllers - Start **/
        var vm = this;

        // Default Ratings - to be removed
        vm.rate = 2;
        // Used to show empty image if image not present
        vm.empty = CommonService.getEmptyImageURL();

        // Tips:- one Function Assigned to another
        vm.hamburgerClick = CommonService.hamburgerClick;

        // Time controller
        vm.clock = {time: "", intervalInMs: 1000};

        $interval(function () {
                vm.clock.time = CommonService.getCurrentTime();
            },
            vm.clock.intervalInMs);

        // Location and weather
        CommonService
            .getWeatherDetails()
            .success(function (weather) {
                vm.weather = weather;
            })
            .error(function (err) {
            });

        vm.sensex = {intervalInMs: 4000, stock: {exchange: "", name: "", latestPrice: 0, change: 0}};
        $interval(function () {
            vm.sensex.stock = CommonService.getStockDetails();
        }, vm.sensex.intervalInMs);

        vm.popularStoryTypes = CommonService.getPopularStoryTypes();
        vm.topStoryTypes = CommonService.getTopStoryTypes();
        vm.movieTypes = CommonService.getMovieTypes();
        CommonService.initHamburgerMenu();

        /** Common For All Controllers - End **/

        vm.userId = $routeParams.uid;
        if (!vm.userId) {
            vm.userId = "";
        }

        type = $routeParams.type;
        if (!type) {
            type = vm.topStoryTypes[0].type;
        }

        getTopStories(type);
        return;

        function getTopStories(type) {
            console.log("Top Story Type = " + type);
            HomePageService
                .getTopStories(type)
                .success(function (topStories) {
                    vm.topStories = topStories;
                })
                .error(function (err) {

                });
        };
    }
})();
/* Tips: (function() {})(); without the last () the function is not called hence iffy is useless */
