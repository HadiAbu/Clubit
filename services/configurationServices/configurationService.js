/**
 * Created by Admin on 4/30/2015.
 */
clubItModuleVar.service('configurationService', function($http) {

    this.getRelatedPictures = function(tableName,columnName,parseId,successUserCB,errorUserCB){
            this.getRelatedObjects(tableName,columnName,parseId,'Picture',successUserCB,errorUserCB);
    };

    this.getRelatedMessages = function(tableName,columnName,parseId,successUserCB,errorUserCB){
            this.getRelatedObjects(tableName,columnName,parseId,'Message',successUserCB,errorUserCB);
    };

    this.getRelatedEmployees = function(tableName,columnName,parseId,successUserCB,errorUserCB){
            this.getRelatedObjects(tableName,columnName,parseId,'Employee',successUserCB,errorUserCB);
    };

    this.getRelatedVideos = function(tableName,columnName,parseId,successUserCB,errorUserCB){
            this.getRelatedObjects(tableName,columnName,parseId,'Video',successUserCB,errorUserCB);
    };

    this.getRelatedWorkSchedule = function(tableName,columnName,parseId,successUserCB,errorUserCB){
            this.getRelatedObjects(tableName,columnName,parseId,'WorkSchedule',successUserCB,errorUserCB);
    };


    this.getRelatedObjects = function(tableName,columnName,parseId,tableInRelation,successUserCB,errorUserCB){
        $http({
            method: 'GET',
            url: 'https://api.parse.com/1/classes/'+tableInRelation,
            params:{
                where:
                {"$relatedTo":
                {"object":
                {"__type":"Pointer","className":tableName,"objectId":parseId},
                    "key":columnName}
                }
            }
        }).success(function(data, success) {
            if(successUserCB)
                successUserCB(data);

        })
            .error(function(data, status) {
                alert("Error" + status);
                if(errorUserCB)
                    errorUserCB(data);
            });
    };

    this.updateRelatedPictures = function(tableName,columnName,parseId,pictureParseId,successUserCB,errorUserCB){
        //companyCarouselPictureIds:{"__op":"AddRelation","objects":[{__type:"Pointer",className:"Picture",objectId: $scope.picpicID }]}
        this.updateRelatedObjects(tableName,columnName,parseId,'Picture',pictureParseId,successUserCB,errorUserCB);
    };

    this.updateRelatedMessage = function(tableName,columnName,parseId,messageParseId,successUserCB,errorUserCB){
        //companyCarouselPictureIds:{"__op":"AddRelation","objects":[{__type:"Pointer",className:"Picture",objectId: $scope.picpicID }]}
        this.updateRelatedObjects(tableName,columnName,parseId,'Message',messageParseId,successUserCB,errorUserCB);
    };

    this.updateRelatedEmployee = function(tableName,columnName,parseId,employeeParseId,successUserCB,errorUserCB){
        //companyCarouselPictureIds:{"__op":"AddRelation","objects":[{__type:"Pointer",className:"Picture",objectId: $scope.picpicID }]}
        this.updateRelatedObjects(tableName,columnName,parseId,'Employee',employeeParseId,successUserCB,errorUserCB);
    };

    this.updateRelatedVideo = function(tableName,columnName,parseId,videoParseId,successUserCB,errorUserCB){
        //companyCarouselPictureIds:{"__op":"AddRelation","objects":[{__type:"Pointer",className:"Picture",objectId: $scope.picpicID }]}
        this.updateRelatedObjects(tableName,columnName,parseId,'Video',videoParseId,successUserCB,errorUserCB);
    };

    this.updateRelatedWorkSchedule = function(tableName,columnName,parseId,workScheduleParseId,successUserCB,errorUserCB){
        //companyCarouselPictureIds:{"__op":"AddRelation","objects":[{__type:"Pointer",className:"Picture",objectId: $scope.picpicID }]}
        this.updateRelatedObjects(tableName,columnName,parseId,'WorkSchedule',workScheduleParseId,successUserCB,errorUserCB);
    };

    this.updateRelatedObjects = function(tableName,columnName,parseId,relatedTableName,relatedParseId,successUserCB,errorUserCB){

        console.log("in updateRelatedObjects");

        var arrayObj = {};
        arrayObj['__type'] = "Pointer";
        arrayObj['className'] = relatedTableName;
        arrayObj['objectId'] = relatedParseId;
        console.log(arrayObj);
        var obj = {};
        obj["__op"] = "AddRelation";
        obj["objects"] = [arrayObj];//[{__type:"Pointer",className:"Picture",objectId: pictureParseId }];
        console.log(obj);
        var newObj={};
        newObj[columnName] = obj;
        console.log(newObj);
        $http({
            method: 'PUT',
            url: 'https://api.parse.com/1/classes/'+tableName+'/'+parseId,
            // data:{companyCarouselPictureIds:{"__op":"AddRelation","objects":[{__type:"Pointer",className:"Picture",objectId:pictureParseId }]}}

            data:newObj

        })
            .success(function(data, success) {
                if(successUserCB)
                    successUserCB(data);

            })
            .error(function(data, status) {
                alert("Error" + status);
                if(errorUserCB)
                    errorUserCB(data);
            });
    };
    this.createActivity = function(activityName,
                                   profilePictureName,
                                   pictureOID,
                                   employeeOID,
                                   videoOID,
                                   wsOID,
                                   messageOID,
                                   description,
                                   successUserCB,
                                   errorUserCB){
        var obj = {};
        obj['name'] = activityName;
        if(profilePictureName)
            obj['profile'] = {"name": profilePictureName,"__type": "File"};
        if(pictureOID)
            obj['pictures']= {"__op":"AddRelation","objects":[{__type:"Pointer",className:"Picture",objectId:  pictureOID}]};
        if(employeeOID)
            obj['employees']={"__op":"AddRelation","objects":[{__type:"Pointer",className:"Employee",objectId: employeeOID }]};
        if(videoOID)
            obj['videos']={"__op":"AddRelation","objects":[{__type:"Pointer",className:"Video",objectId: videoOID}]};
        if(wsOID)
            obj['workSchedule']={"__op":"AddRelation","objects":[{__type:"Pointer",className:"WorkSchedule",objectId: wsOID}]};
        if(messageOID)
            obj['messages'] = {"__op":"AddRelation","objects":[{__type:"Pointer",className:"Message",objectId: messageOID}]};

        obj['description']= description;
        //{
        //    name:"",
        //        profile:{"name": data.data.name,"__type": "File"},
        //    pictures:{"__op":"AddRelation","objects":[{__type:"Pointer",className:"Picture",objectId:  pictureOID}]},
        //    employees:{"__op":"AddRelation","objects":[{__type:"Pointer",className:"Employee",objectId: employeeOID }]},
        //    videos:{"__op":"AddRelation","objects":[{__type:"Pointer",className:"Video",objectId: videoOID}]},
        //    workSchedule:{"__op":"AddRelation","objects":[{__type:"Pointer",className:"WorkSchedule",objectId: wsOID}]},
        //    description:""
        //}
        $http({
            method : 'POST',
            url : 'https://api.parse.com/1/classes/Activity',
            // "opponents":{"__op":"AddUnique","objects":[{"__type":"Pointer","className":"Player","objectId":"5Q4QsKF8QR"}]}
            data:obj
        })
            .success(function (data, status) {
                console.log({activity:data});
                if(successUserCB)
                    successUserCB(data);

            })
            .error(function (data, status) {
                alert('ERROR' + status);
                if(errorUserCB)
                    errorUserCB(data);
            });
    };

});
