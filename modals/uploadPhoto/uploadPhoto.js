/**
 * Created by Admin on 4/30/2015.
 */

clubItModuleVar.controller('UploadModalController', function ($scope,$http,$modalInstance) {
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
    $scope.ok = function () {
        console.log($scope.imageName);
        $modalInstance.close($scope.imageName);
    };
    $scope.uploadFile = function(files) {
        console.log(files);
        $scope.imageName=files;
    };
});