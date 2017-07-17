/*Home*/
app.controller('homeCtrl', function ($http,$scope,$location,$compile,$rootScope) {
    $http({
        method: 'GET',
        url: api_base_url+'/categories'
    }).then( function(response){
        console.log(response);
    }, function(error){
        console.log(error);
    });
});
