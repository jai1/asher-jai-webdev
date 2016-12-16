/**
 * Created by jai1 on 12/10/2016.
 */
module.exports = function (app, model) {
    var request = require('request');

    var API_WUNDERGROUND_CURRENT_KEY = "";
    // TIPS: Done this since we can only call the API 10 times in a min
    var API_WUNDERGROUND_KEY1 = "68ece3a10941a6fa";
    var API_WUNDERGROUND_KEY2 = "d83fd4dfe8c87e40";

    var API_NY_TIMES_KEY = "f079aa2561f6444f8914ab709171fd1a";

    app.get("/api/topStories/:type", getTopStories);
    app.get("/api/weatherDetails", getWeatherDetails);
    app.get("/api/movieReviews/:type", getMovieReviews);
    app.get("/api/popularStories/:type", getPopularStories);
    app.get("/api/articles/:year/:month", getMoreArticles);
    app.put("/api/articles/", updateArticles);
    app.get("/api/likedArticles/:username", getLikedArticles);

    function getLikedArticles(req, res) {
        console.log("Get liked articles called");
        model
            .articleModel
            .findArticlesForUser(req.params.username)
            .then(function(likedArticles) {
                console.log("Articles for user " + req.params.username);
                console.log(likedArticles);
                res.send(likedArticles);
            }, function (error) {res.sendStatus(400);});
    }

    function updateArticles(req, res) {
        var i_article = req.body;
        console.log("Home page Service - updateArticle called");
        console.log(i_article);
        model
            .articleModel
            .findArticleByTitle(i_article.headline.main)
            .then(
                function (article) {
                    console.log("findArticleByTitle returned");
                    console.log(article);
                    if (article) {
                        console.log("Article found - updating it");
                        var indexOfUser = article.likedBy.indexOf(i_article.username);
                        if (i_article.like) {
                            if (indexOfUser == -1) {
                                article.likedBy.push(i_article.username);
                            }
                        } else {
                            if (indexOfUser != -1) {
                                article.likedBy.splice(indexOfUser, 1);
                            }
                        }
                        model.articleModel
                            .updateArticle(article).then(function(article) {
                                console.log("Updated Article");
                                console.log(article);
                                res.send(200);
                            }, function(error) {res.sendStatus(400)});
                    } else {
                        if (i_article.like) {

                            var article = {
                                title: i_article.headline.main,
                                abstract: i_article.snippet,
                                // Username
                                likedBy: [i_article.username],
                                publishDate: i_article.pub_date};

                            if (i_article.multimedia.length >= 2) {
                                article.imgUrl = i_article.multimedia[1].url;
                            }

                            console.log("Article to be created is ");
                            console.log(article);
                            model.articleModel
                                .createArticle(article).then(function(article) {
                                    console.log("Created Article");
                                    console.log(article);
                                    res.send(200);
                                }, function(error) {
                                    console.log("Error occured");
                                    console.log(error);
                                    res.sendStatus(400)
                                });
                        }
                    }
                },
                function (error) {
                    res.sendStatus(400);
                }
        );
    }
    function getPopularStories(req, res) {
        var type = req.params.type;
        console.log("getPopularStories called with type = ", type);
        request.get({
            url: "https://api.nytimes.com/svc/mostpopular/v2/" + type + "/all-sections/30.json",
            qs: {
                'api-key': API_NY_TIMES_KEY
            },
        }, function (err, response, body) {
            // TODO - error handling
            try {
                body = JSON.parse(body);
            } catch (err) {
                console.log("Error Occured:");
                console.log("body");
                res.sendStatus(400);
            }
            // console.log(body);
            // console.log(body.results[0]);
            console.dir(body.results, {depth: null});
            res.send(body.results);
        });
    }

    function getMovieReviews(req, res) {
        var type = req.params.type;

        request.get({
            url: "https://api.nytimes.com/svc/movies/v2/reviews/" + type + ".json",
            qs: {
                'api-key': API_NY_TIMES_KEY
            },
        }, function (err, response, body) {
            console.log(body);
            // TODO - error handling
            res.send(body.results);
        });
    }

    function getTopStories(req, res) {
        var type = req.params.type;
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
            // console.log(body);
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
            // console.log(body);
            var weather = {
                city: body.current_observation.display_location.full,
                image: body.current_observation.icon_url,
                degreesFahrenheit: body.current_observation.temp_f,
                feelsLikeDegreesFahrenheit: body.current_observation.feelslike_f
            };
            // console.log(weather);
            res.send(weather);
        });
    }

    function getMoreArticles(req, res) {
        // TODO - refactor this
        var month = req.params.month;
        var year = req.params.year;
        console.log("HomepageService.getMoreArticles called with month=" + month + ", year=" + year);
        request.get({
            url: "https://api.nytimes.com/svc/archive/v1/" + year + "/" + month + ".json",
            qs: {
                'api-key': API_NY_TIMES_KEY
            },
        }, function (err, response, body) {
            // TODO - error handling
            body = JSON.parse(body);
            // console.dir(body,  { depth: null });
            res.send(body.response);
        });
    }
};