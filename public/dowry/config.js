/**
 * Created by jai1 on 3/4/2017.
 */
(function () {
    angular
        .module("DowryCalculator")
        .config(Router); // Here we provide the function responsible for routing

    function Router($routeProvider) {
        $routeProvider
            .when("/homepage", {
                templateUrl: "views/homepage.view.client.html"
            }).when("/female", {
                templateUrl: "views/female.view.client.html",
                controller: "FemalePageController",
                controllerAs: "model"
            }).when("/zero", {
                templateUrl: "views/zero.view.client.html"
            })
            .otherwise({
                redirectTo: "/homepage"
            });
    }
})();
