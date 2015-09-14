/**
 * Created by me on 26/04/2015.
 */
function Activity(parseID,theName,theDescription){
    this.parseId  = parseID;
    this.name = theName;
    this.picturesArray = [];
    this.emplyeesArray = [];
    this.vidoesArray = [];
    this.description = theDescription;
    this.state = 'activity';
    this.isActive = '';
}

