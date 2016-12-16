/**
 * Created by jai1 on 12/10/2016.
 */
module.exports = function (app) {
    var model = require("./models/models.server.js")();
    require("./services/homepage.service.server.js")(app, model);
    require("./services/user.service.server.js")(app, model);
    require("./services/search.service.server.js")(app, model);
};