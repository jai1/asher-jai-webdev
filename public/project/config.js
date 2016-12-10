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
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "/homepage"
            });
    }
})();