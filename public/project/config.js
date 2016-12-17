/**
 * Created by jai1 on 12/9/2016.
 */
(function () {
    angular
        .module("NewsYouLike")
        .config(Router); // Here we provide the function responsible for routing

    function Router($routeProvider) {
        $routeProvider
            .when("/homepage", {
                templateUrl: "views/homepage.view.client.html",
                controller: "HomePageController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }

            })
            .when("/popular/:type?", {
                templateUrl: "views/popular.view.client.html",
                controller: "PopularPageController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/top/:type?", {
                templateUrl: "views/top.view.client.html",
                controller: "TopPageController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/profile", {
                templateUrl: "views/profile.view.client.html",
                controller: "ProfilePageController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/search/:type?", {
                templateUrl: "views/search.view.client.html",
                controller: "SearchPageController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/profile/likes", {
                templateUrl: "views/profile.likes.view.client.html",
                controller: "ProfilePageController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/profile/view/:profileUsername", {
                templateUrl: "views/profile.user.view.client.html",
                controller: "ProfilePageController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/user/view/:profileUsername", {
                templateUrl: "views/user.view.client.html",
                controller: "ProfilePageController",
                controllerAs: "model",
                resolve: {
                    setUserIfLoggedIn: setUserIfLoggedIn
                }
            }).when("/profile/community/:type", {
                templateUrl: "views/profile.community.view.client.html",
                controller: "CommunityPageController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
        })
            .otherwise({
                redirectTo: "/homepage"
            });
    }

    function checkLoggedIn(UserService, $q) {
        var deferred = $q.defer();
        console.log("checkLoggedIn called");
        UserService
            .getCurrentUser()
            .then(function (response) {
                console.log("checkLoggedIn response is");
                console.log(response);
                var user = response.data;
                UserService.setCurrentUser(user);
                deferred.resolve();
            });
        return deferred.promise;
    }

    function setUserIfLoggedIn(UserService) {
        console.log("checkLoggedIn called");
        UserService
            .getCurrentUser()
            .then(function (response) {
                console.log("setUserIfLoggedIn response is");
                console.log(response);
                var user = response.data;
                UserService.setCurrentUser(user);
            });
    }
})();