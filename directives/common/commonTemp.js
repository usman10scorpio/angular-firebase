
app.directive('headerTemp', function () {
    return {
        restrict: 'E',
        templateUrl: "directives/common/header-temp.html",
        controller: ['$scope', '$http', '$rootScope', 'notificationfeeds', function ($scope, $http, $rootScope, notificationfeeds) {
            $scope.notifications = function () {
                $http({
                    method: 'GET',
                    url: api_base_url + '/rating/notification?access-token=' + $rootScope.auth_token,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                })
                    .then(function (data) {
                        $scope.my_notifications = data.data;
                        console.log($scope.my_notifications);

                    }, function (error) {
                        console.log(error);
                    });
            };

            // In case You want to use a a service you can do something like this 
            /* $scope.notifications = function () {
                $scope.fromService = notificationfeeds.getNotifications(); */

        }]
    };
});
app.directive('footerTemp', function () {
    return {
        templateUrl: "directives/common/footer-temp.html"
    };
});
app.directive('viewJob', function () {
    /* Viewing single Job*/
    return {
        restrict: 'E',
        // scope: {
        //     JobInfo: '=info', // we dont need to pass anything in calling directive, a directive can have access to all the scope and functon of a conntroller from where it is called
        // },
        templateUrl: "directives/common/view-job.html"
    };
});
app.directive('viewJobs', function () {
    /* View all jobs in grid*/
    return {
        restrict: 'E',
        templateUrl: "directives/common/view-jobs.html"
    };
});
app.directive('stepOne', function () {
    /* View all jobs in grid*/
    return {
        restrict: 'E',
        templateUrl: "directives/common/step-one.html"
    };
});
app.directive('stepTwo', function () {
    /* View all jobs in grid*/
    return {
        restrict: 'E',
        templateUrl: "directives/common/step-two.html"
    };
});
app.directive('searchCleaner', function () {
    /* View all jobs in grid*/
    return {
        restrict: 'E',
        templateUrl: "directives/common/searchcleaner.html"
    };
});
app.directive('searchJobs', function () {
    /* View all jobs in grid*/
    return {
        restrict: 'E',
        templateUrl: "directives/common/searchjobs.html"
    };
});
