module.exports = function (app, model) {

    var websites = [
        {"_id": "123", "name": "Facebook", "developerId": "456", "description": "Lorem"},
        {"_id": "234", "name": "Tweeter", "developerId": "456", "description": "Lorem"},
        {"_id": "456", "name": "Gizmodo", "developerId": "456", "description": "Lorem"},
        {"_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem"},
        {"_id": "678", "name": "Checkers", "developerId": "123", "description": "Lorem"},
        {"_id": "789", "name": "Chess", "developerId": "234", "description": "Lorem"},
        {"_id": "7891", "name": "Chess-1", "developerId": "123", "description": "Lorem"},
        {"_id": "7892", "name": "Chess-2", "developerId": "123", "description": "Lorem"},
        {"_id": "7893", "name": "Chess-3", "developerId": "123", "description": "Lorem"},
        {"_id": "7894", "name": "Chess-4", "developerId": "123", "description": "Lorem"},
        {"_id": "7895", "name": "Chess-5", "developerId": "123", "description": "Lorem"},
        {"_id": "7896", "name": "Chess-6", "developerId": "123", "description": "Lorem"},
        {"_id": "7897", "name": "Chess-7", "developerId": "123", "description": "Lorem"},
        {"_id": "7898", "name": "Chess-8", "developerId": "123", "description": "Lorem"},
        {"_id": "7899", "name": "Chess-9", "developerId": "123", "description": "Lorem"},
        {"_id": "7890", "name": "Chess-10", "developerId": "123", "description": "Lorem"},
        {"_id": "78911", "name": "Chess-11", "developerId": "123", "description": "Lorem"},
        {"_id": "78912", "name": "Chess-12", "developerId": "123", "description": "Lorem"},
        {"_id": "78914", "name": "Chess-13", "developerId": "123", "description": "Lorem"},
        {"_id": "78915", "name": "Chess-14", "developerId": "123", "description": "Lorem"},
        {"_id": "78916", "name": "Chess-15", "developerId": "123", "description": "Lorem"},
        {"_id": "78917", "name": "Chess-16", "developerId": "123", "description": "Lorem"},
        {"_id": "78918", "name": "Chess-17", "developerId": "123", "description": "Lorem"}
    ];


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
                function(persistedWebsite) {
                    res.send(persistedWebsite);
                },
                function(error) {
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
                function(persistedWebsites) {
                    res.send(persistedWebsites);
                },
                function(error) {
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
                function(persistedWebsite) {
                    res.send(persistedWebsite);
                },
                function(error) {
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
                function(persistedWebsite) {
                    res.send(persistedWebsite);
                },
                function(error) {
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
                function(status) {
                    res.send(true);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            );

    }
};