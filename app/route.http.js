module.exports = {
    home: {
        routes: [{
                handler: 'Home@index',
                path: '/',
                method: 'GET'
            }, {
                handler: 'Home@construction',
                path: '/construction',
                method: 'GET'
            }]
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
