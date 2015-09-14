/**
 * Created by adham jiries on 07/05/2015.
 */
clubItModuleVar.controller('EditCompanyEmailModal',function($scope,$modalInstance){

    $scope.cancel = function(){
        $modalInstance.dismiss('cancel');
    }

    $scope.ok = function(){
        $modalInstance.close({
            userCompanyEmail :$scope.userCompanyEmail
        });
    }
});
