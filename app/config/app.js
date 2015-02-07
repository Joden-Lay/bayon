module.exports = {
    port: 3000,
    debug: true,
    showXPower: true, // show x-powered on HTTP header
    http: {
        route: 'route.http.js',
        secure: false
    },
    socket: {
        enable: false,
        route: 'route.socket.js',
        secure: false
    },
    view: {
        enable: true,
        cache: false // this option should be enable on production mode
    },
    directive: {
        public: 'public',
        controller: 'controller',
        filter: 'filter',
        model: 'model',
        logger: 'var/app.log',
        lib: 'lib'
    },
    express: {
        'trust proxy': ['linklocal', 'uniquelocal'],
        'query parser': 'extended',
        'strict routing': false,
        'case sensitive routing': false,
        'etag': true
    }
};
