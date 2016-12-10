/**
 * Created by jai1 on 12/10/2016.
 */
(function () {
    angular
        .module("NewsYouLike")
        .factory("HomePageService", Service);

    function Service($http) {
        var apis = {
            getTopStories: getTopStories
        };
        return apis;

        function getTopStories() {
            console.log("reached Services");
            return $http.get("/api/getTopStories");
        }
    }
})();