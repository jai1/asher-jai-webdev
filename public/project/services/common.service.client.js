/**
 * Created by jai1 on 12/13/2016.
 */
(function () {
    angular
        .module("NewsYouLike")
        .factory("CommonService", Service);

    function Service($http, $route) {
        data = {weather: {}, sensex: {}, time: "", topStoryTypes: [], popularStoryTypes: [], movieTypes: []};
        var apis = {
            getWeatherDetails: getWeatherDetails,
            getStockDetails: getStockDetails,
            getCurrentTime: getCurrentTime,
            getTopStoryTypes: getTopStoryTypes,
            getPopularStoryTypes: getPopularStoryTypes,
            getMovieTypes: getMovieTypes,
            getEmptyImageURL: getEmptyImageURL,
            hamburgerClick: hamburgerClick
        };
        // TODO - store in DB
        var stocks = ["FOXA ", "AAPL", "MSFT", "SIRI", "MU", "CSCO", "QQQ", "FTR", "SGYP", "FB", "HBAN", "INTC", "ZNGA", "GRPN", "TLT", "EBAY", "FOX", "ODP", "FNSR", "ON", "NVDA", "AAPL", "QQQ", "FB", "AMZN", "BIIB", "TLT", "MSFT", "GOOGL", "GOOG", "AVGO", "FOXA", "WYNN", "NVDA", "GILD", "AMGN", "CSCO", "AMD", "CMCSA", "IBB", "INTC"];
        var stocksString = stocks.join(",");
        var stockQuotesArray = [];
        var currentStockIndex = 0;
        var SENSEX = "NASDAQ";

        var isHamburgerMenuClosed = false;

        return apis;

        function getPopularStoryTypes() {
            // TODO - Throw this list in DB
            return [{displayName: "Most Viewed", type: "mostviewed"},
                {displayName: "Most Emailed", type: "mostemailed"},
                {displayName: "Most Shared", type: "mostshared"}];
        }

        function getTopStoryTypes() {
            // TODO - Throw this list in DB
            return [{displayName: "All", type: "home"},
                {displayName: "Opinion", type: "opinion"},
                {displayName: "World", type: "world"},
                {displayName: "National", type: "national"},
                {displayName: "Politics", type: "politics"},
                {displayName: "Upshot", type: "upshot"},
                {displayName: "New York", type: "nyregion"},
                {displayName: "Business", type: "business"},
                {displayName: "Technology", type: "technology"},
                {displayName: "Science", type: "science"},
                {displayName: "Health", type: "health"},
                {displayName: "Sports", type: "sports"},
                {displayName: "Arts", type: "arts"},
                {displayName: "Books", type: "books"},
                {displayName: "Movies", type: "movies"},
                {displayName: "Theater", type: "theater"},
                {displayName: "Sunday Review", type: "sundayreview"},
                {displayName: "Fashion", type: "fashion"},
                {displayName: "Times Style", type: "tmagazine"},
                {displayName: "Food", type: "food"},
                {displayName: "Travel", type: "travel"},
                {displayName: "Magazine", type: "magazine"},
                {displayName: "Real Estate", type: "realestate"},
                {displayName: "Automobiles", type: "automobiles"},
                {displayName: "Obituaries", type: "obituaries"},
                {displayName: "Insider", type: "insider"}];
        }

        function getMovieTypes() {
            // TODO - Throw this list in DB
            return [{displayName: "Currently Showing", type: "picks"}, {displayName: "All Movies", type: "all"}];
            ;
        }

        function getWeatherDetails() {
            console.log("reached HomePageService.getWeatherDetails Services");
            return $http.get("/api/weatherDetails");
        }

        function getCurrentTime() {
            return Date.now();
        }

        function getStockDetails() {
            if (currentStockIndex == 0) {
                $http({
                    method: 'GET',
                    url: 'http://finance.google.com/finance/info?client=ig&q=' + SENSEX + ':' + stocksString
                }).then(function successCallback(response) {
                    // TODO - error handling
                    // TODO - Clean data cleaning part
                    stockQuotesArray = JSON.parse(response.data.replace("//", ""));
                    return populateSensexDetails();
                }, function errorCallback(response) {
                    console.log("ERROR: returning previous Details");
                    return populateSensexDetails();
                });
            }
            return populateSensexDetails();
        }


        function populateSensexDetails() {
            var stock = {exchange: SENSEX, name: "", latestPrice: 0, change: 0};
            if (stockQuotesArray.length > currentStockIndex) {
                data = stockQuotesArray[currentStockIndex];
                // console.log(data);
                stock.name = data.t;
                stock.latestPrice = data.l;
                stock.change = data.c;
                currentStockIndex = (currentStockIndex + 1) % stocks.length;
            }
            return stock;
        }

        function getEmptyImageURL() {
            return "data:image/jpeg;base64,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"
        }

        // Tips: hamburger won't work need to have it as this.hamburger
        // Tips: JQuery code can't run directly with angular, it needs to be embedded in angular vm.hambuergerClick() in Controller
        function hamburgerClick() {
            var trigger = $('.hamburger');
            var overlay = $('.overlay');
            if (isHamburgerMenuClosed == true) {
                overlay.hide();
                trigger.removeClass('is-open');
                trigger.addClass('is-closed');
                isHamburgerMenuClosed = false;
            } else {
                overlay.show();
                trigger.removeClass('is-closed');
                trigger.addClass('is-open');
                isHamburgerMenuClosed = true;
            }
            $('#wrapper').toggleClass('toggled');
        }
    }
})();