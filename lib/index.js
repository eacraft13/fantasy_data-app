var express = require('express');



module.exports = function(config) {
    var app = express();

    app.get('/', function(req, res) {
        res.send('Hello, World!');
    });

    return app;
};
