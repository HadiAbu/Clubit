/**
 * Created by Admin on 5/7/2015.
 */
clubItModuleVar.service('activitiesService', function () {

    this.activityName = "";
    this.content = "";
    this.picturesArray = [];
    this.emplyeesArray = [];
    this.vidoesArray = [];
    this.description = "";
    this.messagesArray = [];
    this.CurrentActivity;// = new Activity();


    //this.acc1 = new Activity("salsa","ia am footrball");
    //this.acc2 = new Activity("salsa","amm akfode snookoer");


    this.acrt =  [
     //new Activities("salsa",'activity' , this.acc1),
     //new Activities("salsa",'activity',this.acc2)
    ];

    this.findActivityByName = function (name){

        for (var act in this.acrt){
            if (this.acrt[act].name == name){
                return this.acrt[act]/*.activity*/;
            }
        }


    }

    this.findMessageByParseId = function (idFromParse){

        for (var mes in this.messagesArray){
            if (this.messagesArray[mes].messageParseId == idFromParse){
                // return this.massageInMainArr[mes];
                return mes;
            }
        }


    }

});
