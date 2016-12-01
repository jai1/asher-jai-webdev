module.exports = function (app, model) {
    app.post("/api/user/:uid/website", createWebsite);
    app.get("/api/user/:uid/website", findAllWebsitesForUser);
    app.get("/api/website/:wid", findWebsiteById);
    app.put("/api/website/:wid", updateWebsite);
    app.delete("/api/website/:wid", deleteWebsite);

    function createWebsite(req, res) {
        var i_userId = req.params.uid;
        var i_website = req.body;
        model
            .websiteModel
            .createWebsiteForUser(i_userId, i_website)
            .then(
                function (persistedWebsite) {
                    res.send(persistedWebsite);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );

    }

    function findAllWebsitesForUser(req, res) {
        var i_userId = req.params.uid;
        model
            .websiteModel
            .findAllWebsitesForUser(i_userId)
            .then(
                function (persistedWebsites) {
                    res.send(persistedWebsites);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );

    }

    function findWebsiteById(req, res) {
        var i_websiteId = req.params.wid;
        model
            .websiteModel
            .findWebsiteById(i_websiteId)
            .then(
                function (persistedWebsite) {
                    res.send(persistedWebsite);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );

    }

    function updateWebsite(req, res) {
        var i_websiteId = req.params.wid;
        var i_website = req.body;
        model
            .websiteModel
            .updateWebsite(i_websiteId, i_website)
            .then(
                function (persistedWebsite) {
                    res.send(persistedWebsite);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );

    }

    function deleteWebsite(req, res) {
        var i_websiteId = req.params.wid;
        model
            .websiteModel
            .deleteWebsite(i_websiteId)
            .then(
                function (status) {
                    res.send(true);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );

    }
};