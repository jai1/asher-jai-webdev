/**
 * Created by jai1 on 12/10/2016.
 */
module.exports = function (app) {
    var request = require('request');

    var API_WUNDERGROUND_CURRENT_KEY = ""

    app.get("/api/getTopStories", getTopStories);
    app.get("/api/getWeatherDetails", getWeatherDetails);


    function getTopStories(req, res) {
        // TODO - refactor this
        var API_NY_TIMES = "";
        var APIString = "";
        var result = '';

        request.get({
            url: "https://api.nytimes.com/svc/topstories/v2/home.json",
            qs: {
                'api-key': "f079aa2561f6444f8914ab709171fd1a"
            },
        }, function (err, response, body) {
            // TODO - error handling
            body = JSON.parse(body);
            // console.log(body);
            console.log(body.results[0]);
            console.log(body.results[0].multimedia);
            res.send(body);
        });
    }

    function getWeatherDetails(req, res) {
        // TIPS: Done this since we can only call the API 10 times in a min
        var API_WUNDERGROUND_KEY1 = "68ece3a10941a6fa";
        var API_WUNDERGROUND_KEY2 = "d83fd4dfe8c87e40";

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