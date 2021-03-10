var myApp = angular.module('quiz3App', []);

myApp.controller('quiz3Controller', function($scope, $http) {


    $scope.showGrid1 = false;
    $scope.showGrid3 = false;
    $scope.showGrid2 = false;
    //  console.log("in");

    $scope.Submit = function(input1) {
        $scope.showGrid1 = false;
        $scope.showGrid3 = false;
        $scope.showGrid2 = false;
        $scope.showChart = false;
            $http({
                method: 'GET',
                url: '/quiz3/getQuakes',
                params: { lat_first: input1}

            }).then(function(response) {
                    $scope.outputData1 = response.data.dataRows;
                    console.log($scope.outputData1 );
                    $scope.showGrid1 = false;
                    $scope.showChart = true;
                    $scope.timeTaken = response.data.timeTaken;
                    $scope.dbUsed = response.data.dbUsed;
                    var result =[];
                    var data = $scope.outputData1;
                    for(var i=0;i< data.length;i++)
                    {
                    var data_final ={};
                    data_final["x"] = data[i].year.value;
                    data_final["y"] =  data[i].NumberTerroristIncidents.value;
                    result.push(data_final);
                   
                    }
                   $scope.displayChart(result,'pie');
                   // lineChart($scope.outputData1);
                },
                function(error) {
                    $scope.deleteData = {};
                    console.log('error:' + error);
                });

    };

    
                      
    $scope.displayChart = function(result,chartType){
        var pointDisplayFormat;
        var piePointFormat = '<b>{point.x}</b>: <b>{point.percentage:.1f}%</b>';
        var columnPointFormat = '<b>{point.x}</b>: <b>{point.y:.1f}</b>';
        if(chartType == 'pie')
        {
            pointDisplayFormat = piePointFormat;
        }
        else{
            pointDisplayFormat = columnPointFormat;
        }
      

            var chart = {
               plotBackgroundColor: null,
               plotBorderWidth: null,
               plotShadow: false,
            };
            var title = {
               text: 'Data in ' + chartType + ' chart'   
            };
            var tooltip = {
               pointFormat: pointDisplayFormat
            };
            var plotOptions = {
               pie: {
                  allowPointSelect: true,
                  cursor: 'pointer',
                  
                  dataLabels: {
                     enabled: true,
                     format: pointDisplayFormat,
                     style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor)||
                        'black'
                     }
                  }
               }
            }
            
            var series = [{
               type: chartType,
               name: chartType + ' chart',
               data: result
            }];

            var json = {};   
            json.chart = chart; 
            json.title = title;     
            json.tooltip = tooltip;  
            json.series = series;
            json.plotOptions = plotOptions;
            $('#charts').highcharts(json);  
        
    }

