/**
 * Created by adham jiries on 11/05/2015.
 */
clubItModuleVar.service('globalService', function($cookieStore  ) {

    this.user = null;
    this.isAuth = function (){
        if (this.user == null) {
            this.user = $cookieStore.get('user');

        }
        return (this.user != null);
    };
    this.setUser = function(newUser) {
        this.user = newUser;

        if (this.user == null)
            $cookieStore.remove('user');
        else
            $cookieStore.put('user', this.user);
    };
    this.getUser = function() {

        return this.user;
    };


});