/**
 * Created by Admin on 4/20/2015.
 */

clubItModuleVar.controller('MainController',
    function($scope,$controller,$state,$http,navbarService ,configurationService,
            $modal,parseClassService ,massageInMainService ,parseAssociatedFileService) {

        //$scope.userType='admin';
        document.body.style.backgroundImage="";
        document.body.style.fontFamily='Georgia';
        $controller('ParentController',{$scope : $scope});

        $scope.name=navbarService.findByState('main').theName;
        navbarService.initState($scope.name);


        $scope.allMessagesArr = massageInMainService.massageInMainArr;

        //carusell!!!!
        $scope.myInterval = 3000;
            var messages = $scope.messages = [];
            var currentDate= $scope.currentDate = new Date();
   

//--------------------
        $scope.slides = [];
        $scope.tempPic = [];
        $scope.getPictures = function(data){
            console.log(data);
            for (i = 0; i < data.results.length; i++) {
                $scope.tempPic[i] = new Picture(
                    data.results[i].objectId,
                    data.results[i].picture
                );
                //console.log($scope.tempPic[i].theImage.url);
                $scope.slides.push({
                    id: $scope.tempPic[i].theParseId,
                    Image: $scope.tempPic[i].theImage
                });
            }
        };
    //carusell!!!!

    $scope.CarouselFunction = function() {
        $scope.myInterval = 3000;
        configurationService.getRelatedPictures('Account','companyCarouselPictureIds',$scope.MainAccount.theParseId,$scope.getPictures,null);
    };
    //$scope.CarouselFunction();
    $scope.updateAccountCarouselPics = function(data){
        configurationService.updateRelatedPictures('Account','companyCarouselPictureIds',$scope.MainAccount.theParseId);
    };


       var MeinIndex;
    $scope.CarouselClick = function (index) {
        MeinIndex=index;
        var modalInstance = $modal.open({
            templateUrl: 'modals/uploadPhoto/uploadPhoto.html',
            controller: 'UploadModalController',
            size: 'md'
        });

        modalInstance.result.then(
            function (returnValue) {

                parseAssociatedFileService.updateAssociatedFile(
                    $scope.tempPic[index].theParseId,returnValue
                    ,'Clubit'+index+'.jpg','picture','Picture',null,null,function(data){
                        console.log($scope.tempPic[index])
                        $scope.tempPic[index].theImage=data.data;
                        $scope.slides[index].Image=data.data;
                        console.log(data)
                    });

            },
            function () { }
        );
    };
        $scope.UpdatePhoto = function(data){
            console.log(data);
            console.log($scope.tempPic[MeinIndex]);
            console.log(MeinIndex);
            $scope.tempPic[MeinIndex].theImage = data.picture;
            $scope.tempPic[MeinIndex].Image = data.picture;
        };
        /////bushra
        $scope.addSlide = function () {
            var modalInstance = $modal.open({
                templateUrl: 'modals/addSlideModal/addSlideModal.html',
                controller: 'addSlideController',
                size: 'sm'
            });
            modalInstance.result.then(
                function (returnValue) {
                    parseAssociatedFileService.uploadAssociatedFile(returnValue,'imageI',"picture","Picture",$scope.updateAccount,null,null);
                },
                function () { }
            );
        };
        //////

        $scope.updateAccount = function(data){
            console.log("in update account");
            console.log(data.objectId);
            $scope.printLOG = function (data){console.log(data)};
            configurationService.updateRelatedPictures('Account',
                "companyCarouselPictureIds",
                $scope.MainAccount.theParseId,
                data.objectId,
                function(data){
                    $scope.slides = [];
                    $scope.tempPic = [];
                    $scope.CarouselFunction();

                },null);
        };


//--------------------
    //$scope.addSlide = function() {
    //    var newWidth = 600 + slides.length + 1;
    //    slides.push();
    //};
    //
    //for (var i=0; i<4; i++) {
    //    $scope.addSlide();
    //}

        $scope.addMessages = function() {
            //var newWidth = 600 + messages.length + 1;
            var msgD = {
                content:'new message content ',
                date : '22-2-55',
                title:'new message  title'
            }
            var modalInstance= $modal.open({
                templateUrl: 'modals/MessageInMainModal/MessageInMainModal.html',
                controller:'TextMessageController',
                size: 'md'
            });
            modalInstance.result.then(
                function(returnValue){
                     msgD.title = returnValue.title;
                    msgD.date = returnValue.date;
                    msgD.content = returnValue.content;


            parseClassService.createObject('Message',msgD,function(data){
                console.log(data);
                $scope.printLOG = function(data){ console.log(data);};
                configurationService.updateRelatedMessage('Account',
                    "messages",
                    navbarService.MainAccount.theParseId,
                    data.objectId,
                    null,null);
                //configurationService.getRelatedPictures('Account','messages',$scope.MainAccount.theParseId ,$scope.printLOG,null)

                var message = new Message(data.objectId,msgD.date,msgD.title,msgD.content);
                massageInMainService.massageInMainArr.push(message);
                $scope.allMessagesArr = massageInMainService.massageInMainArr;
            },null);

            });
        };


    $scope.openVideoDialog= function(){
        var modalInstance= $modal.open({
            templateUrl: 'modals/videoModal/videoModal.html',
            controller:'EditVideoController',
            size: 'sm'
        });
        modalInstance.result.then(
            function(returnValue){
                //$scope.resultFromDialog=returnValue.videoUrl;
                $scope.MainAccount.theCompanyVideo = returnValue.videoUrl;
                parseClassService.updateObject('Account',$scope.MainAccount.theParseId,null,null,{companyVideo:returnValue.videoUrl});
            }
        );
    };


        $scope.openTextDialog= function(){
        var modalInstance= $modal.open({
            templateUrl: 'modals/mainPageModalText/mainPageModalText.html',
            controller:'EditTextController',
            size: 'md'
        });
        modalInstance.result.then(
            function(returnValue){

                $scope.MainAccount.companyMainTextTitle = returnValue.newTitleText;
                parseClassService.updateObject('Account',$scope.MainAccount.theParseId,null,null,{companyMainTextTitle:returnValue.newTitleText});

                $scope.MainAccount.companyMainTextContent = returnValue.newContentText;
                parseClassService.updateObject('Account',$scope.MainAccount.theParseId,null,null,{companyMainTextContent:returnValue.newContentText});

            }
        );
    };
    // messages
    $scope.MainAccount = $scope.$parent.MainAccount;
    $scope.$on('AccountChanged',function(event,main){
        console.log('change triggered');
        $scope.MainAccount = main;
       $scope.initMessages();
    });

    $scope.UpdateMessages = function(data){
        console.log(data);

        for(mes in data.results){
           massageInMainService.massageInMainArr[mes] = new Message(data.results[mes].objectId,
                data.results[mes].date,data.results[mes].title,data.results[mes].content);
            $scope.allMessagesArr[mes] = massageInMainService.massageInMainArr[mes];
        }
        console.log($scope.allMessagesArr);

    };
    $scope.initMessages = function()
    {
        console.log("in initMessages")
        configurationService.getRelatedMessages('Account','messages',$scope.MainAccount.theParseId,$scope.UpdateMessages,null);


    };




    //$scope.saveMessageId = function(data){
    //    $scope.newMessage.messageParseId = data.objectId;
    //    massageInMainService.massageInMainArr.push($scope.newMessage);
    //    configurationService.updateRelatedMessage('Account','messages',$scope.MainAccount.theParseId,$scope.newMessage.messageParseId,null,null);
    //}
        $scope.messageClick= function(messageId){
            if(navbarService.userType == 'admin'){
        var modalInstance= $modal.open({
            templateUrl: 'modals/MessageInMainModal/MessageInMainModal.html',
            controller:'TextMessageController',
            size: 'md'
        });
        modalInstance.result.then(
            function(returnValue){

                var index = massageInMainService.findMessageByParseId(messageId);

                returnValue.theParseId = messageId;
                $scope.messageIdToChange = messageId;
                massageInMainService.massageInMainArr[index] = returnValue;
                $scope.allMessagesArr[index] = massageInMainService.massageInMainArr[index];
                $scope.updateSuccess = function(data){
                    configurationService.updateRelatedMessage('Account','messages',
                        $scope.MainAccount.theParseId,$scope.messageIdToChange,null,null);
                };
                parseClassService.updateObject('Message',returnValue.theParseId, null,null,
                    {date:returnValue.date,content:returnValue.content,title:returnValue.title});
            }
        );
            }};

    });

