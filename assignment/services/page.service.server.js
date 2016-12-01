module.exports = function (app, model) {
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