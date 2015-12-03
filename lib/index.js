var assets         = require('connect-assets');
var express        = require('express');
var favicon        = require('serve-favicon');
var helmet         = require('helmet');
var httpProxy      = require('http-proxy');
var HttpProxyRules = require('http-proxy-rules');



module.exports = function(config) {
    var app   = express();
    var proxy = httpProxy.createProxyServer();

    app.use(favicon('./lib/views/_images/favicon.ico'));
    app.use('/images', express.static('./lib/views/_images'));
    app.use(helmet());

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
    .get('/dashboard',                                handler('dashboard'))
    .get('/dashboard/game-stats/player',              handler('player_game_stats'))
    .get('/dashboard/game-stats/player-projected',    handler('player_projected_game_stats'))
    .get('/dashboard/game-stats/team',                handler('team_game_stats'))
    .get('/dashboard/game-stats/defense',             handler('defense_game_stats'))
    .get('/dashboard/game-stats/defense-projected',   handler('defense_projected_game_stats'))
    .get('/dashboard/season-stats/player',            handler('player_season_stats'))
    .get('/dashboard/season-stats/player-projected',  handler('player_projected_season_stats'))
    .get('/dashboard/season-stats/team',              handler('team_season_stats'))
    .get('/dashboard/season-stats/defense',           handler('defense_season_stats'))
    .get('/dashboard/season-stats/defense-projected', handler('defense_projected_season_stats'))

    // Register
    .get('/login',  handler('login'))
    .get('/logout', handler('logout'))

    // Account

    // Proxy
    .get('/api/*', proxyHandler(config));



    return app;
};



function handler(view, options) {
    return function (req, res) {
        res.render(view, options || {});
    };
}

function proxyHandler(config) {
    var target = 'http://' + config.app.host + ':' + config.app.port;
    var proxyRules = new HttpProxyRules({ rules: { '/api/*': target } });
    return function (req, res) {
        var target = proxyRules.match(req);
        proxy.web(req, res, { target: target });
    };
}
