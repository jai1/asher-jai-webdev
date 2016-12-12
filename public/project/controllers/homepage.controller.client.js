/**
 * Created by jai1 on 12/9/2016.
 */
(function () {
    angular
        .module("NewsYouLike")
        .controller("HomePageController", Controller);

    function Controller($interval, $routeParams, $http, HomePageService) {
        var vm = this;
        // vm.data1 = HomePageService.getTopStories();
        $('#wrapper').toggleClass('toggled');
        isHamburgerMenuClosed = true;
        // Tips: hamburger won't work need to have it as this.hamburger
        // Tips: JQuery code can't run directly with angular, it needs to be embedded in angular vm.hambuergerClick() in Controller
        vm.hamburgerClick = function () {
            var trigger = $('.hamburger');
            if (isHamburgerMenuClosed == true) {
                trigger.removeClass('is-open');
                trigger.addClass('is-closed');
                isHamburgerMenuClosed = false;
            } else {
                trigger.removeClass('is-closed');
                trigger.addClass('is-open');
                isHamburgerMenuClosed = true;
            }
            $('#wrapper').toggleClass('toggled');
        }


        // Time controller
        vm.clock = {time: "", intervalInMs: 1000};

        $interval(function () {
                vm.clock.time = Date.now();
            },
            vm.clock.intervalInMs);

        // Location and weather
        HomePageService
            .getWeatherDetails()
            .success(function (weather) {
                vm.weather = weather;
            })
            .error(function (err) {

            });

        console.log(vm.weather);
        // Sensex
        // TODO - store in DB
        var stocks = ["FOXA ","AAPL","MSFT","SIRI","MU","CSCO","QQQ","FTR","SGYP","FB","HBAN","INTC","ZNGA","GRPN","TLT","EBAY","FOX","ODP","FNSR","ON","NVDA","AAPL","QQQ","FB","AMZN","BIIB","TLT","MSFT","GOOGL","GOOG","AVGO","FOXA","WYNN","NVDA","GILD","AMGN","CSCO","AMD","CMCSA","IBB","INTC"];
        var stocksString = stocks.join(",");
        var stockQuotesArray = [];
        var currentStockIndex = 0;
        vm.sensex = {intervalInMs: 4000, exchange: "NASDAQ", stock: "", latestPrice: 0, change: 0};
        $interval(function() {
            if (currentStockIndex == 0) {
                $http({
                    method: 'GET',
                    url: 'http://finance.google.com/finance/info?client=ig&q=NASDAQ:' + stocksString
                }).then(function successCallback(response) {
                    // TODO - error handling
                    // TODO - Clean data cleaning part
                    stockQuotesArray = JSON.parse(response.data.replace("//", ""));
                    populateSensexDetails();
                }, function errorCallback(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });
                return;
            }
            populateSensexDetails();
        }, vm.sensex.intervalInMs);

        function populateSensexDetails() {
            if (stockQuotesArray.length > currentStockIndex) {
                data = stockQuotesArray[currentStockIndex];
                console.log(data);
                vm.sensex.stock = data.t;
                vm.sensex.latestPrice = data.l;
                vm.sensex.change = data.c;
                currentStockIndex = (currentStockIndex + 1) % stocks.length;
            }
        }

    }
})();
/* Tips: (function() {})(); without the last () the function is not called hence iffy is useless */
