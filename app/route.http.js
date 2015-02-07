module.exports = {
    home: {
        handler: 'Home@index',
        path: '/',
        method: 'GET'
    },
    account: {
        prefix: '/account',
        routes: [{
            handler: 'Account@login',
            method: 'GET',
            path: '/login'
        }]
    }
};
