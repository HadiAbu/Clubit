/**
 * Created by me on 01/05/2015.
 */

clubItModuleVar.service('parseAssociatedFileService', function($http) {
//adding to an existing table a new entry

    this.uploadAssociatedFile = function(files,pictureName,columnName,tableName,userSuccess,userError,userAfterImgeSaveCB) {
        console.log(files);
        console.log(columnName);

        $http.post("https://api.parse.com/1/files/"+pictureName, files[0], {
            withCredentials: false,
            headers: {
                'Content-Type': 'image/jpeg'
            },
            transformRequest: angular.identity
        }).then(function(data) {
            console.log(data);

            var obj = {};
            obj[columnName] = {
                "name": data.data.name,
                "__type": "File"
            };

            $http({
                method : 'POST',
                url : 'https://api.parse.com/1/classes/'+tableName,
                data: obj

            })
                .success(function (data, status) {
                    console.log(data);
                    if(userSuccess)
                        userSuccess(data);
                })
                .error(function (data, status) {
                    alert('ERROR' + status);
                    if(userError)
                        userError(data);
                });
            if(userAfterImgeSaveCB)
                userAfterImgeSaveCB(data);
        });


    };

// updating a certain row in an existing table
    this.updateAssociatedFile = function(parseId,files,pictureName,columnName,tableName,userSuccess,userError,userAfterImgeSaveCB) {
        console.log(files);
        console.log(columnName);


        $http.post("https://api.parse.com/1/files/"+pictureName, files[0], {
            withCredentials: false,
            headers: {
                'Content-Type': 'image/jpeg'
            },
            transformRequest: angular.identity
        }).then(function(data) {
            console.log(data);
            var obj = {};
            obj[columnName] =
            {
                "name": data.data.name,
                "__type": "File"
            };
            //console.log(obj);
            var toDelete = {};
            toDelete[columnName] = {"__op":"Delete"};
            $http({
                method : 'PUT',
                url : 'https://api.parse.com/1/classes/'+tableName+'/'+parseId,
                data: toDelete

            })
                .success(function (data, status) {
                    console.log(data);

                })
                .error(function (data, status) {
                    alert('ERROR' + status);

                });
            $http({
                method : 'PUT',
                url : 'https://api.parse.com/1/classes/'+tableName+'/'+parseId,
                data: obj

            })
                .success(function (data, status) {
                    console.log(data);
                    if(userSuccess)
                        userSuccess(data);
                })
                .error(function (data, status) {
                    alert('ERROR' + status);
                    if(userError)
                        userError(data);
                });
            if(userAfterImgeSaveCB)
                userAfterImgeSaveCB(data);
        });


    };
    this.BuildActivity = function(files)
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
});