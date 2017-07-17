/*Site wide Routing*/
app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix(''); //removing ! from url
    $routeProvider
        .when('/', {
            redirectTo: '/login',
            resolve: {
                lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                    // you can lazy load files for an existing module
                    return $ocLazyLoad.load({
                        name: 'cleaner',
                        files: ['partials/login/controllers/login.js']
                    });
                }],
                app: function ($q, checkAuth) {
                    $q.defer();
                    return checkAuth.loggedin(0);
                }
            }
        })
        .when('/login', {
            templateUrl: 'partials/login/views/login.html',
            controller: 'loginCtrl',
            resolve: {
                lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                    // you can lazy load files for an existing module
                    return $ocLazyLoad.load({
                        name: 'cleaner',
                        files: ['partials/login/controllers/login.js']
                    });
                }],
                app: function ($q, checkAuth) {
                    $q.defer();
                    return checkAuth.loggedin(0);
                }
            }
        })
        .when('/signup', {
            templateUrl: 'partials/signup/views/signup.html',
            controller: 'signupCtrl',
            resolve: {
                lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                    // you can lazy load files for an existing module
                    return $ocLazyLoad.load({
                        name: 'cleaner',
                        files: ['partials/signup/controllers/signup.js']
                    });
                }],
                app: function ($q, checkAuth) {
                    $q.defer();
                    return checkAuth.loggedin(1);
                }
            }
        })
        .when('/dash', {
            templateUrl: 'partials/dashboard/views/dash.html',
            controller: 'dashCtrl',
            resolve: {
                lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                    // you can lazy load files for an existing module
                    return $ocLazyLoad.load({
                        name: 'cleaner',
                        files: ['partials/dashboard/controllers/dash.js']
                    });
                }],
                app: function ($q, checkAuth) {
                    $q.defer();
                    return checkAuth.role();
                }
            }
        })
        .when('/cust-dash', {
            templateUrl: 'partials/cust-dash/views/cdash.html',
            controller: 'cdashCtrl',
            resolve: {
                lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                    // you can lazy load files for an existing module
                    return $ocLazyLoad.load({
                        name: 'cleaner',
                        files: ['partials/cust-dash/controllers/custdash.js']
                    });
                }],
                app: function ($q, checkAuth) {
                    $q.defer();
                    return checkAuth.role();
                }
            }
        })
        .when('/activate-account', {
            templateUrl: 'partials/activate-account/views/activate.html',
            controller: 'activateCtrl',
            resolve: {
                lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                    // you can lazy load files for an existing module
                    return $ocLazyLoad.load({
                        name: 'cleaner',
                        files: ['partials/activate-account/controllers/activate.js']
                    });
                }]
            }
        })
        .when('/feedback-customer/:jobid', {
            templateUrl: 'partials/cust-dash/views/feedback-customer.html',
            controller: 'cdashCtrl',
            resolve: {
                lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                    // you can lazy load files for an existing module
                    return $ocLazyLoad.load({
                        name: 'cleaner',
                        files: ['partials/cust-dash/controllers/custdash.js']
                    });
                }],
                app: function ($q, checkAuth) {
                    $q.defer();
                    return checkAuth.customer();  /* Only customer can access this page*/
                }
            }
        })
        .when('/feedback-cleaner/:jobid/:customerid', {
            templateUrl: 'partials/dashboard/views/feedback-cleaner.html',
            controller: 'dashCtrl',
            resolve: {
                app: function ($q, checkAuth, $route) {
                    $q.defer();
                    return checkAuth.cleaner($route.current.params.jobid);  /* Only cleaner can access this page*/
                },
                lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                    // you can lazy load files for an existing module
                    return $ocLazyLoad.load({
                        name: 'cleaner',
                        files: ['partials/dashboard/controllers/dash.js']
                    });
                }]
            }
        })
        .when('/single-cleaner/:id', {
            templateUrl: 'partials/single-cleaner/views/single-cleaner.html',
            controller: 'scleanerCtrl',
            resolve: {
                lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                    // you can lazy load files for an existing module
                    return $ocLazyLoad.load({
                        name: 'cleaner',
                        files: ['partials/single-cleaner/controllers/singlecleaner.js']
                    });
                }],
                app: function ($q, checkAuth) {
                    $q.defer();
                    return checkAuth.get();
                }
            }
        })
        .when('/single-job/:id', {
            templateUrl: 'partials/single-job/views/single-job.html',
            controller: 'sjobCtrl',
            resolve: {
                lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                    // you can lazy load files for an existing module
                    return $ocLazyLoad.load({
                        name: 'cleaner',
                        files: ['partials/single-job/controllers/singlejob.js']
                    });
                }],
                app: function ($q, checkAuth) {
                    $q.defer();
                    return checkAuth.get();
                }
            }
        })
        .otherwise({
            redirectTo: '/login',
            resolve: {
                app: function ($q, checkAuth) {
                    $q.defer();
                    return checkAuth.loggedin(0);
                }
            }
        });
}]);

