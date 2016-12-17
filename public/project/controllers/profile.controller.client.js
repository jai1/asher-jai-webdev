(function () {
    angular
        .module("NewsYouLike")
        .controller("ProfilePageController", Controller);

    function Controller($interval, $location, $routeParams, $rootScope, UserService, CommonService) {

        console.log($location.path() );
        console.log($rootScope.user);

        profileUsername = "";
        if ($location.path() == "/user/view/"+ $routeParams.profileUsername) {
            profileUsername = $routeParams.profileUsername
        } else {
            if (!$rootScope.user || !$rootScope.user.username) {
                $location.path("#/homepage");
            }
            profileUsername = $rootScope.user.username;
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


        vm.followStatus = "Follow";

        vm.logout = function () {
            UserService.logout();
            delete $rootScope.user;
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

        UserService
            .getUserByUsername(profileUsername)
            .success(function(user) {
                console.log("User is");
                console.log(user);
                if (user) {
                    vm.profileUser = user;
                } else {
                    $location.path("#/homepage");
                }
            })
            .error(function (error) {
                $location.path("#/homepage");
            });

        // Tips when the controller loads the $rootScope.user is empty hence need to call this function later
        $rootScope.populateLikedArticles = function () {
            console.log("Calling Get liked articles");
                CommonService
                    .getlikedArticles(profileUsername)
                    .success(function (likedArticles) {
                        vm.likedArticles = likedArticles;
                    })
                    .error(function (error) {
                        vm.likedArticles = [];
                    });
            if ($rootScope.user && $rootScope.user.username != profileUsername) {
                if ($rootScope.user.following.indexOf(profileUsername) != -1) {
                    vm.followStatus = "Following";
                }
            }
        };
        $rootScope.populateLikedArticles();

        if ($rootScope.user && $rootScope.user.username != profileUsername) {
            if ($rootScope.user.following.indexOf(profileUsername) != -1) {
                vm.followStatus = "Following";
            }
        }

        vm.followUser = function() {
            if (vm.followStatus != "Following") {
                vm.profileUser.followers.push($rootScope.user.username);
                $rootScope.user.following.push(profileUsername);
                UserService.updateUser(vm.profileUser);
                UserService.updateUser($rootScope.user);
            }
            vm.followStatus = "Following"
        };
    }
})();
/* Tips: (function() {})(); without the last () the function is not called hence iffy is useless */
