module.exports = function (app, model) {
    var multer = require('multer');
    var upload = multer({dest: __dirname + '/../../public/assignment/uploads'});
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
        model
            .widgetModel
            .createWidget(i_pageId, i_widget)
            .then(
                function(persistedWidget) {
                    res.send(persistedWidget);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            );

    }

    function findAllWidgetsForPage(req, res) {
        var i_pageId = req.params.pid;
        model
            .pageModel
            .findWidgetsForPage(i_pageId)
            .then(
                function(persistedWidgets) {
                    res.send(persistedWidgets.widgets);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            );

    }

    function findWidgetById(req, res) {
        var i_widgetId = req.params.wgid;
        model
            .widgetModel
            .findWidgetById(i_widgetId)
            .then(
                function(persistedWidgets) {
                    res.send(persistedWidgets);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function updateWidget(req, res) {
        var i_widgetId = req.params.wgid;
        var i_widget = req.body;
        model
            .widgetModel
            .updateWidget(i_widgetId, i_widget)
            .then(
                function(persistedWidgets) {
                    res.send(persistedWidgets);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function deleteWidget(req, res) {
        var i_widgetId = req.params.wgid;
        model
            .widgetModel
            .deleteWidget(i_widgetId)
            .then(
                function(status) {
                    res.send(true);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            );

    }

    function uploadImage(req, res) {
        var i_widgetId      = req.body.widgetId;
        var i_userId        = req.body.userId;
        var i_websiteId     = req.body.websiteId;
        var i_pageId        = req.body.pageId;
        model
            .widgetModel
            .findWidgetById(i_widgetId)
            .then(function(widget) {
                var width         = req.body.width;
                var name          = req.body.name;
                var text          = req.body.text;
                var metadata = {
                    originalname    : req.file.originalname, // file name on user's computer
                    filename        : req.file.filename,     // new file name in upload folder
                    fullPath        : req.file.path,         // full path of uploaded file
                    size            : req.file.size,
                    mimeType        : req.file.mimetype
                };

                widget.url = "uploads/"+metadata.filename;
                widget.width = width;
                widget.name = name;
                widget.text = text;
                widget.metadata = metadata;
                model
                    .widgetModel
                    .updateWidget(i_widgetId, widget)
                    .then(
                        function(status) {
                            //console.log(status.toString());
                            if(status.ok==1)
                                res.redirect("/assignment/index.html#/user/"+i_userId+"/website/"+i_websiteId+"/page/"+i_pageId+"/widget/"+i_widgetId);
                            else res.redirect("back");
                        },
                        function(error) {
                            res.sendStatus(400).send(error);
                        }
                    );
            });
    }


    function sortWidgets(req, res) {
        var i_pid = req.params.pid;
        var initial = req.query.initial;
        var final = req.query.final;
        if (initial == final) {
            res.sendStatus(200);
            return;
        }
            model
                .pageModel
                .reorderWidgetsForPage(i_pid, initial, final)
                .then(
                    function(page) {
                        res.sendStatus(200).redirect('back');
                    },
                    function(error) {
                        res.sendStatus(400).send(error);
                    }
                );
    }
};