/**
 * Created by ameen_msarweh on 13/05/2015.
 */
/**
 * Created by Admin on 4/30/2015.
 */
clubItModuleVar.controller('GuideModalController',function($scope,$modalInstance){

    $scope.cancel = function(){
        $modalInstance.dismiss('cancel');
    };


    $scope.ok = function(){
        $modalInstance.close({

            newGuideName :$scope.newGuideName,
            newGuideContent : $scope.newGuideContent,
            newGuideProfile : $scope.imageName
        });
    }

    $scope.uploadFile = function(files) {
        console.log(files);
        $scope.imageName=files;
    };


});