function displayColumnChart(){
    var chart = {
        type: 'column'
     };
     var title = {
        text: 'Monthly Average Rainfall'   
     };
     var subtitle = {
        text: 'Source: WorldClimate.com'  
     };
     var xAxis = {
        categories: ['Jan','Feb','Mar','Apr','May','Jun','Jul',
           'Aug','Sep','Oct','Nov','Dec'],
        crosshair: true
     };
     var yAxis = {
        min: 0,
        title: {
           text: 'Rainfall (mm)'         
        }      
     };
     var tooltip = {
        headerFormat: '<span style = "font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style = "color:{series.color};padding:0">{series.name}: </td>' +
           '<td style = "padding:0"><b>{point.y:.1f} mm</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
     };
     var plotOptions = {
        column: {
           pointPadding: 0.2,
           borderWidth: 0
        }
     };  
     var credits = {
        enabled: false
     };
     var series= [
        {
           name: 'Tokyo',
           data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6,
              148.5, 216.4, 194.1, 95.6, 54.4]
        }, 
        {
           name: 'New York',
           data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3,
              91.2, 83.5, 106.6, 92.3]
        }, 
        {
           name: 'London',
           data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6,
              52.4, 65.2, 59.3, 51.2]
        }, 
        {
           name: 'Berlin',
           data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4,
              47.6, 39.1, 46.8, 51.1]
        }
     ];     
  
     var json = {};   
     json.chart = chart; 
     json.title = title;   
     json.subtitle = subtitle; 
     json.tooltip = tooltip;
     json.xAxis = xAxis;
     json.yAxis = yAxis;  
     json.series = series;
     json.plotOptions = plotOptions;  
     json.credits = credits;
     $('#container').highcharts(json);

  //});
}

    $scope.SubmitRedis = function(input1,input2) {
        $scope.showGrid1 = false;
        $scope.showGrid3 = false;
        $scope.showGrid2 = false;
            $http({
                method: 'GET',
                url: '/quiz3/get1FromRedis',
                params: { lat_first: input1,lat_second:  input2}

            }).then(function(response) {
                    $scope.outputData1 = response.data.dataRows;
                    $scope.showGrid1 = true;
                    $scope.timeTaken = response.data.timeTaken;
                    $scope.dbUsed = response.data.dbUsed;
                    //       console.log(response.data);
                },
                function(error) {
                    $scope.deleteData = {};
                    console.log('error:' + error);
                });

    };

    $scope.Submit2 = function(input1,input2) {
        $scope.showGrid1 = false;
        $scope.showGrid3 = false;
        $scope.showGrid2 = false;
        $scope.outputData2 = "";
            $http({
                method: 'GET',
                url: '/quiz3/getonlyFromRedis',
                params: { lat_first: input1,lat_second:  input2}

            }).then(function(response) {
                $scope.showGrid1 = false;
                $scope.showGrid3 = false;
                $scope.showGrid2 = false;
                
                   
                    $scope.outputData1 = response.data.dataRows;
                    $scope.showGrid1 = true;
                    $scope.timeTaken = response.data.timeTaken;
                    $scope.dbUsed = response.data.dbUsed;
                    //       console.log(response.data);
                },
                function(error) {
                    $scope.deleteData = {};
                    console.log('error:' + error);
                });

    };

    $scope.Submit1 = function(input1,input2,input3) {
        $scope.showGrid1 = false;
        $scope.showGrid3 = false;
        $scope.showGrid2 = false;
        $scope.db =false;
        $scope.outputData1 = "";
        $http({
            method: 'GET',
            url: '/quiz3/getQuakes1',
            params: {lat_first: input1,lat_second:  input2}
    
        }).then(function(response) {
              // var opdata = [];
              $scope.showGrid1 = false;
              $scope.showGrid3 = false;
              $scope.showGrid2 = false;
              $scope.outputData1 = response.data.dataRows;
              $scope.outputData2 = "";
              $scope.showGrid1 = true;
              $scope.timeTaken = response.data.timeTaken;
              // console.log($scope.outputData2);
               console.log(response.data);
             
              // $scope.db = true;
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

    $scope.Submit3 = function(input1,input2,input3) {
        $scope.showGrid1 = false;
        $scope.showGrid3 = false;
        $scope.showGrid2 = false;
        $scope.db =false;
        $scope.outputData1 = "";
        $http({
            method: 'GET',
            url: '/quiz3/getQuakes10a',
            params: {lat_first: input1,lat_second:  input2,range: input3}
    
        }).then(function(response) {
              // var opdata = [];
              $scope.showGrid1 = false;
              $scope.showGrid3 = false;
              $scope.showGrid2 = false;
              $scope.outputData1 = response.data[0].dataRows;
              console.log($scope.outputData1);
              $scope.outputData2 = "";
              $scope.showGrid1 = true;
              //$scope.timeTaken = response.data.timeTaken;
              $scope.timeTaken = (response.data[response.data.length-1].timeTaken);
              // console.log($scope.outputData2);
               console.log(response.data);
               var total=0;

             
              // $scope.db = true;
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

    $scope.Submit5 = function(input1,input2,input3) {
        $scope.showGrid1 = false;
        $scope.showGrid3 = false;
        $scope.showGrid2 = false;
        $scope.db =false;
        $scope.outputData1 = "";
        $http({
            method: 'GET',
            url: '/quiz3/getQuakes11a',
            params: {lat_first: input1,lat_second:  input2,range: input3}
    
        }).then(function(response) {
              // var opdata = [];
              $scope.showGrid1 = false;
              $scope.showGrid3 = false;
              $scope.showGrid2 = false;
              $scope.outputData1 = response.data[0].dataRows;
              console.log($scope.outputData1);
              $scope.outputData2 = "";
              $scope.showGrid1 = true;
              //$scope.timeTaken = response.data.timeTaken;
              $scope.timeTaken = (response.data[response.data.length-1].timeTaken);
              // console.log($scope.outputData2);
               console.log(response.data);
             
              // $scope.db = true;
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

    $scope.Submit4 = function(input1,input2,input3) {
        $scope.showGrid1 = false;
        $scope.showGrid3 = false;
        $scope.showGrid2 = false;
        $scope.db =false;
        $scope.outputData1 = "";
        $http({
            method: 'GET',
            url: '/quiz3/getQuakes10b',
            params: {lat_first: input1,lat_second:  input2,range: input3}
    
        }).then(function(response) {
              // var opdata = [];
              $scope.showGrid1 = false;
              $scope.showGrid3 = false;
              $scope.showGrid2 = false;
              $scope.outputData2 = response.data[0].dataRows;
              console.log($scope.outputData1);
              $scope.outputData1 = "";
              $scope.showGrid2 = true;
              //$scope.timeTaken = response.data.timeTaken;
              $scope.timeTaken = (response.data[response.data.length-1].timeTaken);
              // console.log($scope.outputData2);
               console.log(response.data);
             
              // $scope.db = true;
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

    $scope.Submit2 = function(input1,input2) {
        $scope.showGrid1 = false;
        $scope.showGrid3 = false;
        $scope.showGrid2 = false;
        $scope.db =false;
        $scope.outputData1 = "";
        $http({
            method: 'GET',
            url: '/quiz3/getQuakes2',
            params: {lat_first: input1,lat_second:  input2}
    
        }).then(function(response) {
              // var opdata = [];
              $scope.showGrid1 = false;
              $scope.showGrid3 = false;
              $scope.showGrid2 = false;
              $scope.outputData2 = response.data.dataRows;
              $scope.showGrid2 = true;
              $scope.outputData1 = "";
              $scope.timeTaken = response.data.timeTaken;
              // console.log($scope.outputData2);
               console.log(outputData2);
             
              // $scope.db = true;
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
    $scope.Submit1Redis = function(input1,input2,input3) {
        $scope.showGrid1 = false;
        $scope.showGrid3 = false;
        $scope.showGrid2 = false;
        $scope.db =false;
        $scope.outputData1 = "";
        $http({
            method: 'GET',
            url: '/quiz3/get2FromRedis',
            params: {lat_first: input1,lat_second:  input2,range:input3}
    
        }).then(function(response) {
              // var opdata = [];
              $scope.showGrid1 = false;
              $scope.showGrid3 = false;
              $scope.showGrid2 = false;
               $scope.outputData2 = response.data;
              // console.log($scope.outputData2);
               console.log(response.data);
               $scope.totalTime = (response.data[response.data.length-1].totalTime);
               $scope.showGrid2 = true;
              // $scope.db = true;
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
    
    $scope.getChart = function(input1){
        $scope.showGrid1 = false;
        $scope.showGrid3 = false;
        $scope.showGrid2 = false;
            $http({
                method: 'GET',
                url: '/quiz3/getQuakes',
                params: { lat_first: input1}

            }).then(function(response) {
                    $scope.outputData1 = response.data.dataRows;
                    $scope.showGrid1 = true;
                    $scope.timeTaken = response.data.timeTaken;
                    $scope.dbUsed = response.data.dbUsed;

                    //       console.log(response.data);
                },
                function(error) {
                    $scope.deleteData = {};
                    console.log('error:' + error);
                });
            }

});

