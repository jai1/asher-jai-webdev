/**
 * Created by jai1 on 12/9/2016.
 */
(function () {
    angular
        .module("NewsYouLike")
        .controller("SearchPageController", Controller);

    function Controller($interval, $routeParams, $rootScope, SearchPageService, CommonService ) {

        /** Common For All Controllers - Start **/
        var vm = this;

        // Default Ratings - to be removed
        vm.rate = 2;
        // Used to show empty image if image not present
        vm.empty = CommonService.getEmptyImageURL();

        // Tips:- one Function Assigned to another
        vm.hamburgerClick = CommonService.hamburgerClick;

        // Time controller
        vm.clock = {time: "", intervalInMs: 1000};

        $interval(function () {
                vm.clock.time = CommonService.getCurrentTime();
            },
            vm.clock.intervalInMs);

        // Location and weather
        CommonService
            .getWeatherDetails()
            .success(function (weather) {
                vm.weather = weather;
            })
            .error(function (err) {
            });

        vm.sensex = {intervalInMs: 4000, stock: {exchange: "", name: "", latestPrice: 0, change: 0}};
        $interval(function () {
            vm.sensex.stock = CommonService.getStockDetails();
        }, vm.sensex.intervalInMs);

        vm.popularStoryTypes = CommonService.getPopularStoryTypes();
        vm.topStoryTypes = CommonService.getTopStoryTypes();
        vm.movieTypes = CommonService.getMovieTypes();
        /** Common For All Controllers - End **/

        type = $routeParams.type;
        if (!type) {
            type = '';
        }

        vm.likedArticlesTitle = [];

        console.log("$rootScope.user is");
        console.log($rootScope.user);

        // Tips when the controller loads the $rootScope.user is empty hence need to call this function later
        $rootScope.populateLikedArticles = function(){
            if ($rootScope.user) {
                console.log("Calling Get liked articles");
                CommonService
                    .getlikedArticles($rootScope.user.username)
                    .success(function (likedArticles) {
                        vm.likedArticlesTitle = [];
                        for (articleIndex in likedArticles) {
                            vm.likedArticlesTitle.push(likedArticles[articleIndex].title);
                        }
                        for (articleIndex in vm.articles) {
                            if (vm.likedArticlesTitle.indexOf(vm.articles[articleIndex].headline.main) != -1) {
                                vm.articles[articleIndex].like = true;
                                console.log("Liked the article");
                                console.log(vm.articles[articleIndex]);
                            } else {
                                vm.articles[articleIndex].like = false;
                            }
                        }
                    })
                    .error(function (error) {
                        vm.likedArticlesTitle = [];
                    });
            }
        };

        vm.IMAGE_PRE = "https://static01.nyt.com/";

        getSearchArticles();

        function getSearchArticles() {
            vm.articles = [];
            $rootScope.populateLikedArticles();
            SearchPageService
                .getSearchedArticles(type, $routeParams.q)
                .success(function (articles) {
                    articles = articles.docs;
                    for (i = articles.length - 1; i >= 0; i--) {
                        if (vm.likedArticlesTitle.indexOf(articles[i].headline.main) != -1) {
                            articles[i].like = true;
                        }
                        var difference = 120 - articles[i].snippet.length;
                        while (difference > 0) {
                            articles[i].snippet = articles[i].snippet + articles[i].snippet;
                            difference = 120 - articles[i].snippet.length;
                        }
                        if (articles[i].multimedia.length >= 2) {
                            articles[i].multimedia[1].url = vm.IMAGE_PRE + articles[i].multimedia[1].url;
                        }
                        vm.articles.push(articles[i]);
                    }
                })
                .error(function (err) {
                    console.log("ERROR");
                });
        }


        vm.update = function(article) {
            article.username = $rootScope.user.username;
            var index = vm.likedArticlesTitle.indexOf(article.headline.main);
            console.log("Liked the article");
            console.log(article);
            CommonService
                .updateLikedArticle(article)
                .success(function(status) {
                    if (article.like) {
                        if (index == -1) {
                            vm.likedArticlesTitle.push(article.headline.main);
                        }
                    } else {
                        if (index != -1) {
                            vm.likedArticlesTitle.splice(index, 1);
                        }
                    }
                });
        }
    }
})();
/* Tips: (function() {})(); without the last () the function is not called hence iffy is useless */
