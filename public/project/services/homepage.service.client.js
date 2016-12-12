/**
 * Created by jai1 on 12/10/2016.
 */
(function () {
    angular
        .module("NewsYouLike")
        .factory("HomePageService", Service);

    function Service($http) {
        var apis = {
            getTopStories: getTopStories,
            getWeatherDetails: getWeatherDetails
        };
        return apis;

        function getTopStories() {
            console.log("reached HomePageService.getTopStories Services");
            return $http.get("/api/getTopStories");
        }

        function getWeatherDetails() {
            console.log("reached HomePageService.getWeatherDetails Services");
            return $http.get("/api/getWeatherDetails");
        }
    }
})();