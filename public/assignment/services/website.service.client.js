(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", Service);

    function Service() {

        var apis = {
            createWebsite: createWebsite,
            findWebsiteById: findWebsiteById,
            findWebsitesByUser: findWebsitesByUser,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite
        };

        var websites = [
            {"_id": "123", "name": "Facebook", "developerId": "456", "description": "Lorem"},
            {"_id": "234", "name": "Tweeter", "developerId": "456", "description": "Lorem"},
            {"_id": "456", "name": "Gizmodo", "developerId": "456", "description": "Lorem"},
            {"_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem"},
            {"_id": "678", "name": "Checkers", "developerId": "123", "description": "Lorem"},
            {"_id": "789", "name": "Chess", "developerId": "234", "description": "Lorem"}
        ];

        return apis;

        /* Create a new website if one with same name not already created by the same developer, return false otherwise */
        function createWebsite(i_userId, i_website) {
            for (var website in websites) {
                if (websites[website].developerId == i_userId && websites[website].name == i_website.name) {
                    return false;
                }
            }
            // Assuming that we create only one website per second - need to change it
            i_website._id = parseInt(new Date().getTime());
            i_website.developerId = i_userId;
            websites.push(i_website);
            return true;
        }

        /* Return a list of websites created by the userId */
        function findWebsitesByUser(i_userId) {
            var o_websites = [];
            for (var website in websites) {
                if (websites[website].developerId == i_userId) {
                    o_websites.push(websites[website]);
                }
            }
            return o_websites;
        }

        /* Return a the website with the given websiteId, else return undefined */
        function findWebsiteById(i_websiteId) {
            for (var website in websites) {
                if (websites[website]._id == i_websiteId) {
                    return websites[website];
                }
            }
            return undefined;
        }

        /* If a website found with the given websiteId - replace it, else return false */
        function updateWebsite(i_websiteId, i_website) {
            for (var website in websites) {
                if (websites[website]._id == i_websiteId) {
                    i_website._id = websites[website]._id;
                    i_website.developerId = websites[website].developerId;
                    websites[website] = i_website;
                    return true;
                }
            }
            return false;
        }

        /* If a website found with the given websiteId - delete it, else return false */
        function deleteWebsite(i_websiteId) {
            for (var website in websites) {
                if (websites[website]._id == i_websiteId) {
                    websites.splice(website, 1);
                    return true;
                }
            }
            return false;
        }
    }
})();