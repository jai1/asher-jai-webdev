/**
 * Created by jai1 on 12/10/2016.
 */
(function () {
    angular
        .module("NewsYouLike")
        .factory("SearchPageService", Service);

    function Service($http) {
        var apis = {
            getSearchedArticles: getSearchedArticles,
            updateArticle: updateArticle,
            getlikedArticles: getlikedArticles
        };
        return apis;

        function getlikedArticles(username) {
            console.log("Service Client - Calling Get liked articles");
            return $http.get("/api/likedArticles/"+ username + "/");
        }

        function updateArticle(article) {
            console.log("reached HomePageService.updateArticle Services");
            return $http.put("/api/likedArticles/", article);
        }

        function getSearchedArticles(type, queryString) {
            return $http.get("/api/searchArticle/"+ type + "?q=" + queryString);
        }
    }
})();