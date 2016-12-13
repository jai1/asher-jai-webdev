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
            getWeatherDetails: getWeatherDetails,
            getMovieReviews: getMovieReviews,
            getPopularStories: getPopularStories
        };
        return apis;


        function getWeatherDetails() {
            console.log("reached HomePageService.getWeatherDetails Services");
            return $http.get("/api/getWeatherDetails");
        }

        function getTopStories(type) {
            console.log("reached HomePageService.getTopStories Services");
            return $http.get("/api/getTopStories/" + type);
        }

        function getMovieReviews(type) {
            console.log("Service Called HomePageService.getMovieReviews with type = " + type);
            return $http.get("/api/getMovieReviews/" + type);
        }

        function getPopularStories(type) {
            console.log("Service Called HomePageService.getPopularStories with type = " + type);
            return $http.get("/api/getPopularStories/" + type);
        }
    }
})();