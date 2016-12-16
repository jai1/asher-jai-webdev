/**
 * Created by jai1 on 12/10/2016.
 */
module.exports = function (app, model) {
    var request = require('request');
    var API_NY_TIMES_KEY = "f079aa2561f6444f8914ab709171fd1a";

    app.get("/api/searchArticle/:type?", getSearchArticles);

    function getSearchArticles(req, res) {
        // TODO - refactor this
        var type = req.params.type;
        var queryParams = req.query.q;

        var qs = {'api-key': API_NY_TIMES_KEY};

        if (type) {
            qs.fq = "news_desk:(\"" + type + "\")";
        }

        if (queryParams && queryParams != "\'\'" ) {
            qs.q = queryParams;
        }

        console.log("SearchService.searchArticle called with qs=");
        console.log(qs);
        request.get({
            url: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
            'qs': qs
        }, function (err, response, body) {
            // TODO - error handling
            body = JSON.parse(body);
            console.dir(body,  { depth: null });
            res.send(body.response);
        });
    }
};