/*Pre check user auth, if user is authorized to open page*/
app.factory('checkAuth', function ($http, $rootScope, $location, $cookies,$route) {
    return {
        get: function () {
            if ($rootScope.auth_token) {    //if auth token is saved then check does it return the user profile data
              return $http.get(api_base_url + '/users/' + $rootScope.id + '?access-token=' + $rootScope.auth_token,
                    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
                    .then(function (data) {
                        //return data; // if yes then okaye 
                    }, function (error) {
                        //console.log(data);
                        $location.url('/login'); //otherwise signinpage
                    });
            }
            else {
                $location.url('/login'); //otherwise signinpage   
            }
        }, loggedin: function (register_login) {
            //console.log("loggedin");
            if ($rootScope.is_loggedin === true && $rootScope.role === '10') {
                //console.log("customer is logged in");
                $location.url('/cust-dash');
            }
            else if ($rootScope.is_loggedin === true && $rootScope.role === '20') {
                //console.log("cleaner is logged in");
                $location.url('/dash');
            }
            else if (register_login === 0) {
                //console.log("User want to see login or signup page");
                $location.url('/login');
            }
            else {
                //console.log("user is not logged in and wants to see regsiter page");
                $location.url('/signup');
            }

        }, role: function () {

            $rootScope.role = $cookies.get('role');
            if (angular.equals($rootScope.role, '10')) {
                $location.url('/cust-dash');
                //console.log("Customer is here");
            }
            else if (angular.equals($rootScope.role, '20')) {
                $location.url('/dash');
                //console.log("Cleaner is here");
            }
            else {
                $location.url('/login');
            }
        },
        customer: function () {

            $rootScope.role = $cookies.get('role');
            if (angular.equals($rootScope.role, '10')) {
            }
            else if (angular.equals($rootScope.role, '20')) {
                $location.url('/dash');
            }
            else {
                $location.url('/login');
            }
        },
        cleaner: function (jobid) {
            $rootScope.role = $cookies.get('role');
            if (angular.equals($rootScope.role, '20')) {
               return $http.get(api_base_url + '/rating/notification?access-token=' + $rootScope.auth_token,
                    {
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                    })
                    .then(function (data) {
                        console.log(data.data);
                        if (data.data.length !== 0) {
                            for (var i = 0; i <= data.data.length - 1; i++) {
                                if (jobid === data.data.jobid) {
                                    console.log('Job id exist, he has not given rating yet, allow him to visit this page');
                                }
                            }
                        }
                        else {
                            $location.url('/dash');
                        }
                    }, function (error) {
                        $location.url('/dash');
                    });
            }
            else if (angular.equals($rootScope.role, '10')) {
                $location.url('/cust-dash');
            }
            else {
                $location.url('/login');
            }
        }
    };
});
