/**
 * Created by jai1 on 12/9/2016.
 */
(function () {
    angular
        .module("NewsYouLike")
        .config(Router); // Here we provide the function responsible for routing

    function Router($routeProvider) {
        $routeProvider
            .when("/homepage/:uid?", {
                templateUrl: "views/homepage.view.client.html",
                controller: "HomePageController",
                controllerAs: "model"
            })
            .when("/popular/:type?/:uid?", {
                templateUrl: "views/popular.view.client.html",
                controller: "PopularPageController",
                controllerAs: "model"
            })
            .when("/top/:type?/:uid?", {
                templateUrl: "views/top.view.client.html",
                controller: "TopPageController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "/homepage"
            });
    }
})();