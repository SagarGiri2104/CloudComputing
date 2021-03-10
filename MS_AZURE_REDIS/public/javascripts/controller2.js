var myApp = angular.module('routesApp', ['ngRoute']);

myApp.config(['$routeProvider',
    function($routeProvider) {

        $routeProvider.when('/home', {
            templateUrl: '/views/id.html',
            controller: 'pblmController'
        }).
        when('/pblm', {
            templateUrl: '/views/pblm.html',
            controller: 'quiz2Controller'
        }).
        when('/getBig5', {
            templateUrl: '/views/getBig5.html',
            controller: 'pblmController'
        }).
        when('/getEqInRange', {
            templateUrl: '/views/getEqInRange.html',
            controller: 'pblmController'
        }).
        when('/getEqCountInRange', {
            templateUrl: '/views/getEqCountInRange.html',
            controller: 'pblmController'
        }).
        when('/getLargestEqInRange', {
            templateUrl: '/views/getLargestEqInRange.html',
            controller: 'pblmController'
        }).
        when('/getEqBnDates', {
            templateUrl: '/views/getEqBnDates.html',
            controller: 'pblmController'
        }).
        when('/getCountBn2EqLocInRange', {
            templateUrl: '/views/getCountBn2LocInRange.html',
            controller: 'pblmController'
        }).
        when('/getRecentEqCountBnMag', {
            templateUrl: '/views/getRecentEqCountBnMag.html',
            controller: 'pblmController'
        }).
        otherwise({
            redirectTo: '/view/home.html'
        });
    }
]);

myApp.controller('quiz2Controller', function($scope, $http) {
    console.log("in");
    $scope.findData = function() {
        $scope.dataRequest = {};
        $scope.dataRequest.name = $scope.name;
        $scope.dataRequest.number = $scope.number;
        $http({
            method: 'POST',
            url: '/eq/getPblm3',
            data: $scope.dataRequest

        }).then(function(response) {

                $scope.displayData = response.data;
                $scope.showGrid = true;
                console.log(response.data);
            },
            function(error) {
                //$scope.deleteData = {};
                console.log('error:' + error);
            });

    };
    $scope.getCountQuakes = function() {
        $http({
            method: 'GET',
            url: '/eq/getPblm1',
        }).then(function(response) {
                $scope.countQ = response.data[0].COUNT;
                $scope.showGrid = true;
                console.log(response.data);
            },
            function(error) {
                //$scope.deleteData = {};
                console.log('error:' + error);
            });

    };
    $scope.getLocation = function() {
        $http({
            method: 'GET',
            url: '/eq/getPblm11',
        }).then(function(response) {
                $scope.location = response.data[0].locationSource;
                $scope.id = response.data[0].id;
                $scope.showGrid = true;
                console.log(response.data);
            },
            function(error) {
                //$scope.deleteData = {};
                console.log('error:' + error);
            });

    };
    $scope.findEqInRange = function() {
        $scope.ipEqCountBnLoc = {};
        $scope.ipEqCountBnLoc.ip_lat1 = $scope.etLatitude1;
        $scope.ipEqCountBnLoc.ip_long1 = $scope.etLongitude1;
        $scope.ipEqCountBnLoc.ip_lat2 = $scope.etLatitude2;
        $scope.ipEqCountBnLoc.ip_long2 = $scope.etLongitude2;
        $scope.ipEqCountBnLoc.ip_range = $scope.etRange;
        $http({
            method: 'POST',
            url: '/eq/getCountBn2EqLocInRange',
            data: $scope.ipEqCountBnLoc

        }).then(function(response) {

                $scope.countQuake = response.data[0].length + response.data[1].length;
                $scope.id = response.data[0].id;
                $scope.showGrid = false;
                console.log(response.data);
            },
            function(error) {
                //$scope.deleteData = {};
                console.log('error:' + error);
            });

    };
    $scope.getCountQuakes();
    $scope.getLocation();

})

