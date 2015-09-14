
clubItModuleVar.controller('EditTextController',function($scope,$modalInstance){

    $scope.cancel = function(){
        $modalInstance.dismiss('cancel');
    };


    $scope.ok = function(){
        $modalInstance.close({

            newTitleText :$scope.newTitleText,
            newContentText : $scope.newContentText
        });
    }


});
