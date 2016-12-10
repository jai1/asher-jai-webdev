/**
 * Created by jai1 on 12/10/2016.
 */
module.exports = function (app) {
    var request = require('request');
    var API_NY_TIMES="";

    app.get("/api/getTopStories", getTopStories);

    function getTopStories(req, res) {
        apiString = "";
        var result = '';

        request.get({
            url: "https://api.nytimes.com/svc/topstories/v2/home.json",
            qs: {
                'api-key': "f079aa2561f6444f8914ab709171fd1a"
            },
        }, function(err, response, body) {
            body = JSON.parse(body);
            // console.log(body);
            console.log(body.results[0]);
            console.log(body.results[0].multimedia);
            res.send(body);
        });
}};