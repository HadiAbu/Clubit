/**
 * Created by Admin on 5/10/2015.
 */
/**
 * Created by Admin on 4/27/2015.
 */
clubItModuleVar.controller("SocialController", function (parseAssociatedFileService,socialService,$scope,$state,$controller,navbarService,activitiesService
    ,parseClassService,configurationService,$modal) {
    $controller('ParentController',{$scope : $scope});
    console.log($scope.userType);
    console.log( navbarService.userType);
    $scope.name=navbarService.findByState('social').theName;
    navbarService.initState($scope.name);


    $scope.getSocialId = function(data)
    {
        socialService.socialId = data.results[0].objectId;
        $scope.socialId = socialService.socialId;
        console.log( $scope.socialId );
        parseClassService.getObject('Social',$scope.socialId,$scope.getSocialSuccess,null);
    }
    $scope.initSocial = function() {
        parseClassService.getTable('Social',$scope.getSocialId,null);
    }



    $scope.getSocialPictures = function(data)
    {
        console.log(data);
        configurationService.getRelatedPictures('Social','socialPictures',data.results[0].objectId,$scope.fillSocialPicsArray,null);
    };


    $scope.getSocialSuccess = function(data){
        configurationService.getRelatedPictures('Social','socialPictures',data.objectId,$scope.getPictures,null);

    };

    $scope.getPictures = function(data){
        console.log(data);
        socialService.socialPictures=data.results;
        $scope.currentImage = "";
        var i=0;
        $scope.tempPic =[];
        for(indx in data.results){
            $scope.pdt = new Date(data.results[indx].pictureDate.iso);

            if($scope.pdt.toDateString() == $scope.dt.toDateString()){
                $scope.tempPic[i] = data.results[indx];
                i++;
            }
        }
        if(i==0) {
            $scope.currentImage =  "assets/NoImageFound.jpg";
        }else {
            $scope.setCurrentImage($scope.tempPic[0].picture.url);
        }

    };

    $scope.setCurrentImage = function(image){
            $scope.currentImage = image;
    }



    $scope.today = function() {
        $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function () {
        $scope.dt = null;
    };


    $scope.toggleMin = function() {
        $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = true;
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[3];

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 2);
    $scope.events =
        [
            {
                date: tomorrow,
                status: 'full'
            },
            {
                date: afterTomorrow,
                status: 'partially'
            }
        ];

    $scope.getDayClass = function(date, mode) {
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0,0,0,0);

            for (var i=0;i<$scope.events.length;i++){
                var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }

        return '';
    };

    $scope.$watch('dt' ,function(){
        $scope.initSocial();
    });


    $scope.addSocialPic= function(){
        var modalInstance= $modal.open({
            templateUrl: 'modals/socialPhotoModal/socialPhotoModal.html',
            controller:'SocialModalController',
            size: 'md'
        });
        modalInstance.result.then(
            function(returnValue) {
                parseAssociatedFileService.uploadAssociatedFile(returnValue.photo,'sp.jpg','picture','Picture',function(data){
                    $scope.pictureId = data.objectId;
                    parseClassService.updateObject('Picture',data.objectId,function(data){
                        configurationService.updateRelatedPictures('Social','socialPictures',$scope.socialId,$scope.pictureId
                            ,function(data){
                                //$scope.initSocial();

                                $scope.dt=new Date(returnValue.date.iso);
                            },null);
                    },null,{
                        pictureDate:returnValue.date
                    });
                },null,null);



            }
        );
    };

});