(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", Service);

    function Service() {
        var apis = {
            createPage: createPage,
            updatePage: updatePage,
            findPageByWebsiteId: findPageByWebsiteId,
            findPageById: findPageById,
            deletePage: deletePage
        };

        var pages = [
            {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
            {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
            {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"}
        ];

        return apis;

        /* Returns true only if the new page has a unique id and name */
        function createPage(i_websiteId, i_page) {
            for (var page in pages) {
                if (pages[page].websiteId == i_websiteId && pages[page].name == i_page.name) {
                    return false;
                }
            }

            // Assuming that we get one request per second - need to change this logic, using counters in mongodb
            i_page._id = parseInt(new Date().getTime());
            i_page.websiteId = i_websiteId;
            pages.push(i_page);
            return true;
        }

        /* Returns a list of pages with the given websiteId */
        function findPageByWebsiteId(i_websiteId) {
            var o_pages = [];
            for (var page in pages) {
                if (pages[page].websiteId == i_websiteId) {
                    o_pages.push(pages[page]);
                }
            }
            return o_pages;
        }

        /* Return a page with the given id is present */
        function findPageById(i_pageId) {
            for (var page in pages) {
                if (pages[page]._id == i_pageId) {
                    return pages[page];
                }
            }
            return undefined;
        }

        /* Find the page using the pageId and replace the page. Return true is action is successful. */
        function updatePage(i_pageId, i_page) {
            for (var page in pages) {
                if (pages[page]._id == i_pageId) {
                    i_page._id = pages[page]._id;
                    i_page.websiteId = pages[page].websiteId;
                    pages[page] = i_page;
                    return true;
                }
            }
            return false;
        }

        /* Find a page with the given page id and delete it. Returns true if operation is successful. */
        function deletePage(i_pageId) {
            for (var page in pages) {
                if (pages[page]._id == i_pageId) {
                    pages.splice(page, 1); // Remove the page from the array
                    return true;
                }
            }
            return false;
        }
    }
})();