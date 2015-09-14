/**
 * Created by Admin on 5/3/2015.
 */

clubItModuleVar.controller("ParentController",function($scope,globalService,
                                                       $state,$modal,navbarService,
                                                       parseAssociatedFileService ,configurationService,
                                                       parseClassService,AuthService,activitiesService){

    $scope.signedOut = true;
    //document.body.style.paddingTop = '70px';
    $scope.init = function(){
        $scope.name=navbarService.name;
        $scope.userName = navbarService.userName;
        //$scope.userType=navbarService.userType;
        $scope.userType='admin';
        navbarService.initState($scope.name);
    };

    $scope.CarouselFunction = function() {};
    $scope.initAccount = function () {
        parseClassService.getTable('Account',
            function (data) {
                navbarService.change(data);

                $scope.MainAccount=navbarService.MainAccount;
                var curState= navbarService.findByState('main');
                var aboutState= navbarService.findByState('about');
                //var contactsState= navbarService.findByState('contacts');
                var SocialState= navbarService.findByState('social');
                $scope.allStates = navbarService.allStates;
                curState.theName=$scope.MainAccount.theCompanyHomeText;
                aboutState.theName=$scope.MainAccount.theCompanyAboutTitleText;
                //contactsState.theName=$scope.MainAccount.theCompanyContacts;
                SocialState.theName=$scope.MainAccount.theSocialTitleText;
/////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////
                $scope.allActivities = activitiesService.acrt;
               // activitiesService.CurrentActivity =  $scope.allActivities[0];
                $scope.initActivity();
                console.log($scope.MainAccount);
                console.log($scope.MainAccount.theCompanyLogo);
                 $scope.CarouselFunction();
                $scope.localInit();
                $scope.initSocial();
                //$scope.initSocial();

                if(globalService.isAuth()){
                    //console.log(globalService.getUser());
                    //AuthService.login(globalService.getUser(),null,null);
                    AuthService.login(globalService.getUser(),
                        function(data){
                            navbarService.userName = data.username;
                            $scope.userName =data.username;
                            navbarService.userType = data.userType;
                            $scope.userType = data.userType;
                            $scope.signedOut = false;
                        });
                }
            }, function () {});
    };
    $scope.initActivity = function(){};
    $scope.initSocial = function(){};
    $scope.initAccount();
    $scope.init();
    $scope.localInit = function(){

    };
    $scope.changeState = function(theState, theName){
        console.log("Here::" +theState+" "+theName);
        if (theState == 'activity') {
            $scope.changeStActivity(theState, theName);

        }
        else {
            navbarService.name = theName;
            $state.go(theState);
            console.log($scope.userType);
        }
    };
    $scope.changeStActivity = function(theState, theName){
        console.log("111");
        if ($state.current.name == 'activity') {
            console.log("222");

            $scope.name = theName;
            acti= activitiesService.findActivityByName(theName);
            activitiesService.CurrentActivity = acti;
            console.log(acti);
            navbarService.initState($scope.name);
            activitiesService.activityName = acti.activityName;
            console.log(activitiesService.activityName);
            $scope.activityName = acti.activityName;
            activitiesService.description = acti.description;

            $scope.description = acti.description;

            $state.go($state.current,{},{reload:true});

        }
        else {
            console.log("333");
            navbarService.name = theName;
            //---
            acti= activitiesService.findActivityByName(theName);
            activitiesService.CurrentActivity = acti;
            console.log(acti);
            navbarService.initState($scope.name);
            activitiesService.activityName = acti.activityName;
            console.log(activitiesService.activityName);
            $scope.activityName = acti.activityName;
            activitiesService.description = acti.description;

            $scope.description = acti.description;
            //---
            $state.go(theState);
        }
    };


    $scope.number=1;
    $scope.openLogInDialog = function(){
        var modalInstance =
            $modal.open({
                templateUrl:'modals/logInModal/logInModal.html',
                controller :'LogInModalController',
                size : 'sm'
            });
        modalInstance.result.then(
            function(returnValue){
                var user = new User(returnValue.userInput,returnValue.passwordInput);
                AuthService.login(user,
                    function(data){
                        navbarService.userName = data.username;
                        console.log("11"+data.username);
                    $scope.userName =data.username;
                        navbarService.userType = data.userType;
                    $scope.userType = data.userType;
                        $scope.signedOut = false;
                },
                    function(data,status){
                        //alert("Error " + status);
                        if(status!=400)
                        var modalInstance2 =
                            $modal.open({
                                templateUrl:'modals/errModal/errModal.html',
                                controller :'errController',
                                size : 'sm'
                            });
                    })


            },
            function(){
            }
        );
    };

    //-----------------------------------------------------------------
    $scope.editStateDialog = function(){

        var editModalInstance =
            $modal.open({
                templateUrl:'modals/editNavbarTabsModal/editNavbarTabsModal.html',
                controller :'EditNavbarTabsModalController',
                size : 'sm'
            });
        editModalInstance.result.then(
            function(returnValue){
                $scope.userTabInput = returnValue.userTabInput;

                if(navbarService.nameTabToChange=="activity"){
                    console.log("change activity");
                    parseClassService.updateObject("Account", $scope.MainAccount.theParseId, null, null, {companyActivities: $scope.userTabInput});
                    $scope.MainAccount.theCompanyActivities = $scope.userTabInput;

                }
                else {


                    var curState = navbarService.findByName(navbarService.nameTabToChange);
                    curState.theName = $scope.userTabInput;

                    ///////////////////

                    switch (curState.theState) {
                        case "main":
                        {
                            console.log("change main");
                            parseClassService.updateObject("Account", $scope.MainAccount.theParseId, null, null, {companyHomeText: $scope.userTabInput});
                            $scope.MainAccount.theCompanyHomeText = $scope.userTabInput;
                            break;
                        }
                        case "social":
                        {
                            console.log("change Social");
                            parseClassService.updateObject("Account", $scope.MainAccount.theParseId, null, null, {companySocialTitleText: $scope.userTabInput});
                            $scope.MainAccount.companySocialTitleText = $scope.userTabInput;
                            break;
                        }
                        case "about":
                        {
                            console.log("change about");
                            parseClassService.updateObject("Account", $scope.MainAccount.theParseId, null, null, {companyAboutTitleText: $scope.userTabInput});
                            $scope.MainAccount.companyAboutTitleText = $scope.userTabInput;
                            break;
                        }
                        //case "contacts" :
                        //{
                        //    console.log("change contact");
                        //    parseClassService.updateObject("Account", $scope.MainAccount.theParseId, null, null, {companyContacts: $scope.userTabInput});
                        //    $scope.MainAccount.companyContacts = $scope.userTabInput;
                        //}
                    }
                }
                ///////////////////
            },
            function(){

            }
        );
    };

    $scope.editState = function(stName){
        if($scope.userType=='admin') {
            navbarService.nameTabToChange = stName;
            $scope.editStateDialog();
        }
    };

    //----------------ADD NEW ACTIVITY----------------------------------------------
    $scope.BuildActivity = function(files,activityName)
    {
        //message->employee->picture->
        $scope.messagePrintToLog=function(data){
            console.log("1.message id");
            console.log(data);
            $scope.messageParseId = data.objectId;

            parseAssociatedFileService.uploadAssociatedFile(files,
                "new.jpg","employeeProfile","Employee", $scope.AddEmployee,null,$scope.updateProfileUrl);

        };
        parseClassService.createObject('Message',{date:"write date here!",title:"Title here!",content:"Content here!"},$scope.messagePrintToLog,null);
        //employee
        $scope.updateProfileUrl = function(data){

            $scope.urlP = data.data.url;
            console.log('in updateProfileUrl');
            console.log(data);
            console.log($scope.urlP);

        };
        $scope.AddEmployee = function(data)
        {
            console.log("2. employee id");
            console.log(data);
            $scope.EmployeeParseId = data.objectId;
            parseClassService.updateObject('Employee',data.objectId,function(data){
               // console.log($scope.activityId);
                console.log("3.update employee id");
                console.log(data);

                $scope.printLOG = function(data){ console.log(data);};
                //configurationService.updateRelatedEmployee('Activity',"employees",
                //    $scope.activityId,$scope.empId,null,null);
                var employee = new Employee($scope.EmployeeParseId, "", "", $scope.urlP);
                activitiesService.emplyeesArray.push(employee);
                console.log( activitiesService.emplyeesArray);
                //$scope.emplyeesArray = activitiesService.emplyeesArray;
                //picture
                parseAssociatedFileService.uploadAssociatedFile(files,'activityPic.jpeg','picture','Picture',function(data){
                    console.log("4.upload picture id");
                    console.log(data);

                    $scope.picpicID = data.objectId;
                    parseClassService.createObject('Video',{path:"https://www.youtube.com/watch?v=nlHGVeItDmg"},$scope.v1,null);

                },null,null);
            },null,  {
                employeeName:'',
                employeeDescription : ''
            } );


        };

        //video
        $scope.v1 = function(data){
            console.log("5.create video id");
            console.log(data);

            $scope.videoParseId = data.objectId;
            console.log($scope.videoParseId);
            parseClassService.createObject('WorkSchedule',{day:"",startingHour:"",endHour:""},$scope.w1,null);

            //console.log("3. video..");
            //parseClassService.deleteObject('Video',$scope.videoParseId, $scope.printToLog,null);
        } ;
      //  parseClassService.createObject('Video',{path:"https://www.youtube.com/watch?v=nlHGVeItDmg"},$scope.v1,null);

        // ws
        $scope.w1 = function(data){
            console.log("6.create ws id");
            console.log(data);

            console.log("WS" + data);
            $scope.wsParseId = data.objectId;
            console.log($scope.wsParseId);
            configurationService.createActivity(activityName,'activityProfile',$scope.picpicID,$scope.EmployeeParseId,$scope.videoParseId,
                $scope.wsParseId,$scope.messageParseId,"please add your description here!",
                function(data){
                    console.log("7.create activity id");
                    console.log(data);

                    activitiesService.acrt.push(new Activity(data.objectId,activityName,"please add your description here!"));
                   // $scope.changeStActivity('activity', activityName);

                },null);
        };

    };
    // This function creates new activity
    $scope.addNewActivity = function() {

        // Create state for navbar
        navbarService.initState($scope.name);

        var editModalInstance =
            $modal.open({
                templateUrl:'modals/newActivityName/newActivityNameModal.html',
                controller :'NewActivityNameController',
                size : 'sm'
            });
        editModalInstance.result.then(
            function (returnValue) {
                //
                console.log("0.update employee id");
                console.log(returnValue);

                $scope.BuildActivity(returnValue.files,returnValue.activityName);

            },
            function () {}
        );
    };

    $scope.LogoClick = function () {
       if($scope.userType=='admin') {
           var modalInstance = $modal.open({
               templateUrl: 'modals/uploadPhoto/uploadPhoto.html',
               controller: 'UploadModalController',
               size: 'sm'
           });

           modalInstance.result.then(
               function (returnValue) {
                parseAssociatedFileService.updateAssociatedFile(
                    $scope.MainAccount.theParseId,returnValue
                ,'companyLogo.jpg','companyLogo','Account',null,null,$scope.initAccount);
               },
               function () {}
           );
       }
    };
    $scope.CallFunc = function()
    {
        if($scope.userType=='admin') {
            var modalInstance = $modal.open({
                templateUrl: 'modals/uploadPhoto/uploadPhoto.html',
                controller: 'UploadModalController',
                size: 'sm'
            });
            modalInstance.result.then(
            function(returnValue){
                parseAssociatedFileService.updateAssociatedFile(
                    $scope.MainAccount.theParseId,returnValue
                    ,'companyHomeBG.jpg','companyHomeBG','Account',null,null,$scope.initAccount);
                },
                function () {}
            );
        }
    };
    //    --------------------------- sign Out -------------------------------
    $scope.SignOut = function (){
        globalService.setUser(null)
        {
            $scope.signedOut = true;

            navbarService.userName = "";
            $scope.userName ="";
            navbarService.userType = "";
            $scope.userType = "";
        }
    }
});
