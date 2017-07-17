/*Home*/
app.controller('cdashCtrl', function ($http, $scope, $location, $compile, $rootScope, toaster, $route, $window, $routeParams, Upload, $timeout) {

    $scope.hide_div = false;
    $scope.show = 1;
    $scope.isNavCollapsed = true;
    $scope.isCollapsed = false;
    $scope.isCollapsedHorizontal = false;
    $scope.numlimit = 50;
    $scope.half = true;
    $('a.list-group-item').click(function () {
        $('a.list-group-item').removeClass("active");
        $(this).addClass("active");
    });
    $scope.readonly = 2.5;
    $scope.static_rating = 5;

    /*********************************************** View Profile **********************************************/

    $scope.profileData = {};
    $scope.jobData = {};

    $scope.viewprofile = function (id) {
        $http({
            method: 'GET',
            url: api_base_url + '/users/' + id + '?access-token=' + $rootScope.auth_token,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(function (data) {
            $scope.profileData = data.data;
            ////console.log($scope.profileData.address);
            /*Need to show these two fields address and contact no in post job thats why defined here */
            $scope.jobData.address = $scope.profileData.address;
            $scope.jobData.contact_no = $scope.profileData.contact_no;
            ////console.log($scope.profileData.address);
        }, function (error) {
            ////console.log(error);

        });
    };


    /************************************************** View Profile ends here ************************************/

    /************************************************** Update Profile ************************************/

    $scope.updateprofile = function (id) {
        $http({
            method: 'PUT',
            url: api_base_url + '/users/' + $rootScope.id + '?access-token=' + $rootScope.auth_token,
            data: $.param($scope.profileData),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
            .then(function (data) {
                toaster.pop('success', "", "Successfully Update Profile", null, 'trustedHtml');
                $route.reload();

            }, function (error) {
                ////console.log(error);

            });
    };

    /************************************************** Update Profile ends here ************************************/


    /*********************************************** Preferred Regions **********************************************/

    var pr = this;          //for searchable dropdwn
    $scope.pref_regions = function () {
        $http({
            method: 'GET',
            url: api_base_url + '/regions?access-token=' + $rootScope.auth_token,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(function (data) {
            $scope.regions = data.data.items;
            pr.regions = $scope.regions;
            ////console.log($scope.regions);
        }, function (error) {
            ////console.log(error);

        });
    };

    /************************************************** Preferred Regions ends here ************************************/

    /*********************************************** Preferred Categories **********************************************/

    var pc = this;
    $scope.pref_categories = function () {
        $http({
            method: 'GET',
            url: api_base_url + '/categories?access-token=' + $rootScope.auth_token,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(function (data) {
            $scope.pref_categories = data.data.items;
            pc.categories = $scope.pref_categories;
            //console.log($scope.pref_categories);
        }, function (error) {
            ////console.log(error);

        });
    };

    /************************************************** Preferred Categories ends here ************************************/

    /************************************************** Post Job ends here ************************************************/

    $scope.postjob = function () {
        $scope.jobData.image = $scope.multi_images_result;
        $scope.jobData.status = 1;     // Create a job with status = 1 -> Pending
        $http({
            method: 'POST',
            url: api_base_url + '/jobs?access-token=' + $rootScope.auth_token,
            data: $.param($scope.jobData),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
            .then(function (data) {
                toaster.pop('success', "", "Successfully Postd Job", null, 'trustedHtml');
                $scope.jobData = [];
                $route.reload();

            }, function (error) {
                if (error.data.region_id)
                    toaster.pop('error', "", error.data.region_id[0], null, 'trustedHtml');
                if (error.data.category_id)
                    toaster.pop('error', "", error.data.category_id[0], null, 'trustedHtml');
                if (error.data.title)
                    toaster.pop('error', "", error.data.title[0], null, 'trustedHtml');
                if (error.data.price)
                    toaster.pop('error', "", error.data.price[0], null, 'trustedHtml');
                if (error.data.date)
                    toaster.pop('error', "", error.data.date[0], null, 'trustedHtml');
                if (error.data.image)
                    toaster.pop('error', "", error.data.image[0], null, 'trustedHtml');
                if (error.data.address)
                    toaster.pop('error', "", error.data.address[0], null, 'trustedHtml');
                if (error.data.contact_no)
                    toaster.pop('error', "", error.data.contact_no[0], null, 'trustedHtml');

            });
    };

    /************************************************** Post job ends here *******************************************/

    /************************************************** List customer posted jobs here ************************************/

    $scope.list_job = function () {
        $http({
            method: 'GET',
            url: api_base_url + '/job/customer-jobs?expand=region,category,user&access-token=' + $rootScope.auth_token,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(function (data) {
            $scope.ljobs = data.data.items;
            ////console.log($scope.ljobs);
        }, function (error) {
            ////console.log(error);

        });
    };

    /************************************************** List customer posted jobs ends here ************************************/

    /************************************************** Calling functions ends here *******************************************/

    $scope.pref_regions();
    $scope.pref_categories();
    $scope.list_job();

    /************************************************** Calling Function ends here ************************************/

    /************************************************** Delete Single Job  ************************************************/

    $scope.del_job = function (id) {
        ////console.log(id);
        if ($window.confirm('Are you sure you want to delete this job?')) {

            $http.delete(api_base_url + '/jobs/' + id + '?expand=region,category,user&access-token=' + $rootScope.auth_token,
                { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
                .then(function (data) {
                    toaster.pop('success', "", "Successfully Product Job ", null, 'trustedHtml');
                    $scope.list_job();
                    //$route.reload();

                }, function (error) {
                    ////console.log(error);

                });
        }
        else {
            return false;
        };

    };
    /************************************************** Delete Single Job  ends here ************************************************/

    /************************************************** Update Single Job ends here ************************************************/

    $scope.updatejob = function (id) {
        $scope.jobData.status = 2;     // Create a job with status = 2 -> In progress
        console.log($scope.update_job_images);
        if (!$scope.update_job_images.length) {
            $scope.update_job_images.push(0);
            $scope.jobData.image = [];
            $scope.jobData.image = $scope.update_job_images;
        }
        else {
            $scope.jobData.image = $scope.update_job_images;
        }
        console.log($scope.jobData);

        $http({
            method: 'PUT',
            url: api_base_url + '/jobs/' + id + '?expand=region,category,user&access-token=' + $rootScope.auth_token,
            data: $.param($scope.jobData),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
            .then(function (data) {
                toaster.pop('success', "", "Successfully Update Job", null, 'trustedHtml');
                $route.reload();

            }, function (error) {
                ////console.log(error);

            });
    };

    /************************************************** Update single job ends here *******************************************/

    /****************************************************Modal Starts here for job view ***************************************/

    // $scope.viewJobModel = function (job) { // For view job
    //     /* Passing the object from function call and then put in page object, dont need view single job api*/
    //     $scope.page = job;
    //     // $('#cust_view_job').modal('toggle');
    //     $scope.show = 5;
    // };

    $scope.viewUpdateModel = function (job) {
        $scope.jobData = job;
        console.log($scope.jobData);
        if ($scope.jobData.image) {
            var str = $scope.jobData.image;
            $scope.update_job_images = str.split(',');
            console.log($scope.update_job_images);
        }

        // $('#cust_update_job').modal('toggle');
        $scope.show = 6;
    };

    $scope.remove_up_upload_img = function (index) {
        $scope.update_job_images.splice(index, 1);
        console.log($scope.update_job_images);
    }

    $scope.viewProfileModel = function (profile) { // For view cleaners profile
        $scope.profile = profile.user;
        // //console.log($scope.profile);
        // $('#clean_profile').modal('toggle');
        $scope.show = 7;
    };

    /****************************************************Modal end here for job view ***************************************/

    /************************************************** Add preferredform ends here ************************************/

    $scope.searchcleanData = {};
    $scope.show_search_clean = true;
    $scope.show_table_clean = false;
    $scope.search_cleaners = function () {
        if (!$scope.searchcleanData.category_id)
            $scope.searchcleanData.category_id = "";
        if (!$scope.searchcleanData.region_id)
            $scope.searchcleanData.region_id = "";
        $http({
            method: 'GET',
            url: api_base_url + '/cleaners?category=' + $scope.searchcleanData.category_id + '&region=' + $scope.searchcleanData.region_id + '&expand=user&access-token=' + $rootScope.auth_token,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
            .then(function (data) {
                ////console.log(data);
                $scope.rsc = data.data.items;  // result search cleaner
                console.log(data.data.items.length);
                $scope.length_of_result = "";
                $scope.length_of_result = data.data.items.length;
                $scope.show_search_clean = false;
                $scope.show_table_clean = true;

            }, function (error) {
                ////console.log(error);

            });
    };

    /************************************************** Add preferredform ends here ************************************/

    /****************************************************All Users ***************************************************** */
    //var users = this;
    $scope.all_cleaners_list = function () {
        $http
            ({
                method: 'GET',
                url: api_base_url + '/user/get-cleaner?access-token=' + $rootScope.auth_token,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
            .then(function (response) {
                $scope.all_cleaners = response.data;
                console.log($scope.all_cleaners);
                //users.users = $scope.users;
            }, function (error) {
                console.log(error);
            });
    };

    /****************************************************All Users ends here ***************************************************** */

    /************************************************** Customer giving rating ****************************************** */

    $scope.ratingData = {};
    // $scope.ratingData.rating = 5;
    $scope.ratingData.job_id = $routeParams.jobid;
    $scope.ratingData.customer_user_id = $rootScope.id;  /* Customer Id */
    ///$scope.ratingData.cleaner_id = 43;
    $scope.ratingData.review = "Its been a wonderfull experience with you. Really Enjoyed and glad to spent some quality time chit chats. Please leave feed back to let others know how was Your experience with Me";
    $scope.ratingData.rated_by = $rootScope.role;

    $scope.cleaner_rating = function () {
        $http({
            method: 'POST',
            url: api_base_url + '/ratings?access-token=' + $rootScope.auth_token,
            data: $.param($scope.ratingData),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
            .then(function (data) {
                toaster.pop('success', "", "You have given rating Successfully", null, 'trustedHtml')
                $location.path('/cust-dash');
                console.log(data);

            }, function (error) {
                if (error.data[1].message)
                    toaster.pop('error', "", error.data[1].message, null, 'trustedHtml');
                if (error.data[2].message)
                    toaster.pop('error', "", error.data[2].message, null, 'trustedHtml');

            });
    };


    /************************************************** Customer giving rating ends here ****************************************** */

    /************************************************* Multiple file upload **********************************************************/



    $scope.uploadFiles = function (files, is_update) {
        var Photos = [];
        Photos.image = [];
        $scope.files = files;
        $scope.fileselected = true;
        for (var i = 0; i < $scope.files.length; i++) {
            Photos.image.push($scope.files[i]);
        }
        if (files && files.length) {
            Upload.upload({
                url: api_base_url + '/upload/multi-upload?access-token=' + $rootScope.auth_token,
                headers: { 'Authorization': $rootScope.auth_token },
                data: { Photos: Photos }
            }).then(function (response) {
                $timeout(function () {
                    $scope.fileselected = false;
                    if (is_update == 1) {
                        /* If there is no data in update_job_image then push the array as itis init */
                        if (!$scope.update_job_images) {
                            $scope.update_job_images = response.data;
                            console.log($scope.update_job_images);
                        }
                        /* If there is  data in update_job_image then take the data out one by one and push in array */
                        else {
                            for (var i = 0; i < response.data.length; i++)
                                $scope.update_job_images.push(response.data[i]);
                            console.log($scope.update_job_images);
                        }
                    }
                    else {
                        $scope.multi_images_result = response.data;
                        console.log(response);
                    }
                });
            }, function (response) {
                if (response.status > 0) {
                    $scope.errorMsg = response.status + ': ' + response.data;
                }
            }, function (evt) {
                $scope.progress =
                    Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        }
    };


    /**************************************************Multiple file ends here ********************************************************/

    /****************************************************Get Ads***************************************************** */

    $scope.get_ads = function () {
        $http
            ({
                method: 'GET',
                url: api_base_url + '/ad-pool/show-ads?access-token=' + $rootScope.auth_token,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
            .then(function (response) {
                $scope.all_ads = response.data;
                console.log($scope.all_ads);
            }, function (error) {
                console.log(error);
            });
    };

    $scope.get_ads();

    /****************************************************All Users ends here ***************************************************** */

});



