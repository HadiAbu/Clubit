/**
 * Created by Admin on 5/10/2015.
 */
clubItModuleVar.service('massageInMainService', function () {

    this.massageInMainArr = [];

    this.findMessageByParseId = function (idFromParse){

        for (var mes in this.massageInMainArr){
            if (this.massageInMainArr[mes].messageParseId == idFromParse){
               // return this.massageInMainArr[mes];
                return mes;
            }
        }


    }


});