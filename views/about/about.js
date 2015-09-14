
clubItModuleVar.controller("AboutController", function ($scope,$state,navbarService,$controller,parseClassService,$modal) {
    $controller('ParentController',{$scope : $scope});

    $scope.name= navbarService.findByState('about').theName;
    navbarService.initState($scope.name);
    $scope.geocoder = new google.maps.Geocoder();

    $scope.localInit = function() {

        $scope.map = {
            center: {
                latitude: $scope.MainAccount.theComapnyLocaton.latitude,
                longitude: $scope.MainAccount.theComapnyLocaton.longitude
            }, zoom: 16
        };
        console.log($scope.MainAccount.theComapnyLocaton.latitude);
        console.log($scope.MainAccount.theComapnyLocaton.longitude);
        $scope.marker = {
            id: 0,
            coords: {
                latitude: $scope.MainAccount.theComapnyLocaton.latitude,
                longitude: $scope.MainAccount.theComapnyLocaton.longitude
            },
            options: { draggable: false },
            events: {
                dragend: function (marker) {
                    console.log('marker dragend');
                    var lat = marker.getPosition().lat();
                    var lon = marker.getPosition().lng();
                    console.log(lat);
                    console.log(lon);

                    $scope.marker.options = {
                        draggable: true,
                        labelContent: "lat: " + $scope.marker.coords.latitude + ' ' + 'lon: ' + $scope.marker.coords.longitude,
                        labelAnchor: "50 0",
                        labelClass: "marker-labels"
                    };
                }
            }
        }
    }
    $scope.codeAddress = function() {
        //companyLocaton:{"__type":"GeoPoint","latitude":40.0,"longitude":-30.0}
        var address = $scope.MainAccount.theCompanyAddress;
        $scope.geocoder.geocode( { 'address': address}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                //map.setCenter(results[0].geometry.location);
                //console.log(results[0].geometry.location);
                $scope.MainAccount.theComapnyLocaton = {"__type":"GeoPoint","latitude":results[0].geometry.location.G,"longitude":results[0].geometry.location.K};
                console.log($scope.MainAccount.theComapnyLocaton);
                parseClassService.updateObject('Account',$scope.MainAccount.theParseId,$scope.localInit,null,
                    {
                        companyLocation :$scope.MainAccount.theComapnyLocaton
                    });
                console.log(results[0].geometry.location);
                //var marker = new google.maps.Marker({
                //    map: map,
                //    position: results[0].geometry.location
                //});
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    }
    // ------------------ Account details update ---------------------------
    $scope.ChangeCompanyName = function(){
        if($scope.userType=='admin'){
            var modalInstance = $modal.open({
                templateUrl: 'modals/accountModal/companyNameChange.html',
                controller: 'EditCompanyNameModal',
                size: 'sm'

            });
            modalInstance.result.then(
                function(returnValue){
                    $scope.MainAccount.theCompanyName=returnValue.userCompanyName;
                    parseClassService.updateObject(
                        'Account',$scope.MainAccount.theParseId,null,null,
                        {
                            companyName :returnValue.userCompanyName
                        });
                },
                function () {

                }

            )
        }
    }

    $scope.ChangeCompanyDescription = function(){
        if($scope.userType=='admin'){
            var modalInstance = $modal.open({
                templateUrl: 'modals/accountModal/companyDescriptionChange.html',
                controller: 'EditCompanyDescriptionModal',
                size: 'md'

            });
            modalInstance.result.then(
                function(returnValue){
                    $scope.MainAccount.theCompanyDescription=returnValue.userCompanyDescription;
                    //console.log('is this one working?');
                    parseClassService.updateObject(
                        'Account',$scope.MainAccount.theParseId,null,null,
                        {
                            companyDescription :returnValue.userCompanyDescription
                        });
                },
                function () {

                }

            )
        }
    }

    $scope.ChangeCompanyAddress = function(){
        if($scope.userType=='admin'){
            var modalInstance = $modal.open({
                templateUrl: 'modals/accountModal/companyAddressChange.html',
                controller: 'EditCompanyAddressModal',
                size: 'sm'

            });

            modalInstance.result.then(
                function(returnValue){
                    $scope.MainAccount.theCompanyAddress=returnValue.userCompanyAddress;
                    parseClassService.updateObject(
                        'Account',$scope.MainAccount.theParseId,$scope.codeAddress,null,
                        {
                            companyAddress :returnValue.userCompanyAddress
                        });
                },
                function () {

                }

            )
        }
    }

    $scope.ChangeCompanyPhone = function(){
        if($scope.userType=='admin'){
            var modalInstance = $modal.open({
                templateUrl: 'modals/accountModal/companyPhoneChange.html',
                controller: 'EditCompanyPhoneModal',
                size: 'sm'

            });

            modalInstance.result.then(
                function(returnValue){
                    $scope.MainAccount.theCompanyPhone=returnValue.userCompanyPhone;
                    parseClassService.updateObject(
                        'Account',$scope.MainAccount.theParseId,null,null,
                        {
                            companyPhone :returnValue.userCompanyPhone
                        });
                },
                function () {

                }

            )
        }
    }

    $scope.ChangeCompanyEmail = function() {
        if($scope.userType=='admin'){
            var modalInstance = $modal.open({
                templateUrl: 'modals/accountModal/companyEmailChange.html',
                controller: 'EditCompanyEmailModal',
                size: 'sm'

            });

            modalInstance.result.then(
                function(returnValue){
                    $scope.MainAccount.theCompanyEmail=returnValue.userCompanyEmail;
                    parseClassService.updateObject(
                        'Account',$scope.MainAccount.theParseId,null,null,
                        {
                            companyEmail :returnValue.userCompanyEmail
                        });
                },
                function () {

                }

            )
        }
    }


});
