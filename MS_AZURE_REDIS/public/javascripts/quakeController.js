var myApp = angular.module('quakesApp', []);

myApp.controller('quakeController', function($scope, $http) {
    $scope.showGrid1 = false;
    $scope.showGrid3 = false;
    $scope.showGrid2 = false;
    //  console.log("in");
    $scope.inputData = {};
    $scope.Submit = function() {
            $http({
                method: 'GET',
                url: '/earth/getQuakes',
                params: { lat_first: $scope.input1,lat_second:  $scope.input2}

            }).then(function(response) {
                    $scope.ipBig5Quakes = {};
                    $scope.outputData1 = response.data;
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
               $scope.outputData2 = response.data;
               $scope.totalTime = (response.data[response.data.length-1].totalTime)/1000;
               $scope.showGrid2 = true;
            //     angular.forEach(response.data, function (obj) {  
            //         console.log(obj);
            //         opdata.push(obj)
              
            // });
              // $scope.outputData3 = opdata;
                //console.log($scope.outputData);
               // $scope.showGrid3 = true;
                //       console.log(response.data);
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
           $scope.outputData2 = response.data;
           console.log(response.data);
           $scope.totalTime = (response.data[response.data.length-1].totalTime)/1000;
           $scope.showGrid2 = true;
           $scope.db = true;
        //     angular.forEach(response.data, function (obj) {  
        //         console.log(obj);
        //         opdata.push(obj)
          
        // });
          // $scope.outputData3 = opdata;
            //console.log($scope.outputData);
           // $scope.showGrid3 = true;
            //       console.log(response.data);
        },
        function(error) {
            $scope.deleteData = {};
            console.log('error:' + error);
        });

};

});
//module.exports = router;