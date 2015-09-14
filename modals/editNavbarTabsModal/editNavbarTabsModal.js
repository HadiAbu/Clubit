/**
 * Created by Admin on 5/4/2015.
 */
clubItModuleVar.controller('EditNavbarTabsModalController',function($scope,$modalInstance){

    $scope.cancel = function(){
        $modalInstance.dismiss('cancel');
    }


    $scope.ok = function(){
        $modalInstance.close({

            userTabInput :$scope.userTabInput


        });
    }


});
