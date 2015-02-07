'use strict';

// Alias namespaces
let UserModel = bayon.model.User;

let Account = module.exports = {};

Account.register = function () {
    if(this.method === 'GET'){
        return this.render('account/register');
    }
};

Account.login = function () {
    this.render('account/login');
};

Account.logout = function () {

};
