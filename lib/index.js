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

    // Funnel
    .get('/', handler('landing'))

    // Dashboard
    .get('/dashboard',                              handler('dashboard'))
    .get('/dashboard/game-stats/player',            handler('player_game_stats'))
    .get('/dashboard/game-stats/player-projected',  handler('player_projected_game_stats'))
    .get('/dashboard/game-stats/team',              handler('team_game_stats'))
    .get('/dashboard/game-stats/defense',           handler('defense_game_stats'))
    .get('/dashboard/game-stats/defense-projected', handler('defense_projected_game_stats'))

    // Register
    .get('/login',  handler('login'))
    .get('/logout', handler('logout'));

    // Account



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



function handler(view, options) {
    return function (req, res) {
        res.render(view, options || {});
    };
}
