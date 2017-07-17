/*Home*/
app.controller('signupCtrl', function ($http, $scope, toaster, $location, $firebaseAuth) {
    var ref = firebase.database().ref();
    auth = $firebaseAuth(firebase.auth());
    var database = firebase.database();
    $scope.registerData = {};
    $scope.register = function () {
        auth.$createUserWithEmailAndPassword($scope.registerData.email, $scope.registerData.password)
            .then(function (data) {
                $scope.message = "Welcome " + data.uid + ", thanks for registering!";
                console.log(data.uid);
                firebase.database().ref('users/' + data.uid).set({username: $scope.registerData.username, role: $scope.registerData.role,});
            }).catch(function (error) {
        $scope.message = error.message;
        console.log($scope.message);
    });

    };
});
/************************************************************Registration ends here***************************************/
