module.exports = function (app) {
    var pages = [
        {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
        {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
        {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"},
        {"_id": "1", "name": "Post 1", "websiteId": "567", "description": "Lorem"},
        {"_id": "2", "name": "Post 2", "websiteId": "567", "description": "Lorem"},
        {"_id": "3", "name": "Post 3", "websiteId": "567", "description": "Lorem"},
        {"_id": "4", "name": "Post 4", "websiteId": "567", "description": "Lorem"},
        {"_id": "5", "name": "Post 5", "websiteId": "567", "description": "Lorem"},
        {"_id": "6", "name": "Post 6", "websiteId": "567", "description": "Lorem"},
        {"_id": "7", "name": "Post 7", "websiteId": "567", "description": "Lorem"},
        {"_id": "8", "name": "Post 8", "websiteId": "567", "description": "Lorem"},
        {"_id": "9", "name": "Post 9", "websiteId": "567", "description": "Lorem"},
        {"_id": "10", "name": "Post 10", "websiteId": "567", "description": "Lorem"},
        {"_id": "12", "name": "Post 11", "websiteId": "567", "description": "Lorem"},
        {"_id": "13", "name": "Post 12", "websiteId": "567", "description": "Lorem"}
    ];


    app.post("/api/website/:wid/page", createPage);
    app.get("/api/website/:wid/page", findPagesByWebsiteId);
    app.get("/api/page/:pid", findPageById);
    app.put("/api/page/:pid", updatePage);
    app.delete("/api/page/:pid", deletePage);

    function createPage(req, res) {
        var i_websiteId = req.params.wid;
        var i_page = req.body;
        for (var page in pages) {
            if (pages[page].websiteId == i_websiteId && pages[page].name == i_page.name) {
                res.send(null);
                return;
            }
        }
        i_page._id = new Date().getTime().toString();
        i_page.websiteId = i_websiteId;
        pages.push(i_page);
        res.send(i_page);
    }

    function findPagesByWebsiteId(req, res) {
        var i_websiteId = req.params.wid;
        var o_pages = [];
        for (var page in pages) {
            if (pages[page].websiteId == i_websiteId) {
                o_pages.push(pages[page]);
            }
        }
        res.send(o_pages);
    }

    function findPageById(req, res) {
        var i_pageId = req.params.pid;
        for (var page in pages) {
            if (pages[page]._id == i_pageId) {
                res.send(pages[page]);
                return;
            }
        }
        res.send(undefined);
    }

    function updatePage(req, res) {
        var i_pageId = req.params.pid;
        var i_page = req.body;
        for (var page in pages) {
            if (pages[page]._id == i_pageId) {
                i_page._id = pages[page]._id;
                i_page.websiteId = pages[page].websiteId;
                pages[page] = i_page;
                res.send(i_page);
                return;
            }
        }
        res.send(null);
    }

    function deletePage(req, res) {
        var i_pageId = req.params.pid;
        for (var page in pages) {
            if (pages[page]._id == i_pageId) {
                pages.splice(page, 1); // Remove the page from the array
                res.send(true);
                return;
            }
        }
        res.send(false);
    }
};