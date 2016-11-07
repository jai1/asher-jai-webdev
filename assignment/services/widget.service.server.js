module.exports = function (app) {
    var multer = require('multer');
    var upload = multer({dest: __dirname + '/../../public/assignment/uploads'});

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


    app.post("/api/page/:pid/widget", createWidget);
    app.get("/api/page/:pid/widget", findAllWidgetsForPage);
    app.get("/api/widget/:wgid", findWidgetById);
    app.put("/api/widget/:wgid", updateWidget);
    app.delete("/api/widget/:wgid", deleteWidget);
    app.post("/api/upload", upload.single('myFile'), uploadImage);
    app.put("/page/:pid/widget", sortWidgets);

    function createWidget(req, res) {
        var i_pageId = req.params.pid;
        var i_widget = req.body;
        i_widget._id = new Date().getTime();
        i_widget.pageId = i_pageId;
        i_widget.order = getLastWidgetOrder(i_pageId) + 1;
        for (var widget in widgets) {
            if (widgets[widget]._id == i_widget._id && widgets[widget].pageId == i_pageId) {
                res.send(null);
                return;
            }
        }
        widgets.push(i_widget);
        res.send(i_widget);
    }

    function findAllWidgetsForPage(req, res) {
        var i_pageId = req.params.pid;
        var o_widgets = [];
        for (var widget in widgets) {
            if (widgets[widget].pageId == i_pageId) {
                o_widgets.push(widgets[widget]);
            }
        }
        o_widgets.sort(function (a, b) {
            return a.order > b.order;
        });
        res.send(o_widgets);
    }

    function findWidgetById(req, res) {
        var i_widgetId = req.params.wgid;
        res.send(getWidgetById(i_widgetId));
    }

    function updateWidget(req, res) {
        var i_widgetId = req.params.wgid;
        var i_widget = req.body;
        res.send(updateWidgetById(i_widgetId, i_widget));
    }

    function deleteWidget(req, res) {
        var i_widgetId = req.params.wgid;
        for (var widget in widgets) {
            if (widgets[widget]._id == i_widgetId) {
                // Remove widget from array
                widgets.splice(widget, 1);
                res.send(true);
                return;
            }
        }
        res.send(false);
    }

    function uploadImage(req, res) {
        var i_widgetId = req.body.widgetId;
        var i_userId = req.body.userId;
        var i_websiteId = req.body.websiteId;
        var i_pageId = req.body.pageId;
        var i_widget = getWidgetById(i_widgetId);

        // getting the widget's attributes
        var i_width = req.body.width;
        var i_name = req.body.name;
        var i_text = req.body.text;

        var metadata = {
            originalname: req.file.originalname, // file i_name on user's computer
            filename: req.file.filename,     // new file i_name in upload folder
            fullPath: req.file.path,         // full path of uploaded file
            size: req.file.size,
            mimeType: req.file.mimetype
        };

        i_widget.url = "uploads/" + metadata.filename;

        i_widget.width = i_width;
        i_widget.name = i_name;
        i_widget.text = i_text;
        i_widget.metadata = metadata;
        i_widget = updateWidgetById(i_widgetId, i_widget);

        if (i_widget) {
            res.redirect("/assignment/index.html#/user/" + i_userId + "/website/" + i_websiteId + "/page/" + i_pageId + "/widget/" + i_widgetId);
        } else {
            res.redirect("back");
        }
    }

    function getWidgetById(widgetId) {
        for (var widget in widgets) {
            if (widgets[widget]._id == widgetId) {
                return widgets[widget];
            }
        }
        return undefined;
    }

    function updateWidgetById(i_widgetId, i_widget) {
        for (var widget in widgets) {
            if (widgets[widget]._id == i_widgetId) {
                i_widget._id = widgets[widget]._id;
                i_widget.pageId = widgets[widget].pageId;
                widgets[widget] = i_widget;
                return widget;
            }
        }
        return null;
    }

    function sortWidgets(req, res) {
        var pid = req.params.pid;
        var initial = req.query.initial;
        var final = req.query.final;
        if (initial == final) {
            res.sendStatus(200);
            return;
        }
        var movedWidget = null;

        for (var widget in widgets) {
            if (widgets[widget].pageId == pid) {
                //if widget was moved down
                if (initial < final) {
                    if (widgets[widget].order == initial) {
                        movedWidget = widget;
                    } else if (widgets[widget].order > initial && widgets[widget].order <= final) {
                        widgets[widget].order -= 1;
                    }
                }
                //if widget was moved up
                else {
                    if (widgets[widget].order == initial) {
                        movedWidget = widget;
                    } else if (widgets[widget].order < initial && widgets[widget].order >= final) {
                        widgets[widget].order += 1;
                    }
                }
            }
        }
        if (movedWidget) {
            widgets[movedWidget].order = final;
        }
        res.sendStatus(200);
    }

    function getLastWidgetOrder(pageId) {
        var lastOrder = -1;
        for (var widget in widgets) {
            if (widgets[widget].pageId = pageId && widgets[widget].order > lastOrder) {
                lastOrder = widgets[widget].order;
            }
        }
        return lastOrder;
    }
};