var myApp = angular.module('earthApp', []);

myApp.controller('earthController', function($scope, $http) {
    $scope.showGrid1 = false;
    $scope.showGrid2 = false;
    //  console.log("in");
    $scope.inputData = {};
    $scope.Submit = function() {
            $http({
                method: 'GET',
                url: '/quake/createTable',
                //params: { lat_first: $scope.input1,lat_second:  $scope.input2}

            }).then(function(response) {
                    $scope.timeTakenForTable = response.data.timeTaken;
                    $scope.showGrid1 = true;
                    //       console.log(response.data);
                },
                function(error) {
                    $scope.deleteData = {};
                    console.log('error:' + error);
                });

    };

    $scope.Submit1 = function() {
        $http({
            method: 'GET',
            url: '/quake/insertTable',
            //params: { lat_first: $scope.input1,lat_second:  $scope.input2}

        }).then(function(response) {
                $scope.timeTakenForInsert = response.data.timeTaken;
                $scope.showGrid1 = true;
                //       console.log(response.data);
            },
            function(error) {
                $scope.deleteData = {};
                console.log('error:' + error);
            });

};

$scope.Submit1 = function() {
    $http({
        method: 'GET',
        url: '/quake/insertTable',
        //params: { lat_first: $scope.input1,lat_second:  $scope.input2}

    }).then(function(response) {
            $scope.timeTakenForInsert = response.data.timeTaken;
            $scope.showGrid1 = true;
            //       console.log(response.data);
        },
        function(error) {
            $scope.deleteData = {};
            console.log('error:' + error);
        });

};

$scope.Submit1 = function() {
    $scope.showGrid1 = false;
    $scope.showGrid3 = false;
    $scope.showGrid2 = false;
    $scope.db =false;
    $http({
        method: 'GET',
        url: '/earth/getQuakesGivenRange',
        params: {lat_first: $scope.input1,lat_second:  $scope.input2,range: $scope.input3}

    }).then(function(response) {
           var opdata = [];
           $scope.outputData1 = response.data;
           $scope.totalTime = (response.data[response.data.length-1].totalTime)/1000;
           $scope.showGrid1 = true;
        },
        function(error) {
            $scope.deleteData = {};
            console.log('error:' + error);
        });

};

$scope.Submit2 = function() {
    $scope.showGrid1 = false;
    $scope.showGrid3 = false;
    $scope.showGrid2 = false;
    $scope.db =false;
    $http({
        method: 'GET',
        url: '/earth/getFromRedis',
        params: {lat_first: $scope.input1,lat_second:  $scope.input2,range: $scope.input3}

    }).then(function(response) {
           var opdata = [];
           $scope.outputData1 = response.data;
           $scope.totalTime = (response.data[response.data.length-1].totalTime)/1000;
           $scope.showGrid1 = true;
        },
        function(error) {
            $scope.deleteData = {};
            console.log('error:' + error);
        });

};

});