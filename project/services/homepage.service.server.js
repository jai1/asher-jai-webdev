/**
 * Created by jai1 on 12/10/2016.
 */
module.exports = function (app) {
    var request = require('request');

    var API_WUNDERGROUND_CURRENT_KEY = "";
    // TIPS: Done this since we can only call the API 10 times in a min
    var API_WUNDERGROUND_KEY1 = "68ece3a10941a6fa";
    var API_WUNDERGROUND_KEY2 = "d83fd4dfe8c87e40";

    var API_NY_TIMES_KEY = "f079aa2561f6444f8914ab709171fd1a";

    app.get("/api/getTopStories/:type", getTopStories);
    app.get("/api/getWeatherDetails", getWeatherDetails);
    app.get("/api/getMovieReviews/:type", getMovieReviews);
    app.get("/api/getPopularStories/:type", getPopularStories);

    function getPopularStories(req, res) {
        var type = req.params.type;
        // TODO - refactor this
        var APIString = "";
        var result = '';

        request.get({
            url: "https://api.nytimes.com/svc/mostpopular/v2/" + type + "/all-sections/30.json",
            qs: {
                'api-key': API_NY_TIMES_KEY
            },
        }, function (err, response, body) {
            // TODO - error handling
            body = JSON.parse(body);
            console.log(body);
            // console.log(body.results[0]);
            // console.log(body.results[0].multimedia);
            res.send(body);
        });
    }

    function getMovieReviews(req, res) {
        // TODO - refactor this
        var type = req.params.type;
        var APIString = "";
        var result = '';

        request.get({
            url: "https://api.nytimes.com/svc/movies/v2/reviews/" + type + ".json",
            qs: {
                'api-key': API_NY_TIMES_KEY
            },
        }, function (err, response, body) {
            console.log(body);
            // TODO - error handling
            res.send(body);
        });
    }

    function getTopStories(req, res) {
        var type = req.params.type;
        // TODO - refactor this
        var APIString = "";
        var result = '';

        request.get({
            url: "https://api.nytimes.com/svc/topstories/v2/" + type + ".json",
            qs: {
                'api-key': API_NY_TIMES_KEY
            },
        }, function (err, response, body) {
            if (err) {
                res.send(err);
            }
            // TODO - error handling
            body = JSON.parse(body);
            console.log(body);
            // console.log(body.results[0]);
            // console.log(body.results[0].multimedia);
            res.send(body.results);
        });
    }

    function getWeatherDetails(req, res) {
        if (API_WUNDERGROUND_CURRENT_KEY == API_WUNDERGROUND_KEY1) {
            API_WUNDERGROUND_CURRENT_KEY = API_WUNDERGROUND_KEY2;
        } else {
            API_WUNDERGROUND_CURRENT_KEY = API_WUNDERGROUND_KEY1;
        }

        var APIString = "http://api.wunderground.com/api/" + API_WUNDERGROUND_CURRENT_KEY + "/geolookup/q/autoip.json";
        console.log(APIString);
        request.get(APIString, function (err, response, body) {
            // TODO - error handling
            body = JSON.parse(body);
            if (err || body.response.hasOwnProperty("error")) {
                console.log("ERROR OCCURED");
                return getWeatherDetails(req, res);
            }
            console.log(body);
            getWeatherDetailsUsingRequestUrl(body.location.requesturl.replace("\.html", "\.json"), API_WUNDERGROUND_KEY2, res);
        });
    }

    function getWeatherDetailsUsingRequestUrl(requesturl, API_KEY, res) {
        var APIString = "http://api.wunderground.com/api/" + API_KEY + "/conditions/q/" + requesturl;
        console.log(APIString);

        request.get(APIString, function (err, response, body) {
            // TODO - error handling
            body = JSON.parse(body);
            if (err || body.response.hasOwnProperty("error")) {
                console.log("ERROR OCCURED");
                return getWeatherDetailsUsingRequestUrl(requesturl, API_KEY, res);
            }
            console.log(body);
            var weather = {
                city: body.current_observation.display_location.full,
                image: body.current_observation.icon_url,
                degreesFahrenheit: body.current_observation.temp_f,
                feelsLikeDegreesFahrenheit: body.current_observation.feelslike_f
            };
            console.log(weather);
            res.send(weather);
        });
    }
};