myApp.controller('pblmController', function($scope, $http) {
    //  console.log("in");
    $scope.ipBig5Quakes = {};
    $scope.getBigQuakes = function() {
        $http({
            method: 'GET',
            url: '/eq/getBig5',
            params: { eq_limit: $scope.etBigQuakes }

        }).then(function(response) {
                $scope.ipBig5Quakes = {};
                $scope.largestQuakesResult = response.data;
                $scope.showGrid = true;
                //       console.log(response.data);
            },
            function(error) {
                $scope.deleteData = {};
                console.log('error:' + error);
            });

    };

    $scope.ipEqRange = {};
    $scope.findEqInRange = function() {

        $http({
            method: 'GET',
            url: '/eq/getEqInRange',
            params: {
                ip_lat: $scope.etLatitude,
                ip_long: $scope.etLongitude,
                ip_range: $scope.etRange
            }
        }).then(function(response) {
                $scope.ipEqRange = {};
                $scope.EqInRangeResult = response.data;
                $scope.showGrid = true;
                //   console.log(response.data);
            },
            function(error) {
                $scope.deleteData = {};
                console.log('error:' + error);
            });

    };

    $scope.ipEqCountRange = {};
    $scope.findEqCountInRange = function() {
        $scope.ipEqCountRange.ip_lat = $scope.etLatitude;
        $scope.ipEqCountRange.ip_long = $scope.etLongitude;
        $scope.ipEqCountRange.ip_range = $scope.etRange;
        $http({
            method: 'POST',
            url: '/eq/getEqCountInRange',
            data: {
                ip_lat: $scope.etLatitude,
                ip_long: $scope.etLongitude,
                ip_range: $scope.etRange
            }
        }).then(function(response) {
                $scope.ipEqCountRange = {};
                $scope.EqInRangeResult = response.data.length;
                $scope.showGrid = true;
                //   console.log(response.data);
            },
            function(error) {
                $scope.ipEqCountRange = {};
                console.log('error:' + error);
            });

    };

    $scope.ipEqRange = {};
    $scope.findLargestEqInRange = function() {
        $scope.ipEqRange.ip_lat = $scope.etLatitude;
        $scope.ipEqRange.ip_long = $scope.etLongitude;
        $scope.ipEqRange.ip_range = $scope.etRange;

        $http({
            method: 'POST',
            url: '/eq/getLargestEqInRange',
            data: $scope.ipEqRange
        }).then(function(response) {
                $scope.ipEqRange = {};
                $scope.EqInRangeResult = response.data;
                $scope.showGrid = true;
                //   console.log(response.data);
            },
            function(error) {
                $scope.deleteData = {};
                console.log('error:' + error);
            });

    };

    $scope.ipEqBnDate = {};
    $scope.findEqBnDates = function() {
        $scope.ipEqBnDate.ip_date_from = $scope.etDateFrom;
        $scope.ipEqBnDate.ip_date_to = $scope.etDateTo;
        $scope.ipEqBnDate.ip_mag = $scope.etMag;
        $http({
            method: 'POST',
            url: '/eq/getEqBnDates',
            data: $scope.ipEqBnDate

        }).then(function(response) {
                $scope.ipEqBnDate = {};
                $scope.EqBnDates = response.data;
                $scope.showGrid = true;
                // console.log(response.data);
            },
            function(error) {
                $scope.ipEqBnDate = {};
                console.log('error:' + error);
            });

    };

    $scope.recentEqCountRange = {};
    $scope.findRecentEqCountByMag = function() {
        $scope.recentEqCountRange.ip_recent_days = $scope.etRecentDays;

        $http({
            method: 'POST',
            url: '/eq/getRecentEqCountBnMag',
            data: $scope.recentEqCountRange

        }).then(function(response) {
                $scope.recentEqCountRange = {};
                $scope.recentEqCountRange = response.data;
                $scope.showGrid = true;
                // console.log(response.data);
            },
            function(error) {
                $scope.recentEqCountRange = {};
                console.log('error:' + error);
            });

    };

    $scope.ipEqCountBnLoc = {};
    $scope.findCountEqLocInRange = function(lat1, lon1, lat2, lon2, ran) {
        $scope.ipEqCountBnLoc.ip_lat1 = lat1;
        $scope.ipEqCountBnLoc.ip_long1 = lon1;
        $scope.ipEqCountBnLoc.ip_lat2 = lat2;
        $scope.ipEqCountBnLoc.ip_long2 = lon2;
        $scope.ipEqCountBnLoc.ip_range = ran;
        $http({
            method: 'POST',
            url: '/eq/getCountBn2EqLocInRange',
            data: $scope.ipEqCountBnLoc

        }).then(function(response) {
                $scope.ipEqCountBnLoc = {};
                $scope.ipEqCountBnLoc = response.data;
                $scope.showGrid = true;
                // console.log(response.data);
            },
            function(error) {
                $scope.ipEqCountBnLoc = {};
                console.log('error:' + error);
            });
    };

})