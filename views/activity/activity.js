/**
 * Created by Admin on 4/27/2015.
 */
clubItModuleVar.controller("ActivityController", function (configurationService,parseAssociatedFileService,parseClassService,$scope,$state,navbarService,$controller,activitiesService,$modal) {
    $controller('ParentController',{$scope : $scope});

    $scope.tempPic=[];
    $scope.videoUrlParse = "";
    $scope.tempMessages=[];
    $scope.initActivity = function() {
        console.log(activitiesService.CurrentActivity);
        $scope.activityId=  activitiesService.CurrentActivity.parseId;//'6n6obD0RYV';
        $scope.activityName = activitiesService.CurrentActivity.name;//activitiesService.activityName;
        $scope.picturesArray = activitiesService.CurrentActivity.picturesArray;//activitiesService.picturesArray;
        $scope.emplyeesArray = [];//activitiesService.CurrentActivity.emplyeesArray;//activitiesService.emplyeesArray;
        activitiesService.emplyeesArray = [];
        $scope.vidoesArray = activitiesService.CurrentActivity.vidoesArray;//activitiesService.vidoesArray;
        $scope.description = activitiesService.CurrentActivity.description;//activitiesService.description;
        $scope.messagesActivityArray = [];
        activitiesService.messagesArray = [];
        $scope.getActivitySuccess();
    }

    $scope.getActivitySuccess = function(){
        $scope.CurrentActivity=activitiesService.CurrentActivity;
        configurationService.getRelatedPictures('Activity','pictures',$scope.CurrentActivity.parseId,$scope.getPictures,null);
        console.log($scope.CurrentActivity.description);
        $scope.name =activitiesService.activityName= $scope.CurrentActivity.name;
        $scope.description = activitiesService.description= $scope.CurrentActivity.description;
        configurationService.getRelatedVideos('Activity','videos',$scope.CurrentActivity.parseId,$scope.getVideos,null)
        configurationService.getRelatedEmployees('Activity','employees',$scope.CurrentActivity.parseId,$scope.getEmployees,null);
configurationService.getRelatedMessages('Activity','messages',$scope.CurrentActivity.parseId,$scope.getMessages,null);


    };


    $scope.getPictures = function(data){
        console.log(data);
        activitiesService.picturesArray=data.results;
        $scope.tempPic=activitiesService.picturesArray;
        console.log($scope.tempPic[0].picture.url);

    };

    $scope.getVideos = function(data){
        console.log(data);
        activitiesService.vidoesArray = data.results;
        $scope.videoUrlParse = activitiesService.vidoesArray[0].path;
        console.log($scope.videoUrlParse);
    };
    $scope.getEmployees = function (data) {

        for(res in data.results) {

            var employee = new Employee(data.results[res].objectId, data.results[res].employeeName, data.results[res].employeeDescription,data.results[res].employeeProfile.url);
            activitiesService.emplyeesArray.push(employee);
            $scope.EmployeesArray = activitiesService.emplyeesArray;
            console.log(employee)
        }
        console.log(data.results);

    };

    $scope.getMessages = function(data){

        console.log(data.results);
        for(msg in data.results) {
            activitiesService.messagesArray.push(new Message(data.results[msg].objectId,
                data.results[msg].date,data.results[msg].title,data.results[msg].content));
        }
        $scope.messagesActivityArray = activitiesService.messagesArray;
        console.log($scope.messagesActivityArray[0]);

    };




    $scope.openTextDialog= function() {
        if (navbarService.userType=="admin")
            {


            var modalInstance = $modal.open({
                templateUrl: 'modals/activityModal/activityModal.html',
                controller: 'EditTextController',
                size: 'md'
            });
            modalInstance.result.then(
                function (returnValue) {
                    $scope.name = returnValue.newTitleText;
                    $scope.description = returnValue.newContentText;
                    parseClassService.updateObject(
                        'Activity', $scope.activityId, null, null,
                        {
                            name: returnValue.newTitleText,
                            description: returnValue.newContentText
                        });

                    console.log(returnValue.newTitleText);
                }
            );
        }
        ;
    };


    $scope.ChangeActivityBackgroud= function() {

        if (navbarService.userType=="admin") {
            var modalInstance = $modal.open({
                templateUrl: 'modals/uploadPhoto/uploadPhoto.html',
                controller: 'UploadModalController',
                size: 'md'
            });
            modalInstance.result.then(
                function (returnValue) {
                    console.log(returnValue);
                    console.log(returnValue[0]);
                    $scope.tempPic[0].picture = returnValue;
                    $scope.su = function (data) {
                        $scope.tempPic[0].picture.url = data.data.url;
                    };
                    parseAssociatedFileService.updateAssociatedFile(
                        $scope.tempPic[0].objectId, returnValue
                        , 'Back.jpg', 'picture', 'Picture', null, null, $scope.su);

                }
            );
        } ;
    }
    $scope.openVideoDialog = function () {
        var modalInstance = $modal.open({
            templateUrl: 'modals/videoModal/videoModal.html',
            controller: 'EditVideoController',
            size: 'sm'
        });
        modalInstance.result.then(
            function (returnValue) {
                $scope.resultFromDialog = returnValue.videoUrl;

                $scope.MainAccount.theCompanyVideo = returnValue.videoUrl;
                parseClassService.updateObject('Video', activitiesService.vidoesArray[0].objectId, null, null, {path: returnValue.videoUrl});

            }
        );
    };


//messages
    $scope.messageActivityClick= function(messageId){


        if(navbarService.userType=="admin" ) {


            var modalInstance = $modal.open({
                templateUrl: 'modals/MessageInMainModal/MessageInMainModal.html',
                controller: 'TextMessageController',
                size: 'md'
            });
            modalInstance.result.then(
                function (returnValue) {

                    console.log(messageId);
                    var index = activitiesService.findMessageByParseId(messageId);
                    console.log(index + "  in  messageActivityClick ");

                    returnValue.theParseId = messageId;
                    $scope.messageIdToChange = messageId;
                    activitiesService.messagesArray[index] = returnValue;
                    $scope.messagesActivityArray[index] = activitiesService.messagesArray[index];
                    parseClassService.updateObject('Message', returnValue.theParseId, null, null, {
                        date: returnValue.date,
                        content: returnValue.content,
                        title: returnValue.title
                    });
                }
            );
        }
    };



    $scope.addMessagesActivity=function(){

            var newMessage = {
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
                    newMessage.title = returnValue.title;
                    newMessage.date = returnValue.date;
                    newMessage.content = returnValue.content;


                    parseClassService.createObject('Message',newMessage,function(data){
                        console.log(data);
                        $scope.printLOG = function(data){ console.log(data);};

                        configurationService.updateRelatedMessage('Activity',
                            "messages",
                            //navbarService.MainAccount.theParseId,
                            activitiesService.CurrentActivity.parseId,
                            data.objectId,
                            null,null);
                        //configurationService.getRelatedPictures('Account','messages',$scope.MainAccount.theParseId ,$scope.printLOG,null)

                        var message = new Message(data.objectId,newMessage.date,newMessage.title,newMessage.content);
                        activitiesService.messagesArray.push(message);
                        $scope.messagesActivityArray = activitiesService.messagesArray;
                    },null);

                    //messages.push({
                    //    date: [currentDate,currentDate][messages.length % 2],
                    //    title: ['message1','message2'][messages.length % 2],
                    //    message:['this is message1 and I want to see what happen if the message length is too long','this is message1'][messages.length % 2]
                    //});
                });
        };








    $scope.guideName="guide Name";
    $scope.guideContent="guide Name";

    $scope.openGuideDialog= function(index) {

        if (navbarService.userType=="admin") {
            var modalInstance = $modal.open({
                templateUrl: 'modals/guideModal/guideModal.html',
                controller: 'GuideModalController',
                size: 'md'
            });
            modalInstance.result.then(
                function (returnValue) {

                    $scope.EmployeesArray[index].employeeName = $scope.guideName = returnValue.newGuideName;
                    $scope.EmployeesArray[index].employeeDescription = $scope.guideContent = returnValue.newGuideContent;
                    $scope.EmployeesArray[index].employeeProfile =  returnValue.newGuideProfile;

                    $scope.guidePicture = returnValue.newGuideProfile;
                    console.log($scope.guidePicture);
                    $scope.su = function (data) {
                        console.log($scope.EmployeesArray[index])
                        console.log(data)
                        //$scope.EmployeesArray[index].employeeProfile = data.data;
                        $scope.EmployeesArray[index].employeeProfile = data.data.url;
                        //console.log($scope.EmployeesArray[index].employeeProfile.url);
                    };
                    parseClassService.updateObject('Employee', $scope.EmployeesArray[index].parseId, $scope.su, null, null);
                    //parseClassService.updateObject('Employee', $scope.EmployeesArray[index].parseId, null, null, $scope.EmployeesArray[index]);
                    //if($scope.guidePicture != null)
                    //parseAssociatedFileService.updateAssociatedFile(
                    //    $scope.EmployeesArray[index].parseId, $scope.guidePicture
                    //    , 'Guide' + index + '.jpg', 'employeeProfile', 'Employee', null, null, $scope.su);

                }
            );
        } ;
    }
    $scope.ChangeGuidePhoto= function(index) {

        if (navbarService.userType=="admin") {
            var modalInstance = $modal.open({
                templateUrl: 'modals/uploadPhoto/uploadPhoto.html',
                controller: 'UploadModalController',
                size: 'md'
            });
            modalInstance.result.then(
                function (returnValue) {

                    $scope.guidePicture = returnValue;

                    parseAssociatedFileService.updateAssociatedFile(
                        $scope.EmployeesArray[index].parseId, $scope.guidePicture
                        , 'Guide' + index + '.jpg', 'employeeProfile', 'Employee', null, null, $scope.su);

                }
            );
        } ;
    }


//--add employee
    $scope.updateProfileUrl = function(data){

        $scope.urlP = data.data.url;
        console.log('in updateProfileUrl');
        console.log(data);
        console.log($scope.urlP);

    }
    $scope.updateEmployee = function(data)
    {
       console.log(data);
       $scope.empId = data.objectId;
        parseClassService.updateObject('Employee',data.objectId,function(data){
            console.log($scope.activityId);
            $scope.printLOG = function(data){ console.log(data);};
            configurationService.updateRelatedEmployee('Activity',"employees",
                $scope.activityId,$scope.empId,null,null);
            var employee = new Employee($scope.empId, $scope.GuideD.employeeName, $scope.GuideD.employeeDescription, $scope.urlP);
            activitiesService.emplyeesArray.push(employee);
            console.log( activitiesService.emplyeesArray);
            $scope.emplyeesArray = activitiesService.emplyeesArray;

        },null, $scope.GuideD );
    };

    $scope.addGuide = function(){
        $scope.GuideD = {
            employeeName:'',
            employeeDescription : ''
        }
        var modalInstance= $modal.open({
            templateUrl: 'modals/guideModal/guideModal.html',
            controller:'GuideModalController',
            size: 'md'
        });
        modalInstance.result.then(
            function(returnValue){
                $scope.GuideD.employeeName=returnValue.newGuideName;
                $scope.GuideD.employeeDescription = returnValue.newGuideContent;
                parseAssociatedFileService.uploadAssociatedFile(returnValue.newGuideProfile,
                    "new.jpg","employeeProfile","Employee", $scope.updateEmployee,null,$scope.updateProfileUrl);

            });
    }
});