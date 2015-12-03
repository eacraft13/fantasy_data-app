var cluster = require('cluster');
var os      = require('os');



// Master
if (cluster.isMaster) {
    for (var i = 0; i < os.cpus().length; i++)
        cluster.fork();

    // Replace a dead worker
    cluster.on('exit', function (worker, code, signal) {
        console.log('Worker', worker.process.pid, 'died with code', code, '-- restarting...');
        cluster.fork();
    });
}



// Children
else {
    var config = { app: require('/etc/configs/app'), proxy: require('/etc/configs/proxy') };
    var app    = require('./lib/index')(config);
    app.listen(config.app.port);
}
