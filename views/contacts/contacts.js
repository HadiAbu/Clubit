/**
 * Created by Admin on 4/26/2015.
 */

clubItModuleVar.controller("ContactsController", function ($scope,$state,navbarService,$controller) {
    $controller('ParentController',{$scope : $scope});
  // $scope.content = "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.  fsggsfgs gsfgs gsgssgsg sjvfoghrkv fivns";
    $scope.name=navbarService.findByState('contacts').theName;
    navbarService.initState($scope.name);


    $scope.activityName = "";
    $scope.picturesArray = [];
    $scope.emplyeesArray = [];
    $scope.vidoesArray = [];
    $scope.description = "";

    var ac = new Activity();




//    -----------android camera---------------
    $scope.onDeviceReady = function() {
        $scope.pictureSource=navigator.camera.PictureSourceType;
        $scope.destinationType=navigator.camera.DestinationType;

    }
    document.addEventListener("deviceready", $scope.onDeviceReady, false);


    // Called when a photo is successfully retrieved
    //
    $scope.onPhotoDataSuccess = function(imageData) {
        $scope.theSrc = "data:image/jpeg;base64," + imageData;
        $scope.$digest();
    };

    $scope.onFail =  function(message) {
        alert('Failed because: ' + message);
    };


    $scope.captureImage = function() {
        navigator.camera.getPicture($scope.onPhotoDataSuccess,
            $scope.onFail, { quality: 50,
                destinationType: $scope.destinationType.DATA_URL });

    }
//    --------------------------

});

