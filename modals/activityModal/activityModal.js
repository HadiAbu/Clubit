/**
 * Created by ameen_msarweh on 10/05/2015.
 */
clubItModuleVar.controller('ActivityModalController',function($scope,$modalInstance){

    $scope.cancel = function(){
        $modalInstance.dismiss('cancel');
    }


    $scope.ok = function(){
        $modalInstance.close({
            newTitleText: $scope.newTitleText,
            newContentText: $scope.newContentText
        });
    }


});