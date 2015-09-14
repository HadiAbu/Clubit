
/**
 * Created by bushra on 21/05/2015.
 */
clubItModuleVar.controller('addSlideController', function ($scope,$http,$modalInstance) {
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.ok = function () {
        console.log($scope.imageName);
        $modalInstance.close($scope.imageName);
    };

    $scope.uploadFile = function(files) {
        console.log("in uploadfile addSlide.js");
        console.log(files );
        $scope.imageName=files;


    };
});


