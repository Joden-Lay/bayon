'use strict';

// Alias namespaces
let UserModel = bayon.model.User;
let utils = bayon.utils;

let assert = require('assert');

let Account = module.exports = {};

Account.register = function () {
    try {
        let body = this.body;
        let __ = this.__;

        assert(body.email, __('invalid email'));
        assert(utils.validator.isEmail(body.email), __('invalid email'));
        assert(body.password, __('invalid pasword'));
        assert(utils.validator.isAlphanumeric(body.password), __('invalid pasword'));

        let existUser = UserModel.find({
            where: {
                email: body.email.toLowerCase()
            },
            attributes: ['id']
        });
        if (existUser) {
            this.terminate(409, __('email already taken'));

        }
    } catch (ex) {
        if (ex.constructor === 'AssertionError') {
            this.terminate(ex.message, 417);
        } else {
            throw ex;
        }
    }
};
