(function () {
    angular
        .module("NewsYouLike")
        .controller("ProfilePageController", Controller);

    function Controller($interval, $location, $routeParams, $rootScope, UserService, CommonService) {

        console.log("WTF");
        console.log($rootScope.user);

        if (!$rootScope.user || !$rootScope.user.username) {
            $location.path("#/homepage");
        }

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
        CommonService.initHamburgerMenu();

        /** Common For All Controllers - End **/

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
        };

        vm.likedArticles = [];

        // Tips when the controller loads the $rootScope.user is empty hence need to call this function later
        $rootScope.populateLikedArticles = function () {
            if ($rootScope.user) {
                console.log("Calling Get liked articles");
                CommonService
                    .getlikedArticles($rootScope.user.username)
                    .success(function (likedArticles) {
                        vm.likedArticles = likedArticles;
                    })
                    .error(function (error) {
                        vm.likedArticles = [];
                    });
            }
        };
        $rootScope.populateLikedArticles();

    }
})();
/* Tips: (function() {})(); without the last () the function is not called hence iffy is useless */
