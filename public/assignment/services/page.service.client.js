(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", Service);

    function Service($http) {
        var apis = {
            createPage: createPage,
            updatePage: updatePage,
            findPageByWebsiteId: findPagesByWebsiteId,
            findPageById: findPageById,
            deletePage: deletePage
        };

        return apis;

        /* Returns true only if the new page has a unique id and name */
        function createPage(i_websiteId, i_page) {
            return $http.post("/api/website/" + i_websiteId + "/page", i_page);
        }

        /* Returns a list of pages with the given websiteId */
        function findPagesByWebsiteId(i_websiteId) {
            return $http.get("/api/website/" + i_websiteId + "/page");
        }

        /* Return a page with the given id is present */
        function findPageById(i_pageId) {
            return $http.get("/api/page/" + i_pageId);
        }

        /* Find the page using the pageId and replace the page. Return true is action is successful. */
        function updatePage(i_pageId, i_page) {
            return $http.put("/api/page/" + i_pageId, i_page);

        }

        /* Find a page with the given page id and delete it. Returns true if operation is successful. */
        function deletePage(i_pageId) {
            return $http.delete("/api/page/" + i_pageId);
        }
    }
})();