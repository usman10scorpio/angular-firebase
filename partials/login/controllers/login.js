/*Home*/
app.controller('loginCtrl', function ($http, $scope, $routeParams, $location, $cookies, $rootScope, toaster) {

    /*********************************************** Login of User**********************************************/

    $scope.loginData = {};
    $scope.login = function () {
        $http({
            method: 'POST',
            url: api_base_url + '/user/login',
            data: $.param($scope.loginData),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(function (data) {
            toaster.pop('success', "", "Successfully Logged In", null, 'trustedHtml');
            $cookies.put('auth_token', data.data.access_token);
            $cookies.put('id', data.data.id);
            $cookies.put('role', data.data.role);
            if ($cookies.get('auth_token') && $cookies.get('id') && $cookies.get('role')) {
                console.log("Successfully Getting Aut role status and ID");
                $rootScope.auth_token = $cookies.get('auth_token');
                $rootScope.id = $cookies.get('id');
                $rootScope.role = $cookies.get('role');
                $rootScope.is_loggedin = true;
                // If page refresh i was losing he logged in value so i put it here
            }
            if (data.data.role == 20) {
                console.log("cleaner");
                $location.path('/dash');
            }
            if (data.data.role == 10) {
                console.log("cusstomer");
                $location.path('/cust-dash');
            }

        }, function (error) {
            if(error.data.password)
            toaster.pop('error', "", error.data.password, null, 'trustedHtml');
            if(error.data.email)
            toaster.pop('error', "", error.data.email, null, 'trustedHtml');

        });
    };
    $rootScope.logout = function () {
        $cookies.remove('auth_token');
        $cookies.remove('role');
        $cookies.remove('status');
        $cookies.remove('id');
        /* BELOW lines are wriiten because cookies.remove methood will remove the things from the browser but not from the app so in order to update or empty them u have to do this*/
        $rootScope.auth_token = $cookies.get('auth_token');
        $rootScope.role = $cookies.get('role');
        $rootScope.status = $cookies.get('status');
        $rootScope.id = $cookies.get('id');
        $location.path('/login');
        $rootScope.is_loggedin = false;

    };
});

/************************************************** Login ends here **************************************************/

/******************************************************Logout starts here********************************************/



/******************************************************Logout ends here******************************************** */