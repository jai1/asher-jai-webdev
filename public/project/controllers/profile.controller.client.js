(function () {
    angular
        .module("NewsYouLike")
        .controller("ProfilePageController", Controller);

    function Controller($interval, $routeParams, $rootScope, UserService, CommonService) {

        /** Common For All Controllers - Start **/
        var vm = this;

        // TODO - remove this default rating
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
        /** Common For All Controllers - End **/

        delete $rootScope.user;
        vm.logout = function () {
            delete $rootScope.user;
            UserService.logout();
        };


        vm.update = function () {
            user = $rootScope.user;
            UserService
                .updateUser(user)
                .then(function (response) {
                    if (response.data) {
                        $rootScope.user = response.data;
                        alert("Profile updated successfully!");
                    }
                    else {
                        alert("Error updating user information!")
                    }
                });
        }
    }
})();
/* Tips: (function() {})(); without the last () the function is not called hence iffy is useless */
