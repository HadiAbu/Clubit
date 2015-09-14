/**
 * Created by Hadi on 28-Jul-15.
 */


clubItModuleVar.controller('SplashController', function ($scope,$controller,$state) {

    //var body = document.getElementsByClassName('bodyClass');
    document.body.style.backgroundImage= "url('assets/energy.jpg')";

    $scope.Continue = function () {
        $state.go('main');
    }
});