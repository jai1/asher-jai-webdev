(function () {
    angular
        .module("NewsYouLike")
        .controller("CommunityPageController", Controller);

    function Controller($interval, $location, $routeParams, $rootScope, UserService, CommonService) {
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

        vm.profileUser = {};
        vm.userEmpty = "http://www.praxisemr.com/images/testimonials_images/dr_profile.jpg";




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

        var type = $routeParams.type;

        vm.displayUsers = [];

        vm.logout = function () {
            UserService.logout();
            delete $rootScope.user;
        };

        
        UserService
            .getAllUsers()
            .success(function(users) {
                console.log("Users found");
                console.log(users);
                for(userIndex in users) {
                    user = users[userIndex];
                    if ($rootScope.user.followers.indexOf(user.username) != -1) {
                        user.status = "Follows You";
                    }
                    if ($rootScope.user.following.indexOf(user.username) != -1) {
                        if (user.status == "Follows You") {
                            user.status = "Follow Each other";
                        } else {
                            user.status = "You Follow";
                        }
                    }
                    if (type == "allUsers") {
                        vm.displayUsers.push(user);
                        continue;
                    }
                    if (user.status == "Follows You" && type == "followers") {
                        vm.displayUsers.push(user);
                    }
                    if (user.status == "You Follow" && type == "following") {
                        vm.displayUsers.push(user);
                    }
                }
            }).error(function(err){
                console.log("Error occured");
                console.log(err);
            });
    }
})();
/* Tips: (function() {})(); without the last () the function is not called hence iffy is useless */
