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
                    getLoggedIn: getLoggedIn
                }

            })
            .when("/popular/:type?", {
                templateUrl: "views/popular.view.client.html",
                controller: "PopularPageController",
                controllerAs: "model",
                resolve: {
                    getLoggedIn: getLoggedIn
                }
            })
            .when("/top/:type?", {
                templateUrl: "views/top.view.client.html",
                controller: "TopPageController",
                controllerAs: "model",
                resolve: {
                    getLoggedIn: getLoggedIn
                }
            })
            .when("/profile", {
                templateUrl: "views/profile.view.client.html",
                controller: "ProfilePageController",
                controllerAs: "model",
                resolve: {
                    getLoggedIn: getLoggedIn
                }
            })
            .when("/search/:type?", {
                templateUrl: "views/search.view.client.html",
                controller: "SearchPageController",
                controllerAs: "model",
                resolve: {
                    getLoggedIn: getLoggedIn
                }
            })
            .when("/profile/likes", {
                templateUrl: "views/profile.likes.view.client.html",
                controller: "ProfilePageController",
                controllerAs: "model",
                resolve: {
                    getLoggedIn: getLoggedIn
                }
            })
            .when("/profile/view/:profileUsername", {
                templateUrl: "views/profile.user.view.client.html",
                controller: "ProfilePageController",
                controllerAs: "model",
                resolve: {
                    getLoggedIn: getLoggedIn
                }
            })
            .when("/user/view/:profileUsername", {
                templateUrl: "views/user.view.client.html",
                controller: "ProfilePageController",
                controllerAs: "model",
                resolve: {
                    setUser: setUser
                }
        })
            .otherwise({
                redirectTo: "/homepage"
            });
    }

    function getLoggedIn(UserService, $q) {
        var deferred = $q.defer();
        console.log("getLoggedIn called");
        UserService
            .getCurrentUser()
            .then(function (response) {
                console.log("getLoggedIn response is");
                console.log(response);
                var user = response.data;
                UserService.setCurrentUser(user);
                deferred.resolve();
            });
        return deferred.promise;
    }

    function setUser(UserService) {
        console.log("getLoggedIn called");
        UserService
            .getCurrentUser()
            .then(function (response) {
                console.log("setUser response is");
                console.log(response);
                var user = response.data;
                UserService.setCurrentUser(user);
            });
    }
})();