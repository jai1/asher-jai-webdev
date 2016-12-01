module.exports = function () {

    var mongoose = require("mongoose");
    var connectionString = 'mongodb://127.0.0.1:27017/wam-fall-2016';
    //for production: mongodb://<dbuser>:<dbpassword>@ds035796.mlab.com:35796/web-dev
    if (process.env.MLAB_PASSWORD) {
        console.log("Connecting to production mongo...");
        connectionString = 'mongodb://' +
            process.env.MLAB_USERNAME + ':' +
            process.env.MLAB_PASSWORD +
            '@ds035796.mlab.com:35796/web-dev';
    }
    else {
        console.log("Connecting to local mongo...");
    }
    mongoose.createConnection(connectionString);

    var userModel = require("./user/user.model.server")();
    var websiteModel = require("./website/website.model.server")();
    var pageModel = require("./page/page.model.server")();
    var widgetModel = require("./widget/widget.model.server")();
    var model = {
        userModel: userModel,
        websiteModel: websiteModel,
        pageModel: pageModel,
        widgetModel: widgetModel
    };

    userModel.setModel(model);
    websiteModel.setModel(model);
    pageModel.setModel(model);
    widgetModel.setModel(model);

    init();

    return model;

    // Function to preload some data into the DB
    function init() {
        userInit();

    }

    function userInit() {
        return userModel.count().then(function (cnt) {
            if (cnt != 0) {
                // DB already initialized
                return;
            }
            var users = [
                {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
                {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
                {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
                {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
            ];
            for (user in users) {
                var _id = users[user]._id;
                delete users[user]._id;
                (function (id) {
                    userModel.createUser(users[user])
                        .then(
                            function (persistedUser) {
                                console.log(persistedUser);
                                websiteInit(id, persistedUser._id);
                            },
                            function (error) {
                                console.error(error);
                            }
                        );
                })(_id);
            }
        });
    }

    function websiteInit(id, userId) {
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

        for (website in websites) {
            if (websites[website].developerId == id) {
                var _id = websites[website]._id;
                delete websites[website]._id;
                delete websites[website].developerId;
                (function (id) {
                    websiteModel.createWebsiteForUser(userId, websites[website])
                        .then(
                            function (persistedWebsite) {
                                console.log(persistedWebsite);
                                pageInit(id, persistedWebsite._id);
                            },
                            function (error) {
                                console.error(error);
                            });
                })(_id);
            }
        }
    }

    function pageInit(id, websiteId) {
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

        for (page in pages) {
            if (pages[page].websiteId == id) {
                var _id = pages[page]._id;
                delete pages[page]._id;
                delete pages[page].websiteId;
                // Problem with promises:-
                //
                (function (id) {
                    pageModel.createPageForWebsite(websiteId, pages[page])
                        .then(function (persistedPage) {
                            console.log(persistedPage);
                            widgetInit(id, persistedPage._id);
                        }, function (error) {
                            console.error(error);
                        });
                })(_id);
            }
        }
    }

    function widgetInit(id, pageId) {
        var widgets = [
            {"_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO", "order": 0},
            {"_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum", "order": 1},
            {
                "_id": "345",
                "widgetType": "IMAGE",
                "pageId": "321",
                "width": "100%",
                "url": "http://lorempixel.com/400/200/",
                "order": 2
            },
            {"_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>", "order": 3},
            {"_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum", "order": 4},
            {
                "_id": "678",
                "widgetType": "YOUTUBE",
                "pageId": "321",
                "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E",
                "order": 5
            },
            {
                "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum" +
            "\n" +
            "\n" +
            "</p>", "order": 6
            },
            {"_id": "123", "widgetType": "HEADER", "pageId": "1", "size": 2, "text": "GIZMODO", "order": 7},
            {"_id": "234", "widgetType": "HEADER", "pageId": "1", "size": 4, "text": "Lorem ipsum", "order": 8},
            {
                "_id": "345",
                "widgetType": "IMAGE",
                "pageId": "1",
                "width": "100%",
                "url": "http://lorempixel.com/400/200/",
                "order": 9
            },
            {"_id": "456", "widgetType": "HTML", "pageId": "1", "text": "<p>Lorem ipsum</p>", "order": 10},
            {"_id": "567", "widgetType": "HEADER", "pageId": "1", "size": 4, "text": "Lorem ipsum", "order": 11},
            {
                "_id": "678",
                "widgetType": "YOUTUBE",
                "pageId": "1",
                "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E",
                "order": 12
            },
            {
                "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum" +
            "\n" +
            "\n" +
            "</p>", "order": 13
            }
        ];

        for (widget in widgets) {
            if (id == widgets[widget].pageId) {
                delete widgets[widget]._id;
                delete widgets[widget].pageId;
                widgetModel.createWidget(pageId, widgets[widget])
                    .then(function (persistedWidget) {
                        console.log(persistedWidget);
                    }, function (error) {
                        console.error(error);
                    });
            }
        }
    }
};