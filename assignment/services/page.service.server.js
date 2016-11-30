module.exports = function (app, model) {
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
        model
            .pageModel
            .createPageForWebsite(i_websiteId, i_page)
            .then(
                function(persistedPage) {
                    res.send(persistedPage);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findPagesByWebsiteId(req, res) {
        var i_websiteId = req.params.wid;
        model
            .pageModel
            .findAllPagesForWebsite(i_websiteId)
            .then(
                function(persistedWebsitePages) {
                    res.send(persistedWebsitePages);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            );

    }

    function findPageById(req, res) {
        var i_pageId = req.params.pid;
        model
            .pageModel
            .findPageById(i_pageId)
            .then(
                function(persistedPage) {
                    res.send(persistedPage);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            );

    }

    function updatePage(req, res) {
        var i_pageId = req.params.pid;
        var i_page = req.body;
        model
            .pageModel
            .updatePage(i_pageId, i_page)
            .then(
                function(persistedPage) {
                    res.send(persistedPage);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            );

    }

    function deletePage(req, res) {
        var i_pageId = req.params.pid;
        model
            .pageModel
            .deletePage(i_pageId)
            .then(
                function(status) {
                    res.send(true);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            );

    }
};