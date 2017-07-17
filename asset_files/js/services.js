app.factory('notificationfeeds', function ($http,$rootScope) {
    return {
        getNotifications: function () {
         /*don write return here*/ $http.get(api_base_url + '/rating/notification?access-token=' + $rootScope.auth_token,
                {
                    headers:
                    { 'Content-Type': 'application/x-www-form-urlencoded' }
                }).then(function (data) {
                    return data;

                }, function (error) {
                    console.log(error);
                });
            // return;
        }
    };
});