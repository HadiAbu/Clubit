/**
 * Created by Admin on 4/30/2015.
 */
clubItModuleVar.controller('NewActivityNameController',function($scope,$modalInstance){

    $scope.cancel = function(){
        $modalInstance.dismiss('cancel');
    }


    $scope.ok = function(){
        $modalInstance.close({
            activityName:$scope.activityName,
            files: $scope.imageName
            }

        );
    };

    $scope.uploadFile = function(files) {
        console.log(files);
        $scope.imageName=files;
    };

});
