/**
 * Created by ameen_msarweh on 13/05/2015.
 */
/**
 * Created by Admin on 4/30/2015.
 */
clubItModuleVar.controller('SocialModalController',function($scope,$modalInstance){

    $scope.cancel = function(){
        $modalInstance.dismiss('cancel');
    };

    //{
    //    "__type": "Date",
    //    "iso": "2011-08-21T18:02:52.249Z"
    //}
    $scope.ok = function(){
        var ndt = new Date($scope.date).toISOString();
        console.log(new Date($scope.date).toISOString());
        $modalInstance.close({

           photo : $scope.photo,
            date : { __type: "Date",iso:ndt}
        });
    }

    $scope.uploadFile = function(files) {
        console.log(files);
        $scope.photo=files;
    };


});
