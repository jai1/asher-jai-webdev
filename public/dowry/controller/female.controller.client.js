/**
 * Created by jai1 on 12/9/2016.
 */
(function () {
    angular
        .module("DowryCalculator")
        .controller("FemalePageController", Controller);

    function Controller($interval, $routeParams, $rootScope, $sce) {

        /** Common For All Controllers - Start **/
        var vm = this;
        vm.pageNumber=0;
        vm.clicked = false;
        vm.selectBrideAge = 0;
        vm.selectBrideMonthlyPackage = 0;
        vm.selectBrideProfession = 0;
        vm.selectBrideFather = 0;
        vm.selectBrideMarriage = 0;
        vm.selectBrideHeight = 0;
        vm.selectBrideCountry  = 0;
        vm.selectBrideAlmaMatar = 0;
        vm.selectBrideCaste = 0;
        vm.selectBrideColor = 0;

        vm.brideAge = [
            { display: "23", value: 0.5},
            { display: "24", value: 0.6},
            { display: "25", value: 0.7},
            { display: "26", value: 0.8},
            { display: "27", value: 0.9},
            { display: "28", value: 0.99},
            { display: "29", value: 0.4},
            { display: "30", value: 0.3},
            { display: "31-35", value: 0.2},
            { display: "36-40", value: 0.1},
            { display: "50+", value: 0}];

        vm.brideCaste = [
            { display: "Bania", value: 0.5},
            { display: "Bhumihar", value: 0.5},
            { display: "Brahmin", value: 0.5},
            { display: "Chettiar", value: 0.5},
            { display: "Ezhava", value: 0.5},
            { display: "Jat", value: 0.5},
            { display: "Kayastha", value: 0.5},
            { display: "Kamma", value: 0.5},
            { display: "Kapu", value: 0.5},
            { display: "Kshatriya", value: 0.5},
            { display: "Labanas", value: 0.5},
            { display: "Maravar", value: 0.5},
            { display: "Nair", value: 0.5},
            { display: "Nadar", value: 0.5},
            { display: "Reddy", value: 0.5},
            { display: "Thevar", value: 0.5},
            { display: "Vaishya", value: 0.5},
            { display: "Don't Know", value: 0.5}
        ];

        vm.brideProfession = [
            {display: 'Doctor', value: 0.92},
            {display: 'Family Business', value: 0.65},
            {display: 'Engineer', value: 0.82},
            {display: 'Lawyer', value: 0.75},
            {display: 'CA', value: 0.80},
            {display: 'Investment Banker', value: 0.95},
            {display: 'Unemployed', value: 0.11},
            {display: 'Self Employed', value: 0.35},
            {display: 'Architect', value: 0.75},
            {display: 'Teacher', value: 0.45},
            {display: 'Journalist', value: 0.45},
            {display: 'Consultant', value: 0.65},
            {display: 'Project Manager', value: 0.85},
            {display: 'IAS Officer', value: 0.95}
        ];

        vm.brideMonthlyPackage= [
            { display: 'Less than 20,000', value: 0},
            { display: '20,000 - 30,000', value: 0.35},
            { display: '30,000 - 40,000', value: 0.45},
            { display: '40,000 - 50,000', value: 0.60},
            { display: '50,000 - 70,000', value: 0.75},
            { display: '70,000 - 1 Lakh', value: 0.85},
            { display: '1 Lakh - 1.5 Lakh', value: 0.90},
            { display: '1.5 Lakh - 2 Lakh', value: 0.93},
            { display: 'More than 2 Lakh', value: 0.99}
        ];

        vm.brideAlmaMatar = [
            { display: 'Massachusetts Institute of Technology (MIT)', value: 0.99},
            { display: 'Stanford', value: 0.99},
            { display: 'Harvard', value: 0.99},
            { display: 'Indian Instititute of Technology (IIT)', value: 0.85},
            { display: 'Indian Instititute of Management (IIM)', value: 0.90},
            { display: 'IIT + IIM', value: 0.99},
            { display: 'None of the Above', value: 0.65}
        ];

        vm.brideCountry = [
            { display: 'USA', value: 0.99},
            { display: 'Any Country less developed than India', value: 0.11},
            { display: 'India', value: 0.55},
            { display: 'Any European Country/Any Country more developed than India', value: 0.90}];


        vm.brideColor = [
            { display: 'Pitch Black (Not visible on a moonless night)', value: 0.11},
            { display: 'Black', value: 0.25},
            { display: 'Brown', value: 0.55},
            { display: 'Wheatish (Almost White. Would need some Fair n Lovely)', value: 0.65},
            { display: 'Fairy White', value: 0.99},
            { display: 'White', value: 0.85}
        ];

        vm.brideMarriage = [
            { display: 'More than 2', value: -0.50},
            { display: '2', value: 0.25},
            { display: '1', value: 0.45},
            { display: '0', value: 0.99}
        ];

        vm.brideFather = [
            { display: 'IAS Officer', value: 0.99},
            { display: 'Family Business', value: 0.65},
            { display: 'Doctor', value: 0.85},
            { display: 'Lawyer', value: 0.75},
            { display: 'Engineer', value: 0.80},
            { display: 'CA', value: 0.75 },
            { display: 'Teacher', value: 0.60 },
            { display: 'Journalist', value: 0.60}];

        vm.brideHeight = [
            { display: 'Less than 4\'9"', value: 0.15},
            { display: '4\'9"', value: 0.25},
            { display: '5\'0"', value: 0.25},
            { display: '5\'1"', value: 0.35},
            { display: '5\'2"', value: 0.35},
            { display: '5\'3"', value: 0.45},
            { display: '5\'4"', value: 0.55},
            { display: '5\'5"', value: 0.65},
            { display: '5\'6"', value: 0.75},
            { display: '5\'7"', value: 0.85},
            { display: '5\'8"', value: 0.95},
            { display: 'Greater than 5\'8"', value: 0.99}
        ];

         vm.trustSrc = function(src) {
             return $sce.trustAsResourceUrl(src);
         };

        vm.forceUnknownOption = function() {
            vm.clicked = true;
            var total = Number(vm.selectBrideAge) + 2*Number(vm.selectBrideMonthlyPackage) + Number(vm.selectBrideProfession) +
                Number(vm.selectBrideFather) + Number(vm.selectBrideMarriage )+ Number(vm.selectBrideHeight) +
                1.5*Number(vm.selectBrideCountry) + Number(vm.selectBrideAlmaMatar) + Number(vm.selectBrideCaste) + Number(vm.selectBrideColor);
            vm.pageNumber = Math.floor(total);

            console.log("total = " + total)
            console.log("vm.pageNumber= " + vm.pageNumber);
            console.log("vm.clicked= "+ vm.clicked);
            console.log("vm.selectBrideAge= " + vm.selectBrideAge);
            console.log("vm.selectBrideMonthlyPackage= " + vm.selectBrideMonthlyPackage );
            console.log("vm.selectBrideProfession= " + vm.selectBrideProfession );
            console.log("vm.selectBrideFather= " + vm.selectBrideFather);
            console.log("vm.selectBrideMarriage= " + vm.selectBrideMarriage);
            console.log("vm.selectBrideHeight= " + vm.selectBrideHeight);
            console.log("vm.selectBrideCountry= " + vm.selectBrideCountry);
            console.log("vm.selectBrideAlmaMatar= " + vm.selectBrideAlmaMatar);
            console.log("vm.selectBrideCaste= " + vm.selectBrideCaste);
            console.log("vm.selectBrideColor= " + vm.selectBrideColor);


            if (!vm.pageNumber || vm.pageNumber == 0) {
                vm.link ="#zero"
            } else {
                vm.link = "http://www.dowrycalculator.com/Page " + vm.pageNumber + ".html";
            }
        };
    }
})();
/* Tips: (function() {})(); without the last () the function is not called hence iffy is useless */
