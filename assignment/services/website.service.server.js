module.exports = function (app) {

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
        for (var website in websites) {
            if (websites[website].developerId == i_userId && websites[website].name == i_website.name) {
                res.send(null);
                return;
            }
        }
        // Assuming that we create only one website per second - need to change it
        i_website._id = parseInt(new Date().getTime());
        i_website.developerId = i_userId;
        websites.push(i_website);
        res.send(i_website);
    }

    function findAllWebsitesForUser(req, res) {
        var i_userId = req.params.uid;
        var o_websites = [];
        for (var website in websites) {
            if (websites[website].developerId == i_userId) {
                o_websites.push(websites[website]);
            }
        }
        res.send(o_websites);
    }

    function findWebsiteById(req, res) {
        var i_websiteId = req.params.wid;
        for (var website in websites) {
            if (websites[website]._id == i_websiteId) {
                res.send(websites[website]);
                return;
            }
        }
        res.send(undefined);
    }

    function updateWebsite(req, res) {
        var i_websiteId = req.params.wid;
        var i_website = req.body;
        for (var website in websites) {
            if (websites[website]._id == i_websiteId) {
                i_website._id = websites[website]._id;
                i_website.developerId = websites[website].developerId;
                websites[website] = i_website;
                res.send(website);
                return;
            }
        }
        res.send(undefined);
    }

    function deleteWebsite(req, res) {
        var i_websiteId = req.params.wid;
        for (var website in websites) {
            if (websites[website]._id == i_websiteId) {
                websites.splice(website, 1);
                res.send(true);
                return;
            }
        }
        res.send(false);
    }
};