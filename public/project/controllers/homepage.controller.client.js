/**
 * Created by jai1 on 12/9/2016.
 */
(function () {
    angular
        .module("NewsYouLike")
        .controller("HomePageController", Controller);

    function Controller($interval, $routeParams, HomePageService, CommonService) {

        /** Common For All Controllers - Start **/
        var vm = this;

        // Default Ratings - to be removed
        vm.rate = 2;
        // Used to show empty image if image not present
        vm.empty= CommonService.getEmptyImageURL();

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
        $interval(function() {
            vm.sensex.stock = CommonService.getStockDetails();
        }, vm.sensex.intervalInMs);

        vm.popularStoryTypes = CommonService.getPopularStoryTypes();
        vm.topStoryTypes = CommonService.getTopStoryTypes();
        vm.movieTypes = CommonService.getMovieTypes();
        /** Common For All Controllers - End **/

        vm.userId = $routeParams.uid;
        if (! vm.userId) {
            vm.userId = "";
        }

        vm.name = "Mohit";

        vm.IMAGE_PRE="https://static01.nyt.com/"

        vm.year = new Date().getFullYear();
        vm.month = new Date().getMonth(); // Get the month (0-11)
        vm.month += 1; // Get the month (1-12)
        var cachedArticles = [];
        var currentCachedArticleIndex = 0;
        vm.articles = [];
        var NUMBER_OF_ARTICLES_RETREIVED = 20;

        vm.getMoreArticles = function(){
            if (currentCachedArticleIndex >= cachedArticles.length - NUMBER_OF_ARTICLES_RETREIVED) {
                HomePageService
                    .getMoreArticles(vm.year, vm.month)
                    .success(function (articles) {
                        articles = articles.docs;
                        for (i = articles.length - 1; i >= 0; i--) {
                            cachedArticles.push(articles[i]);
                        }
                        populateArticles();
                        if (vm.month == 1) {
                            vm.month = 12;
                            vm.year -= 1;
                        } else {
                            vm.month -= 1;
                        }
                    })
                    .error(function (err) {
                        console.log("ERROR");
                        populateArticles();
                    });
            }
            populateArticles();
        };

        function populateArticles() {
            var numberOfArticlesRetreived = Math.min(NUMBER_OF_ARTICLES_RETREIVED, cachedArticles.length - currentCachedArticleIndex);
            while(numberOfArticlesRetreived > 0) {
                vm.articles.push(cachedArticles[currentCachedArticleIndex]);
                currentCachedArticleIndex ++;
                numberOfArticlesRetreived--;
            }
        }

        vm.getMovieReviews = function (type) {
            console.log("Movie Type = " + type);
            HomePageService
                .getMovieReviews(type)
                .success(function (reviews) {
                    vm.movieReviews = reviews;
                })
                .error(function (err) {

                });
        };
    }
})();
/* Tips: (function() {})(); without the last () the function is not called hence iffy is useless */
