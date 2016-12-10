/**
 * Created by jai1 on 12/9/2016.
 */
(function () {
    angular
        .module("NewsYouLike")
        .controller("HomePageController", Controller);

    function Controller($routeParams, HomePageService) {
        var vm = this;
        // vm.data1 = HomePageService.getTopStories();
        $('#wrapper').toggleClass('toggled');
        isHamburgerMenuClosed = true;
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
    }})();