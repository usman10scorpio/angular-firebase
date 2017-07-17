app.controller('scleanerCtrl', function ($http, $scope, $location, $compile, $rootScope, toaster, $route, $window) {

    $scope.readonly = 2.5;
    $scope.static_rating = 5;


    /******************************************************* SINGLE CLEANER   *************************************************/

    $scope.singlecleaner = function () {
        $scope.current_url = $location.url(); // Get the whole url
        var str = $scope.current_url; // store it in a variable
        splitted_str = str.split('/'); // split it after '/'
        $scope.single_cleaner_id = splitted_str[splitted_str.length - 1]; ////console the array to see the output. access token wass coming in last index

        $http({
            method: 'GET',
            url: api_base_url + '/users/' + $scope.single_cleaner_id + '?access-token=' + $rootScope.auth_token,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(function (data) {
            $scope.scleanerData = data.data;
            console.log($scope.scleanerData);
        }, function (error) {
            console.log(error);

        });
    };
    $scope.singlecleaner();

    /******************************************************* SINGLE CLEANER ENDS HERE *************************************************/

});