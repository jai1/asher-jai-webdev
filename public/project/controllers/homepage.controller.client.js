/**
 * Created by jai1 on 12/9/2016.
 */
(function () {
    angular
        .module("NewsYouLike")
        .controller("HomePageController", Controller);

    function Controller($routeParams, $geolocation, HomePageService) {
        var vm = this;
        // vm.data1 = HomePageService.getTopStories();
        $('#wrapper').toggleClass('toggled');
        isHamburgerMenuClosed = true;
        // Tips: hamburger won't work need to have it as this.hamburger
        // Tips: JQuery code can't run directly with angular, it needs to be embedded in angular vm.hambuergerClick() in Controller
        vm.hamburgerClick = function() {
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

        // basic usage
        $geolocation.getCurrentPosition().then(function(location) {
            vm.location = location
        });

        // regular updates
        $geolocation.watchPosition({
            timeout: 60000,
            maximumAge: 2,
            enableHighAccuracy: true
        });
        vm.coords = $geolocation.position.coords; // this is regularly updated
        vm.error = $geolocation.position.error; // this becomes truthy, and has 'code' and 'message' if an error occurs
    }})();     /* Tips: (function() {})(); without the last () the function is not called hence iffy is useless */
