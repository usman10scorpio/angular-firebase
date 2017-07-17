/*Home*/
app.controller('activateCtrl', function ($http, $scope, $routeParams, $location, $cookies, $rootScope, toaster) {

    /*********************************************** Activate Account**********************************************/

    $scope.current_url = $location.url(); // Get the whole url
    var str = $scope.current_url; // store it in a variable
    splitted_str = str.split('='); // split it after '='
    $scope.access_token = splitted_str[splitted_str.length - 1]; ////console the array to see the output. access token wass coming in last index
    $scope.activate_acc = function () {
        $http({
            method: 'POST',
            url: api_base_url + '/user/activate-account?token=' + $scope.access_token,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function (data) {
                // //console.log(data);
                $location.path('/login');
                //alert("usman");
                toaster.pop('success', "", "Your account has been successfully activated", null, 'trustedHtml');
            }, function (error) {
            ////console.log(error);

        });
    };



    if ($scope.access_token)
        $scope.activate_acc();
  
});

/************************************************** Activate account ends here **************************************************/
