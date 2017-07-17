/*Home*/
app.controller('dashCtrl', function ($http, $scope, $location, $compile, $rootScope, toaster, $uibModal, $log, $document, $route, $routeParams, Upload, $timeout) {

    $scope.dash_show = 1;
    $scope.isNavCollapsed = true;
    $scope.isCollapsed = false;
    $scope.isCollapsedHorizontal = false;

    $('a.list-group-item').click(function () {
        $('a.list-group-item').removeClass("active");
        $(this).addClass("active");
    });

    $scope.customerid = parseInt($routeParams.customerid);

    /*********************************************** View Profile **********************************************/

    $scope.profileData = {};
    $scope.viewprofile = function () {
        $http({
            method: 'GET',
            url: api_base_url + '/users/' + $rootScope.id + '?access-token=' + $rootScope.auth_token,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(function (data) {
            $scope.profileData = data.data;
            // console.log($scope.profileData);
        }, function (error) {
            //console.log(error);

        });
    };

    //  $scope.viewprofile();

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
                //console.log(error);

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
            console.log($scope.regions);
        }, function (error) {
            //console.log(error);

        });
    };

    /************************************************** Preferred Regions ends here ************************************/

    /************************************************ Preferred Categories **********************************************/

    var pc = this;          //for searchable dropdwn
    $scope.pref_categories = function () {
        $http({
            method: 'GET',
            url: api_base_url + '/categories?access-token=' + $rootScope.auth_token,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(function (data) {
            $scope.categories = data.data.items;
            pc.categories = $scope.categories;
            console.log($scope.categories);
        }, function (error) {
            //console.log(error);

        });
    };
    /************************************************** Preferred Categories ends here ************************************/

    /************************************************** Calling functions ends here ************************************/

    $scope.pref_regions();
    $scope.pref_categories();

    /************************************************** Calling Function ends here ************************************/

    /********************************************************* View profile used for pre selected values ************************************************/

    var vm = this; // used for pre selected 

    $scope.view_profile = function () {
        $http({
            method: 'GET',
            url: api_base_url + '/cleaner/view-profile?access-token=' + $rootScope.auth_token + '&expand=cleaner_categories,cleaner_regions,user',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(function (data) {
            $scope.vprofile = data.data.items[0];
            //console.log($scope.vprofile);
            //console.log($scope.vprofile.cleaner_categories);
            // used for pre selected 
            // vm.categoriess = data.data.items[0].cleaner_categories;
            //vm.regionss = data.data.items[0].cleaner_regions;

            $scope.categoriess = data.data.items[0].cleaner_categories;
            $scope.regionss = data.data.items[0].cleaner_regions;

        }, function (error) {
            //console.log(error);

        });
    };

    $scope.view_profile();

    /********************************************************* View profile ends here ************************************************/

    /************************************************** Add preferredform  here ************************************/

    $scope.dashboardData = {};
    $scope.sub_category_id = [];
    $scope.preferredform = function () {

        if ($scope.regionss.length == '0') {
            toaster.pop('warning', "", "Please select at least one region", null, 'trustedHtml');
            return;
        }
        if ($scope.categoriess.length == '0') {
            toaster.pop('warning', "", "Please select at least one category", null, 'trustedHtml');
            return;
        }
        var reg;
        var i = 0;
        var region_id = {};
        for (reg in $scope.regionss) {
            var key_name = "region_id[" + i + "]";
            region_id[key_name] = $scope.regionss[i].id;
            i++;
        }

        var cat;
        var j = 0;
        var cat_id = {};
        for (cat in $scope.categoriess) {
            var key_name = "category_id[" + j + "]";
            cat_id[key_name] = $scope.categoriess[j].id;
            j++;
        }
        ////console.log(cat_id);
        ////console.log(region_id);

        $scope.assign_cat(jQuery.param(cat_id));

        $scope.assign_reg(jQuery.param(region_id));
        $scope.dashboardData = [];

    };

    $scope.assign_cat = function (categories) {
        //console.log(categories);
        $http({
            method: 'POST',
            url: api_base_url + '/cleaner-categories?access-token=' + $rootScope.auth_token,
            data: categories,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
            .then(function (data) {
                if (vm.regionss || vm.categoriess) {
                    toaster.pop('success', "", "Successfully Updated Categories", null, 'trustedHtml');

                }
                else
                    toaster.pop('success', "", "Successfully Added Categories In", null, 'trustedHtml');

            }, function (error) {
                //console.log(error);

            });
    };

    $scope.assign_reg = function (regions) {
        //console.log(regions);
        $http({
            method: 'POST',
            url: api_base_url + '/cleaner-regions?access-token=' + $rootScope.auth_token,
            data: regions,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
            .then(function (data) {
                if (vm.regionss || vm.categoriess) {
                    toaster.pop('success', "", "Successfully Updated Regions", null, 'trustedHtml');

                }
                else
                    toaster.pop('success', "", "Successfully Added Regions In", null, 'trustedHtml');
            }, function (error) {
                //console.log(error);

            });
    };

    /************************************************** Add preferredform ends here ************************************/

    /************************************************** List cleaner jobs here ************************************/

    $scope.list_job = function () {
        $http({
            method: 'GET',
            url: api_base_url + '/job/customer-jobs?expand=region,category,user&access-token=BlOsxlz01qLySHWR_xmnJOdSxFFY5gpn',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(function (data) {
            $scope.ljobs = data.data.items;
            //console.log($scope.ljobs);
        }, function (error) {
            //console.log(error);

        });
    };

    /************************************************** List cleaner jobs ends here ************************************/

    $scope.list_job();

    /****************************************************Modal Starts here for job view ***************************************/

    $scope.viewJobModel = function (job) {
        /* Passing the object from function call and then put in page object, dont need view single job api*/
        $scope.page = job;
        //console.log($scope.page);
        //     $('#view_job').modal('toggle');
        $scope.dash_show = 5;
    };

    /****************************************************Modal end here for job view ***************************************/

    /************************************************** Add preferredform ends here ************************************/

    $scope.searchData = {};
    $scope.show_search = true;
    $scope.show_table = false;
    $scope.search_job = function () {
        $http({
            method: 'GET',
            url: api_base_url + '/jobs?expand=region,category&access-token=' + $rootScope.auth_token,
            params: {
                "category_id": $scope.searchData.category_id,
                "region_id": $scope.searchData.region_id,
                "price": $scope.searchData.price,
                "title": $scope.searchData.title,
                "description": $scope.searchData.description,
                "address": $scope.searchData.address,
                "date": $scope.searchData.date
            }
            ,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
            .then(function (data) {
                //console.log(data);
                $scope.results_search = data.data.items;
                $scope.show_search = false;
                $scope.show_table = true;
                //console.log($scope.show_search);
            }, function (error) {
                //console.log(error);

            });
    };

    /************************************************** Add preferredform ends here ************************************/

    /****************************************************Get subscription***************************************************** */
    //var sb = this; // used for pre selected 
    $scope.get_subscriptions = function () {
        $http({
            method: 'GET',
            url: api_base_url + '/subscriptions?access-token=' + $rootScope.auth_token,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(function (data) {
            $scope.all_subscriptions = data.data.items;
            console.log($scope.all_subscriptions);
            // sb.all_subscriptions = data.data;
        }, function (error) {
            console.log(error);

        });
    };

    /****************************************************Get subscription ends here ***************************************************** */

    /****************************************************Get subscription***************************************************** */
    //var ads = this; // used for pre selected 
    $scope.get_adplaces = function () {
        $http({
            method: 'GET',
            url: api_base_url + '/ad-places?access-token=' + $rootScope.auth_token,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(function (data) {
            $scope.adplaces = data.data.items;
            console.log($scope.adplaces);
            //ads.adplaces = data.data;
        }, function (error) {
            console.log(error);

        });
    };
    $scope.sizeCheck = function () {
        if ($scope.postadData.ad_place_id == 1 || $scope.postadData.ad_place_id == 3) {
            $scope.ad_width = "192";
            $scope.ad_height = "700";
        }
        if ($scope.postadData.ad_place_id == 2) {
            $scope.ad_width = "755";
            $scope.ad_height = "150";
        }
        console.log($scope.ad_width + $scope.ad_height);
    }


    /****************************************************Get subscription ends here ***************************************************** */

    /**************************************************** Post Ad************************************************************************ */
    $scope.postadData = {};
    $scope.post_ad = function () {
        if (!$scope.postadData.image) {
            toaster.pop('Warning', "", "Please Upload an Image", null, 'trustedHtml')
            return;
        }
        $http({
            method: 'POST',
            url: api_base_url + '/ad-pools?access-token=' + $rootScope.auth_token,
            data: $.param($scope.postadData),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
            .then(function (data) {
                toaster.pop('success', "", "Successfully Posted Ad", null, 'trustedHtml')
                $scope.postadData = {};
                $scope.f = {};   //  To remove the loading bar and file name
                console.log(data);
            }, function (error) {
                for (var i = 0; i <= error.data.length; i++)
                    toaster.pop('warning', "", error.data[i].message, null, 'trustedHtml')

                console.log(error);

            });
    };

    /**************************************************** Post Ad ends here *************************************************************************/

    /************************************************** Customer giving rating ****************************************** */
    $scope.ratingData = {};
    $scope.ratingData.job_id = $routeParams.jobid;
    $scope.ratingData.customer_user_id = $routeParams.customerid; /* Customer Id */
    $scope.ratingData.cleaner_user_id = $rootScope.id;
    $scope.ratingData.review = "Its been a wonderfull experience with you. Really Enjoyed and glad to spent some qualitytime chit chats. Please leave feed back to let others know how was Your experience with Me.";
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
                $location.path('/dash');
                console.log(data);
            }, function (error) {
                if (error.data[1].message)
                    toaster.pop('error', "", error.data[1].message, null, 'trustedHtml');

            });
    };


    /************************************************** Customer giving rating ends here ****************************************** */

    /************************************************** FiLe Upload ****************************************************************/

    $scope.uploadFiles = function (file, errFiles) {
        $scope.f = file;
        $scope.fileselected = true;
        $scope.errFile = errFiles && errFiles[0];
        if (file) {
            file.upload = Upload.upload({
                url: api_base_url + '/upload/upload?access-token=' + $rootScope.auth_token,
                headers: { 'Authorization': $rootScope.auth_token },
                data: { data: file }
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                    $scope.fileselected = false;
                    $scope.postadData.image = response.data;
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 *
                    evt.loaded / evt.total));
            });
        }

    }

    /************************************************** File Upload ***************************************************************/

    /************************************************** Checkbox is checked *******************************************************/

    // $scope.isTrue = function (id, whichCheckbox) {
    //     if ($scope.categoriess && whichCheckbox == 1) {
    //         for (var i = 0; i < $scope.categoriess.length; i++) {
    //             if ($scope.categoriess[i].id == id) {
    //                 return true;
    //             }
    //         }
    //         return false;
    //     }

    //     if ($scope.regionss && whichCheckbox == 2) {
    //         for (var i = 0; i < $scope.regionss.length; i++) {
    //             if ($scope.regionss[i].id == id) {
    //                 return true;
    //             }
    //         }
    //         return false;
    //     }
    // }

    /************************************************** Checkbox is checked ends here ******************************************** */
});
