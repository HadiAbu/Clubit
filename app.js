/**
 * Created by me on 26/04/2015.
 */
GlobalParseConfiguration = {
    parsePassword : "",
    userName:"",
    

};

var clubItModuleVar = angular.module("clubItApp",['ui.router','ui.bootstrap', 'youtube-embed','uiGmapgoogle-maps','ngCookies']);

clubItModuleVar.config(function($httpProvider) {
    $httpProvider.defaults.headers.get = {
        'X-Parse-Application-Id': GlobalParseConfiguration.applicationId,
        'X-Parse-REST-API-Key': GlobalParseConfiguration.restApiId
    };
    $httpProvider.defaults.headers.post = {
        'X-Parse-Application-Id': GlobalParseConfiguration.applicationId,
        'X-Parse-REST-API-Key': GlobalParseConfiguration.restApiId
    };
    $httpProvider.defaults.headers.put = {
        'X-Parse-Application-Id': GlobalParseConfiguration.applicationId,
        'X-Parse-REST-API-Key': GlobalParseConfiguration.restApiId
    };
    $httpProvider.defaults.headers.delete = {
        'X-Parse-Application-Id': GlobalParseConfiguration.applicationId,
        'X-Parse-REST-API-Key': GlobalParseConfiguration.restApiId
        //'X-Parse-Master-Key':GlobalParseConfiguration.master
    };

});
clubItModuleVar.filter('reverse', function() {
    return function(items) {
        if(items == null) return;
        return items.slice().reverse();
    };
});
clubItModuleVar.run(['parseClassService','activitiesService',function(parseClassService,activitiesService) {
   // parseClassService.getTable()
    parseClassService.getTable('Activity',
        function(data){
            for(act in data.results)
            {
                activitiesService.acrt[act] =
                    new Activity(data.results[act].objectId,
                        data.results[act].name,
                        data.results[act].description);

            }
            console.log( activitiesService.acrt);
            activitiesService.CurrentActivity = activitiesService.acrt[0] ;
        },null);

}]);
function ClassAtrr(_name,_columns){this.name = _name;this.columns = _columns}
//function ArrayObj(classAtrrObj,isDone){this.obj = classAtrrObj; this.isDone = isDone;};
var classesArray = [];

