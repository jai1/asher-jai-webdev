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
            getMovieReviews: getMovieReviews,
            getPopularStories: getPopularStories,
            getMoreArticles: getMoreArticles
        };
        return apis;

        function getTopStories(type) {
            console.log("reached HomePageService.getTopStories Services");
            return $http.get("/api/topStories/" + type);
        }

        function getMovieReviews(type) {
            console.log("Service Called HomePageService.getMovieReviews with type = " + type);
            return $http.get("/api/movieReviews/" + type);
        }

        function getPopularStories(type) {
            console.log("Service Called HomePageService.getPopularStories with type = " + type);
            return $http.get("/api/popularStories/" + type);
        }

        function getMoreArticles(year, month) {
            console.log("Service Called HomePageService.getMoreArticles with month = " + month + ' and year=' + year);
            return $http.get("/api/articles/" + year + "/" + month);
        }
    }
})();