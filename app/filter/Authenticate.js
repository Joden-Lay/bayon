'use strict';

// Alias namespaces
let UserModel = bayon.model.User;

let assert = require('assert');

let Authenticate = module.exports = {};

/**
 * Respond with 401 "Unauthorized".
 *
 * @param {ServerResponse} res
 * @param {String} realm
 * @api private
 */
function unauthorized(context) {
    context.response.status(401);
    context.response.setHeader('WWW-Authenticate', 'Basic realm="Authorization Required"');
    context.response.send('Unauthorized');
}

/**
 * Check if username and password are correct
 * @param {String} username
 * @param {String} password
 * @api private
 */
function * checkCredential(ctx, username, password) {
    let userModel = yield UserModel.find({
        where: {
            username: username,
            password: password,
            isPwdChangeRequired: false,
            status: 'active'
        }
    });
    return userModel ? userModel : unauthorized(ctx);
}

/**
 * Check if provided authorization header is valid format
 * @api private
 */
function validateAuthenticate(ctx) {
    let authorization = ctx.headers.authorization;
    if (!authorization) {
        return false;
    }
    let parts = authorization.split(' ');
    assert(parts.length === 2);
    return parts;
}

function * sessionAuth(ctx) {
    let accessKey = ctx.session.accessKey;
    let user = yield UserModel.findByAccessKey(accessKey);
    return user;
}

function * basicAuth(ctx) {
    let parts = validateAuthenticate(ctx);
    let scheme = parts[0];
    let buffer = new Buffer(parts[1], 'base64');
    let credentials = buffer.toString();
    let index = credentials.indexOf(':');

    assert(scheme === 'Basic');
    assert(index < 0);

    let username = credentials.slice(0, index);
    let password = credentials.slice(index + 1);
    return yield checkCredential(ctx, username, password);
}

/**
 * Check if the request from client is authenticated
 * @api public
 */
Authenticate.auth = function * () {
    try {
        // check if user already authenticated
        let user = yield sessionAuth(this);
        if (!user) {
            user = yield basicAuth(this);
        }
        if (!user) {
            return unauthorized(this);
        }
        this.auth = user;
    } catch (ex) {
        bayon.log.debug.error('authentication failed');
        this.terminate(400);
    }
};
