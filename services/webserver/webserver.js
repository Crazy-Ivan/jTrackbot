var express = require('express'),
    favicon = require('serve-favicon'),
    morgan = require('morgan'),
    http = require('http'),
    path = require('path'),
    _ = require('lodash');

module.exports = function setup(options, imports, register) {

    var logger = imports.logger,
        app = express(),
        opts = _.defaults(options, {
            engine: 'jade',
            port: 3000,
            favicon: ''
        });

    app.set("views", opts.views);
    app.set("view options", { layout: false });
    app.set('view engine', opts.engine);

    // app.use(express.bodyParser());
    app.use(favicon(opts.favicon));
    app.use(morgan('dev'));

    for(var repo in opts.statics) {
        app.use(express.static(opts.statics[repo]));
    }

    var server = http.createServer(app);
    server.listen(opts.port, function(){
        logger.info('Web server listening on port ' + opts.port);
    });

    register(null, {
        'webserver': {
            app:  app,
            http: server }
    });
};