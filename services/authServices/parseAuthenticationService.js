/**
 * Created by me on 03/05/2015.
 */
clubItModuleVar.service('AuthService', function($http , globalService) {

    this.login = function(loginObj,successUserCB,errorUserCB){
//        console.log(loginObj);
        $http({
            method: 'GET',
            url: 'https://api.parse.com/1/login',
          // data:{"username":"saleem","password":"123456"}//loginObj
            //data-urlencode:
                params : loginObj//{"username":"saleem","password":"123456"}//{'username=cooldude6','password=p_n7!-e8'}
        })
            .success(function(data, success) {
                console.log(data);
                globalService.setUser(loginObj);
                if(successUserCB)
                    successUserCB(data);

            })
            .error(function(data, status) {
                //alert("Error" + status);
                if(errorUserCB)
                    errorUserCB(data,status);

            });
    };


    //////


    this.signUp = function(signUpObj,successUserCB,errorUserCB){
        console.log(signUpObj);
        var config = {headers:{'Content-Type':'application/json'}};
        $http.post('https://api.parse.com/1/users',signUpObj,config)
            .success(function(data, success) {
                console.log(data);
                /*
                 if(successUserCB)
                 successUserCB(data);
                 */
            })
            .error(function(data, status) {
                alert("Error" + status);
                /*
                 if(errorUserCB)
                 errorUserCB(data,status);
                 */
            });
    };




});
