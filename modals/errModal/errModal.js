/**
 * Created by Admin on 5/4/2015.
 */
clubItModuleVar.controller('errController',function($scope,$modalInstance){

    $scope.ok = function(){
        $modalInstance.dismiss('cancel');
    };
    //$scope.ok = function(){
    //    $modalInstance.close({
    //
    //        userTabInput :$scope.userTabInput
    //
    //
    //    });
    //}


});
