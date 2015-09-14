
clubItModuleVar.controller('TextMessageController',function($scope,$modalInstance){

    $scope.cancel = function(){
        $modalInstance.dismiss('cancel');
    };


    $scope.ok = function(){
        $modalInstance.close({
            //messageParseId:"",
            date :$scope.newMessageDate,
            title : $scope.newMessageTitle,
            content : $scope.newMessageContent
        });
    }







});
