/**
 * Created by Admin on 4/30/2015.
 */
clubItModuleVar.controller('LogInModalController',function($scope,$modalInstance,AuthService, $log,$modal){

    $scope.cancel = function(){
        $modalInstance.dismiss('cancel');
    };


    $scope.ok = function(){
        $modalInstance.close({

            userInput :$scope.userInput.trim(),
            passwordInput:$scope.passwordInput
            });
    };


    $scope.newUser = function(){

        $modalInstance.close({


        });
        var modalInstance =
            $modal.open({
                templateUrl:'modals/signUpModal/signUpModal.html',
                controller :'signUpModalController',
                size : 'sm'

            });
        modalInstance.result.then(
            function(returnValue){

                var user = new User(returnValue.userInput,returnValue.passwordInput,"member");
                AuthService.signUp(user,
                    function(data){
                        navbarService.userName = data.username;
                        $scope.userName =data.username;
                        navbarService.userType = data.userType;
                        $scope.userType = data.userType;
                    },
                    function(){

                    })
            }
        );
    };

});


