var express = require('express');



module.exports = function(config) {
    var app = express();

    app.set('views', './lib/views');
    app.set('view engine', 'jade');



    // App routes
    app
    .get('/',          require('./controllers/landing'))
    .get('/dashboard', require('./controllers/dashboard'))
    .get('/login',     require('./controllers/register/login'))
    .get('/logout',    require('./controllers/register/logout'));



    return app;
};
