(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", Service);

    function Service($http) {

        var apis = {
            createWebsite: createWebsite,
            findWebsiteById: findWebsiteById,
            findWebsitesByUser: findWebsitesByUser,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite
        };


        return apis;

        /* Create a new website if one with same name not already created by the same developer, return false otherwise */
        function createWebsite(i_userId, i_website) {
            return $http.post("/api/user/" + i_userId + "/website", i_website);
        }

        /* Return a list of websites created by the userId */
        function findWebsitesByUser(i_userId) {
            return $http.get("/api/user/" + i_userId + "/website");
        }

        /* Return a the website with the given websiteId, else return undefined */
        function findWebsiteById(i_websiteId) {
            return $http.get("/api/website/" + i_websiteId);
        }

        /* If a website found with the given websiteId - replace it, else return false */
        function updateWebsite(i_websiteId, i_website) {
            return $http.put("/api/website/" + i_websiteId, i_website);
        }

        /* If a website found with the given websiteId - delete it, else return false */
        function deleteWebsite(i_websiteId) {

            return $http.delete("/api/website/" + i_websiteId);
        }
    }
})();