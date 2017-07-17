app.controller('sjobCtrl', function ($http, $scope, $location, $compile, $rootScope, toaster, $route, $window) {

    $scope.readonly = 2.5;
    $scope.static_rating = 5;

    /******************************************************* SINGLE JOB   *************************************************/


    $scope.current_url = $location.url(); // Get the whole url
    var str = $scope.current_url; // store it in a variable
    splitted_str = str.split('/'); // split it after '/'
    $scope.single_job_id = splitted_str[splitted_str.length - 1]; ////console the array to see the output. access token wass coming in last index

    $scope.singlejob = function (id) {
        $http({
            method: 'GET',
            url: api_base_url + '/jobs/' + $scope.single_job_id + '?expand=region,category,user&access-token=' + $rootScope.auth_token,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
            .then(function (data) {
                $scope.sjob = data.data;
                console.log(data);
                var str = $scope.sjob.image;
                $scope.job_images = str.split(',');
                console.log($scope.job_images);
                setTimeout(function () {
                    $('#owl-demo2').owlCarousel({ margin: 20, nav: true, autoplay: true, responsive: { 0: { items: 1 }, 480: { items: 2 }, 700: { items: 4 }, 1000: { items: 3 }, 1100: { items: 5 } } });
                }, 500);

            }, function (error) {
                console.log(error);

            });
    };

    $scope.singlejob();

    /******************************************************* SINGLE sjobCtrl ENDS HERE *************************************************/

});