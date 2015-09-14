/**
 * Created by Admin on 4/26/2015.
 */
clubItModuleVar.service('navbarService', function ($rootScope) {


    this.MainAccount;
    this.change = function(data){
        this.MainAccount = new Account(
            data.results[0].objectId,
                    data.results[0].companyName,
                    data.results[0].companyLogo,
                    data.results[0].companyHomeBG,
                    data.results[0].companyLocation,
                    data.results[0].companyHomeText,
                    data.results[0].companyActivities,
                    data.results[0].companyPhone,
                    data.results[0].companyEmail,
                    data.results[0].companyAddress,
                    data.results[0].companyVideo,
                    data.results[0].companyDescription,
                    data.results[0].companySocialTitleText,
                    data.results[0].companyAboutTitleText,
                    data.results[0].companyContacts,
                    data.results[0].companyHomePageTitleText,
                    data.results[0].companyHomePageContentText,
                    data.results[0].companyCarouselPictureIds,
                    data.results[0].companyMainTextTitle,
                    data.results[0].companyMainTextContent

        );
        $rootScope.$broadcast('AccountChanged', this.MainAccount);
    };

    this.allStates = [
        //new RState('Contacts','contacts',''),

        new RState('Social','social',''),
        new RState('About','about',''),
        new RState('Main','main','')

    ];

    this.allActivities = [
    ];
    this.userName="";
    this.nameTabToChange = "";
    this.userType = "admin";
    this.initState = function (theName) {
        for(var st in this.allStates)
        {
            if(this.allStates[st].theName==theName)
            {
                this.allStates[st].isActive='active';
            }
            else
                this.allStates[st].isActive ="";
        }
    };

    this.findByName = function(name) {
        for (var ac in this.allStates) {
            if (this.allStates[ac].theName == name) {
                return this.allStates[ac];
            }
        }
    };

    this.findByState = function(state){
        for (var ac in this.allStates) {
            if (this.allStates[ac].theState == state) {
                return this.allStates[ac];
            }
        }
    };
    this.findActivityByName = function (name){
        for (var act in this.allActivities){
            if (this.allActivities.name == name){
                return this.allActivities[act].activity;
            }
        }
    };


});


