var myApp = angular.module('routesApp', ['ngRoute']);

// myApp.config(['$routeProvider',
//     function($routeProvider) {
//         $routeProvider.when('/routeURL1/:userId', {
//             templateUrl: 'sample1.htm',
//             controller: 'sample1Controller'
//         }).
//         when('/search', {
//             templateUrl: 'search.html',
//             controller: 'searchController'
//         }).
//         when('/edit', {
//             templateUrl: 'edit_user.html',
//             controller: 'editController'
//         }).
//         when('/routeURL2', {
//             templateUrl: 'sample2.htm',
//             controller: 'sample2Controller'
//         }).
//         when('/edit', {
//             templateUrl: 'edit_user.html',
//             controller: 'editController'
//         }).
//         otherwise({
//             redirectTo: '/login'
//         });
//     }
// ]);

myApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/edit', {
            templateUrl: 'edit.html',
            controller: 'editController'
        }).
        when('/search', {
            templateUrl: 'search.html',
            controller: 'searchController'
        }).
        when('/home', {
            templateUrl: 'home.htm',
            controller: 'fieldController'
        }).
        when('/showinfo', {
            templateUrl: 'showinfo.html',
            controller: 'showinfoController'
        }).
        when('/showAll', {
            templateUrl: 'showall.html',
            controller: 'showController'
        }).
        otherwise({
            redirectTo: '/home'
        });
    }
]);


myApp.controller('showinfoController', function($scope, $http) {
    $scope.showinfo = {};
    $scope.show = function() {
        $http({
            method: 'GET',
            url: '/people/showinfo',
        }).then(function(response) {
                $scope.showinfo = {};
                $scope.showResponse = response.data;
                $scope.showGrid = true;
            },
            function(error) {
                $scope.deleteData = {};
                console.log('error:' + error);
            });

    };
    $scope.show();
})

myApp.controller('showController', function($scope, $http) {
    $scope.showinfo = {};
    $scope.show = function() {
        $http({
            method: 'GET',
            url: '/people/showall',
        }).then(function(response) {
                $scope.showinfo = {};
                $scope.showResponse = response.data;
                $scope.showGrid = true;
                console.log($scope.showResponse);
            },
            function(error) {
                $scope.deleteData = {};
                console.log('error:' + error);
            });

    };
    $scope.show();
})

myApp.controller('edit2Controller', function($scope, $routeParams) {
    $scope.uid = $routeParams.userId;
})

myApp.controller('fieldController', function($scope) {
    console.log("hi");
    console.log($scope.name);
    $scope.search = function(name) {
        console.log("inside");
        console.log($scope.name);
        console.log(typeof $scope.name);
    }
})

// myApp.config(function($routeProvider) {
//     $routeProvider
//         .when("/", {
//             templateUrl: "main.htm"
//         })
//         .when("/red", {
//             templateUrl: "edit_user.html",
//             controller: 'mainController'
//         })
//         .when("/green", {
//             templateUrl: "green.htm"
//         })
//         .when("/blue", {
//             templateUrl: "blue.htm"
//         });
// });

myApp.controller('editController', function($scope, $http) {
    //  $scope.uid = $routeParams.userId;
    $scope.editData = {};
    $scope.edit = function(columnName, columnType, columnValue) {
        $scope.editData.columnValue = columnValue;
        $scope.editData.columnName = columnName;
        $scope.editData.columnType = columnType;
        $http({
            method: 'POST',
            url: '/people/updateinfo',
            data: $scope.editData
        }).then(function(response) {
                $scope.editData = {};

                $scope.searchResponse = response.data;
                if (response.data == null || response.data == undefined || response.data == "") {
                    $scope.error_result = "invalid entry";
                }
                $scope.showGrid = true;
                $scope.update_msg = "updated successfully";
                console.log(response);
            },
            function(error) {
                $scope.editData = {};
                $scope.showGrid = true;
                $scope.update_msg = "invalid entry";
                console.log('error:' + error);
            });
    };
    console.log($scope.editData);
    $scope.searchData = {};
    $scope.search = function(columnName, columnValue) {
        $scope.searchData.columnName = columnName;
        $scope.searchData.columnValue = columnValue;
        //$scope.searchData.salaryFrom = $scope.salaryFrom;
        // $scope.searchData.salaryTo = $scope.salaryTo;
        $http({
            method: 'POST',
            url: '/people/search',
            data: $scope.searchData
        }).then(function(response) {
            $scope.searchData = {};
            //console.log(response.data)
            if (response.data == null || response.data == undefined || response.data == "") {
                //$scope.message = "response is null";
                $scope.showGrid2 = true;
                $scope.error_result = "invalid entry";

            } else {
                $scope.searchResponse = response.data;
                $scope.showGrid = true;
                var url = "../images/";
                var pic = $scope.searchResponse.Picture;
                $scope.picUrl = url + pic;
                $scope.searchResponse.Picture;
                console.log($scope.searchResponse.Picture);
            }

            console.log(response);
        }, function(error) {
            $scope.searchData = {};
            console.log('error:' + error);
        });
    };

    // $scope.go = function(path, name) {
    //     $location.path(path);
    //     $scope.edit(name);
    // };

})


myApp.controller('searchController', function($scope, $http, $location) {

    $scope.deleteData = {};
    $scope.delete = function(columnName, columnValue) {
        $scope.deleteData.columnName = columnName;
        $scope.deleteData.columnValue = columnValue;
        console.log($scope.deleteData);
        //$scope.searchData.salaryFrom = $scope.salaryFrom;
        // $scope.searchData.salaryTo = $scope.salaryTo;
        $http({
            method: 'POST',
            url: '/people/delete',
            data: $scope.deleteData
        }).then(function(response) {

                $scope.deleteData = {};
                $scope.searchResponse = response.data;
                $scope.showGrid = false;
                $scope.showGrid2 = true;
                $scope.error_result = "deleted successfully";
                console.log(response);
            },
            function(error) {
                $scope.deleteData = {};
                console.log('error:' + error);
            });
    };
    console.log($scope.deleteData);

    $scope.searchData = {};
    $scope.search = function(columnName, columnValue) {
        $scope.searchData.columnName = columnName;
        $scope.searchData.columnValue = columnValue;
        //$scope.searchData.salaryFrom = $scope.salaryFrom;
        // $scope.searchData.salaryTo = $scope.salaryTo;
        $http({
            method: 'POST',
            url: '/people/search',
            data: $scope.searchData
        }).then(function(response) {
            $scope.searchData = {};
            //console.log(response.data)
            if (response.data == null || response.data == undefined || response.data == "") {
                //$scope.message = "response is null";
                $scope.showGrid2 = true;
                $scope.error_result = "invalid entry";

            } else {
                $scope.searchResponse = response.data;
                $scope.showGrid = true;
                var url = "../images/";
                var pic = $scope.searchResponse.Picture;
                $scope.picUrl = url + pic;
                $scope.searchResponse.Picture;
                console.log($scope.searchResponse.Picture);
            }

            console.log(response);
        }, function(error) {
            $scope.searchData = {};
            console.log('error:' + error);
        });
    };
    console.log($scope.searchData);

});