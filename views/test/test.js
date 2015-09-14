/**
 * Created by me on 01/05/2015.
 */
clubItModuleVar.controller('TestController',function($http,$scope,AuthService,parseAssociatedFileService,parseClassService,configurationService){

    //var ObjDate  = {
    //
    //    photo : $scope.photo,
    //        date : { __type: "Date",iso:ndt}
    //}



    $scope.updateSocial = function(){
        configurationService.updateRelatedPictures('Social','socialPictures',$scope.socialId,$scope.pictureId
            ,function(data){
                //$scope.initSocial();


                console.log($scope.date);
            },null);
    }

    $scope.addTableSocial = function(files){
        var obj = {};

        parseAssociatedFileService.uploadAssociatedFile(files,'sp.jpg','picture','Picture',function(data){
            $scope.pictureId = data.objectId;
            parseClassService.updateObject('Picture',data.objectId,function(data)
            {
                obj['socialPictures'] = {"__op":"AddRelation","objects":[{__type:"Pointer",className:"Picture",objectId: $scope.pictureId }]};
                parseClassService.createObject('Social',obj,function(data)
                {
                    $scope.socialId = data.objectId;

                },null);

            },null,{
                pictureDate:{ __type: "Date",iso:$scope.date}
            });
        },null,null);
    }
    $scope.update123Activity = function(data){
        configurationService.updateRelatedMessage('Activity',
            "messages",
            'JpziufS7uK',
            data.objectId,
            configurationService.getRelatedMessages('Activity','messages','JpziufS7uK',$scope.printLOG,null),null);

    };
    $scope.cereateActivityMessage = function(){
        parseClassService.createObject('Message',{date:"21/1/2015",title:"i am message 0!",content:"provides a variety of actions, which can be applied to filenames and tags!"},$scope.update123Activity,null);
    };

    $scope.updateAccount = function(data){
        console.log("in update account");
        console.log(data.objectId);
        $scope.printLOG = function (data){console.log(data)};
        configurationService.updateRelatedPictures('Account',
            "companyCarouselPictureIds",
            'JpziufS7uK',
            data.objectId,
            configurationService.getRelatedPictures('Account','companyCarouselPictureIds','JpziufS7uK',$scope.printLOG,null),null);
    };

    $scope.testParseConfigurationService = function(files){
        parseAssociatedFileService.uploadAssociatedFile(files,
            "new.jpg","picture","Picture",$scope.updateAccount,null,null);
//  params:{where:{"$relatedTo":{"object":{"__type":"Pointer","className":"Account","objectId":"4nWcQ2Oicx"},"key":"companyCarouselPictureIds"}}}
//   companyCarouselPictureIds:{"__op":"AddRelation","objects":[{__type:"Pointer",className:"Picture",objectId: $scope.picpicID }]}}
        // tableName,columnName,parseId,pictureParseId,inputObject,successUserCB,errorUserCB
    };

    $scope.parseId ="";


    $scope.PictureUploadSuccess = function(data){
        // $scope.imageName = data.url;
        console.log(data);


        console.log( $scope.parseId );
        //parseId,files,pictureName,columnName,tableName,userSuccess,userError,userAfterImgeSaveCB) {

        //parseAssociatedFileService.updateAssociatedFile( $scope.parseId,$scope.files,"saleemLogoNew.jpg","companyHomeBG",
        //    'Account',null,null,$scope.AfterUpload);
        parseAssociatedFileService.updateAssociatedFile( $scope.parseId, $scope.files,"saleemBG.jpg","companyLogo",
            'Account',null,null,$scope.AfterUpload);
    };

    $scope.AfterUpload = function(data){
        console.log("after upload CB "+ data );
        console.log(data );

        $scope.imageName = data.data.url;
    };
    $scope.PictureUploadError = function(status){ console.log(status);};


    $scope.uploadPicture = function(files){
        console.log(files);
        //1.    FileService.uploadFile(files,'salPicture.jpg',  $scope.PictureUploadSuccess,$scope.PictureUploadError);
        //2.files,pictureName,columnName,tableName,userSuccess,userError,userAfterImgeSaveCB
        parseAssociatedFileService.uploadAssociatedFile(files,"saleemLogo.jpg","companyLogo",
            'Account',$scope.PictureUploadSuccess,null,$scope.AfterUpload);
        $scope.files = files;

    };
    $scope.testParseServiceSuccess = function(data){
        console.log(data);
        // $scope.parseId = data.objectId;
        // console.log($scope.parseId);
    } ;
    $scope.printToLog=function(data){
        console.log(data);
    }

    $scope.createObject = function(){
        parseClassService.createObject('Activity',{name:"football",content:"blabla"},$scope.testParseServiceSuccess,null);
    };
    $scope.getObject = function(){
        //parseClassService.getObject('Activity',$scope.parseId,$scope.printToLog,null);
        parseClassService.getObject('Activity','PwDSk71c7c',$scope.printToLog,null);

    };

    $scope.updateObject = function(){
        parseClassService.updateObject('Activity',$scope.parseId, $scope.printToLog,null,{name:"samba"});
    };

    $scope.deleteObject = function(){
        parseClassService.deleteObject('Activity',$scope.parseId, $scope.printToLog,null);
    };

    var loginObj = {"username":"saleem","password":"123456"};
    $scope.login = function(){
        AuthService.login(loginObj,null,null);
        //see the log :-)
    }
    /*<<<<<<<<<<Build DB>>>>>>>>>>*/
    $scope.addRelatedImageToAccount = function(){

    };
    $scope.getAllAccountPictures = function(){

        $http({
            method: 'GET',
            url: 'https://api.parse.com/1/classes/Picture',

            // params: {'include':'Picture'}/*,
            //where:{className: "Account"}
            params:{where:{"$relatedTo":{"object":{"__type":"Pointer","className":"Account","objectId":"4nWcQ2Oicx"},"key":"companyCarouselPictureIds"}}}
        }).success(function(data,status){
            console.log(data);
        })
    };

    $scope.messagePrintToLog=function(data){
        console.log(data);
        $scope.messageParseId = data.objectId;
        //parseClassService.getTable('Account',$scope.testParseServiceSuccess,null );

    }
    $scope.getAllAccountmessages = function(data){
        console.log("messages of the account:");
        console.log(data);
        configurationService.getRelatedMessages('Account','messages',$scope.parseId,null,null);
    }
    $scope.createMessagesTable = function(){
        parseClassService.createObject('Message',{date:"21/1/2015",title:"write your title here!",content:"write ur content here!"},$scope.messagePrintToLog,null);
        //    parseClassService.('Message',{date:"21/1/2015",title:"write your title here!",content:"write ur content here!"},$scope.printToLog(),null);
        configurationService.updateRelatedMessage('Account','messages', $scope.AccountParseId, $scope.messageParseId,$scope.getAllAccountmessages,null);

    }
    $scope.DBBuild = function(files){
        //build user Table
        /*   $scope.u1 = function(data){
         console.log(data);
         $scope.parseId = data.objectId;
         console.log($scope.parseId);
         console.log("1.delete user..");
         //parseClassService.deleteObject('User',$scope.parseId, $scope.printToLog,null);
         //$http({
         //    method: 'DELETE',
         //    //url: 'https://api.parse.com/1/classes/Tshirts',
         //    url: 'https://api.parse.com/1/users/'+$scope.parseId
         //    //data: shirt
         //
         //})
         //    .success(function(data, success) {
         //        console.log(data);
         //
         //
         //    })
         //    .error(function(data, status) {
         //        alert("Error" + status);
         //
         //
         //    });
         } ;*/
        //parseClassService.createObject('User',{userType:"admin"},$scope.u1,null);
        /*  $http({
         method: 'POST',
         //url: 'https://api.parse.com/1/classes/Tshirts',
         url: 'https://api.parse.com/1/users/',
         //data: shirt
         data: {"username":"tsofen","password":"123",userType:"admin"}
         })
         .success(function(data, success) {
         console.log(data);
         $scope.u1(data);

         })
         .error(function(data, status) {
         alert("Error" + status);


         });*/
        /*var whereQuery = {type: subtype};

         $http.get('https://api.parse.com/1/classes/events',
         {
         headers: {
         'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
         'X-Parse-REST-API-Key': PARSE_CREDENTIALS.REST_API_KEY,
         'Content-Type' : 'application/json'
         },
         params:  {
         where: whereQuery,
         limit: 2,
         // count: 1
         // include: "something"
         }
         });
         * */

        parseClassService.createObject('Message',{date:"21/1/2015",title:"i am message 0!",content:"provides a variety of actions, which can be applied to filenames and tags!"},$scope.messagePrintToLog,null);
        //create first messages

        //create picture
        $http.post("https://api.parse.com/1/files/file1.jpg", files[0], {
            withCredentials: false,
            headers: {
                'Content-Type': 'image/jpeg'
            },
            transformRequest: angular.identity
        }).then(function(data) {
            console.log(data);
            $scope.uploadedImage = data.data.name;
            //add picture to pictures
            $http({
                method : 'POST',
                url : 'https://api.parse.com/1/classes/Picture',
                data: {
                    // parent:{__type:"Pointer",className:"Account",objectId:$scope.AccountParseId },
                    pictureDate:{"__type":"Date","iso":"2011-08-21T18:02:52.249Z"},
                    picture:{"name":  $scope.uploadedImage,"__type": "File"}
                }
            }).success(function(data,status){
                $scope.picpicID = data.objectId;

                $http({
                    method : 'GET',
                    url : 'https://api.parse.com/1/classes/Picture'

                }).success(function(data,status) {
                    console.log(data);
                    $scope.pictureArray = data.results;

                    console.log("in Account then..");
                    //create account
                    $http({
                        method : 'POST',
                        url : 'https://api.parse.com/1/classes/Account',
                        data: {companyName:"saleem",
                            companyLogo:
                            {"name":  $scope.uploadedImage,"__type": "File"},
                            companyHomeBG:{"name": $scope.uploadedImage,"__type": "File"},
                            companyLocation:{"__type":"GeoPoint","latitude":40.0,"longitude":-30.0},
                            companyHomeText:"Home",
                            companyActivities:"Activities",
                            companyPhone:"",
                            companyEmail:"",
                            companyAddress:"",
                            companyVideo:"",
                            companyDescription:"",
                            companySocialTitleText:"Social",
                            companyAboutTitleText:"About",
                            companyContacts:"",
                            companyHomePageTitleText:"home page title",
                            companyHomePageContentText:"home page content",
                            companyCarouselPictureIds:{"__op":"AddRelation","objects":[{__type:"Pointer",className:"Picture",objectId: $scope.picpicID }]},
                            messages:{"__op":"AddRelation","objects":[{__type:"Pointer",className:"Message",objectId: $scope.messageParseId }]}
                        }
                    })
                        .success(function (data, status) {
                            console.log("in account success");
                            console.log(data);
                            console.log("in pictures then..",data);
                            $scope.AccountParseId = data.objectId;
                            console.log("2.dont delete Account..");
                            $scope.addToRelationWithAccount = function(data){
                                configurationService.updateRelatedMessage('Account','messages',$scope.AccountParseId,data.objectId,null,null);
                            }
                            parseClassService.createObject('Message',{date:"21/1/2015",title:"i am message 1!",content:"provides a variety of actions, which can be applied to filenames and tags!"},$scope.addToRelationWithAccount,null);
                            parseClassService.createObject('Message',{date:"23/4/1987",title:"i am message 2!",content:"The actions are grouped together into named sets (action groups)!"},$scope.addToRelationWithAccount,null);
                            parseClassService.createObject('Message',{date:"22/5/1988",title:"i am message 3!",content:" which can be applied!"},$scope.addToRelationWithAccount,null);

                        })
                        .error(function (data, status) {
                            alert('ERROR' + status);

                        });
                });
            });
        });
        //create video
        $scope.v1 = function(data){
            console.log(data);
            $scope.videoParseId = data.objectId;
            console.log($scope.videoParseId);

            //console.log("3. video..");
            //parseClassService.deleteObject('Video',$scope.videoParseId, $scope.printToLog,null);
        } ;
        //create Employee
        $http.post("https://api.parse.com/1/files/file2.jpg", files[0], {
            withCredentials: false,
            headers: {
                'Content-Type': 'image/jpeg'
            },
            transformRequest: angular.identity
        }).then(function(data) {
            console.log("in employee then..",data);
            $scope.NEWIMG = data.data.name;
            $http({
                method : 'POST',
                url : 'https://api.parse.com/1/classes/Employee',
                data: {

                    employeeName:"",
                    employeeDescription:"",
                    employeeProfile:{"name":$scope.NEWIMG,"__type": "File"}
                }
            })
                .success(function (data, status) {
                    console.log("in employee success")
                    console.log(data);
                    $scope.EmployeeParseId = data.objectId;
//create video
                    parseClassService.createObject('Video',{path:""},$scope.v1,null);
                })
                .error(function (data, status) {
                    alert('ERROR' + status);

                });
            //   $scope.pictureParseId = data.objectId;
            $scope.w1 = function(data){
                console.log("WS" + data);
                $scope.wsParseId = data.objectId;
                console.log($scope.wsParseId);

            };
            parseClassService.createObject('WorkSchedule',{day:"",startingHour:"",endHour:""},$scope.w1,null);


        });
        //workschedule
        //$scope.w1 = function(data){
        //    console.log(data);
        //    $scope.parseId = data.objectId;
        //    console.log($scope.parseId);
        //    console.log("5. delete WorkSchedule..");
        //    parseClassService.deleteObject('WorkSchedule',$scope.parseId, $scope.printToLog,null);
        //} ;

        // parseClassService.createObject('WorkSchedule',{date:"",startingHour:"",endHour:""},$scope.w1,null);
        //  $scope.pictureParseId


        //$http.post("https://api.parse.com/1/files/file1.jpg", files[0], {
        //    withCredentials: false,
        //    headers: {
        //        'Content-Type': 'image/jpeg'
        //    },
        //    transformRequest: angular.identity
        //}).then(function(data) {
        //    console.log(data);
        //    console.log(obj);
        //    $http({
        //        method : 'POST',
        //        url : 'https://api.parse.com/1/classes/Activity',
        //        data: {userId:"",
        //            profile:{"name": data.data.name,"__type": "File"},
        //            name:{"name": data.data.name,"__type": "File"},
        //            description:""
        //
        //        }
        //
        //    })
        //        .success(function (data, status) {
        //            console.log(data);
        //            $scope.parseId = data.objectId;
        //            console.log("delete Teacher..");
        //            parseClassService.deleteObject('Teacher',$scope.parseId, $scope.printToLog,null);
        //        })
        //        .error(function (data, status) {
        //            alert('ERROR' + status);
        //            if(userError)
        //                userError(data);
        //        });
        //
        //});
        //workschedule






    };
    $scope.BuildActivity = function(files)
    {
        $http.post("https://api.parse.com/1/files/file5.jpg", files[0], {
            withCredentials: false,
            headers: {
                'Content-Type': 'image/jpeg'
            },
            transformRequest: angular.identity
        }).then(function(data) {
            console.log(data);
            console.log({
                    pic:$scope.picpicID,
                    emp:$scope.EmployeeParseId,
                    vid:$scope.videoParseId ,
                    ws: $scope.wsParseId
                }
            );
            $http({
                method : 'POST',
                url : 'https://api.parse.com/1/classes/Activity',
                // "opponents":{"__op":"AddUnique","objects":[{"__type":"Pointer","className":"Player","objectId":"5Q4QsKF8QR"}]}
                data: {
                    name:"",
                    profile:{"name": data.data.name,"__type": "File"},
                    // companyCarouselPictureIds:{"__op":"AddRelation","objects":[{__type:"Pointer",className:"Picture",objectId: $scope.picpicID }]}}
                    pictures:{"__op":"AddRelation","objects":[{__type:"Pointer",className:"Picture",objectId:  $scope.picpicID }]},
                    employees:{"__op":"AddRelation","objects":[{__type:"Pointer",className:"Employee",objectId: $scope.EmployeeParseId }]},
                    videos:{"__op":"AddRelation","objects":[{__type:"Pointer",className:"Video",objectId: $scope.videoParseId }]},
                    workSchedule:{"__op":"AddRelation","objects":[{__type:"Pointer",className:"WorkSchedule",objectId: $scope.wsParseId}]},
                    messages:{"__op":"AddRelation","objects":[{__type:"Pointer",className:"Message",objectId: $scope.messageParseId }]},
                    description:""
                }
            })
                .success(function (data, status) {
                    console.log(data);
                    console.log("3. video..");
                    //   parseClassService.deleteObject('Video',$scope.videoParseId, $scope.printToLog,null);
                    console.log("4. delete Employee..");
                    //   parseClassService.deleteObject('Employee',$scope.EmployeeParseId, $scope.printToLog,null);
                    console.log("5. delete WorkSchedule..");
                    //  parseClassService.deleteObject('WorkSchedule',$scope.wsParseId, $scope.printToLog,null);
                    console.log("6. delete picture..");
                    //  parseClassService.deleteObject('Pictures',$scope.pictureParseId, $scope.printToLog,null);

                    $scope.parseId = data.objectId;
                    console.log("delete activity..");
                    // parseClassService.deleteObject('Activity',$scope.parseId, $scope.printToLog,null);
                })
                .error(function (data, status) {
                    alert('ERROR' + status);

                });
        });
    };//Build Activity
    $scope.addToActivityArrays = function(file){
        $http({
            method : 'PUT',
            url : 'https://api.parse.com/1/classes/Activity/'+$scope.parseId ,
            // "opponents":{"__op":"AddUnique","objects":[{"__type":"Pointer","className":"Player","objectId":"5Q4QsKF8QR"}]}
            data: {name:"new",
                // profile:{"name": data.data.name,"__type": "File"},
                pictures:{"__op":"AddRelation","objects":[{"__type":"Pointer","className":"Picture","objectId":'QnJUVZkLXt'}]},
                employees:{"__op":"AddRelation","objects":[{"__type":"Pointer","className":"Employee","objectId":'ZjBZL0ooqk'}]},
                videos:{"__op":"AddRelation","objects":[{"__type":"Pointer","className":"Video","objectId":'ZjBZL0ooqk'}]},
                workSchedule:{"__op":"AddRelation","objects":[{"__type":"Pointer","className":"WorkSchedule","objectId":'lszEXLdZwL'}]},
                description:"hi"

            }

        })
            .success(function (data, status) {
                console.log(data);
            });
    };
    $scope.getRelated = function(file){
        $http({
            method : 'GET',
            url : 'https://api.parse.com/1/classes/Picture',///PwDSk71c7c',
            // "opponents":{"__op":"AddUnique","objects":[{"__type":"Pointer","className":"Player","objectId":"5Q4QsKF8QR"}]}
            //data: {name:"new",
            //   // profile:{"name": data.data.name,"__type": "File"},
            //    pictures:{"__op":"AddRelation","objects":[{"__type":"Pointer","className":"Picture","objectId":'SKLXWJ84eI'}]},
            //    employees:{"__op":"AddRelation","objects":[{"__type":"Pointer","className":"Employee","objectId":'ZpYdkDvkda'}]},
            //    videos:{"__op":"AddRelation","objects":[{"__type":"Pointer","className":"Video","objectId":'Q44bMECx1M'}]},
            //    workSchedule:{"__op":"AddRelation","objects":[{"__type":"Pointer","className":"WorkSchedule","objectId":'InYwmiAhlw'}]},
            //    description:"hi"
            //
            //}
            params:{where:{"$relatedTo":{"object":
            {"__type":"Pointer","className":"Activity","objectId":$scope.parseId },"key":"pictures","key":"employees","key":"videos"}}}

            //  params:{where:{"relatedTo":{"objects":{"__type":"Pointer","className":"Activity","objectId":"PwDSk71c7c"}}}}//{include:"employees"}
        })
            .success(function (data, status) {
                console.log(data);
            });
    };
});
