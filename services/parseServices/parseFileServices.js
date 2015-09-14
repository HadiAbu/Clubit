/**
 * Created by me on 26/04/2015 by Saleem Salfeety.
 */
clubItModuleVar.service('FileService', function($http) {


   this.uploadFile = function(files,fileName,userSuccess,userError) {

   console.log("uploadFile in parseFileServices")
        console.log(files);
        $http({
            method: 'POST',
            url: 'https://api.parse.com/1/files/'+fileName,
            withCredentials: false,
            transformRequest: angular.identity,
            headers: {

              'Content-Type': 'image/jpeg'
            },
            data: files[0]
        })
            .success(function(data, success) {
                console.log(data);
                if(userSuccess)
                    userSuccess(data);
            })
            .error(function(data, status) {
                alert("Error" + status);
                if(userError)
                    userError(data);
            });
    };
    /*
    * not supported by parse
    * */
    //this.deleteFile = function(fileName,userSuccess,userError) {
    //    console.log(fileName);
    //    $http({
    //        method: 'DELETE',
    //        url: 'https://api.parse.com/1/files/'+fileName,
    //        headers: {
    //            'Content-Type': 'image/jpeg'
    //        }
    //    })
    //        .success(function(data, success) {
    //            console.log(data);
    //            if(userSuccess)
    //                userSuccess(data);
    //        })
    //        .error(function(data, status) {
    //            alert("Error" + status);
    //            if(userError)
    //                userError(data);
    //        });
    //}
});
