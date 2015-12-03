var assets         = require('connect-assets');
var express        = require('express');
var httpProxy      = require('http-proxy');
var HttpProxyRules = require('http-proxy-rules');



module.exports = function(config) {
    var app   = express();
    var proxy = httpProxy.createProxyServer();

    app.set('views', './lib/views');
    app.set('view engine', 'jade');

    app.use(assets({
        paths: ['./lib/views']
    }));



    // App routes
    app
    .get('/',          require('./controllers/landing'))
    .get('/dashboard', require('./controllers/dashboard'))
    .get('/login',     require('./controllers/register/login'))
    .get('/logout',    require('./controllers/register/logout'));



    // Set up proxy rules instance
    var proxyRules = new HttpProxyRules({
        rules: { '/api/*': 'http://' + config.app.host + ':' + config.app.port }
    });
    app.get('/api/*', function(req, res) {
        var target = proxyRules.match(req);
        proxy.web(req, res, { target: { host: config.proxy.host, port: config.proxy.port } });
    });



    return app;
};
