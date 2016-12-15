/**
 * Created by jai1 on 12/14/2016.
 */
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

    // TODO - check why .connect is not working
    mongoose.createConnection(connectionString);

    var userModel = require("./user.model.server")();
    var articleModel = require("./article.model.server")();
    var model = {
        userModel: userModel,
        articleModel: articleModel
    };

    userModel.setModel(model);
    articleModel.setModel(model);
    return model;
};