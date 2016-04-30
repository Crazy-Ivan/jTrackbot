module.exports = function setup(options, imports, register) {
    var controlSocketServer = imports.websocket.createServer({ port: 8084 });
    var video = imports.video;
    var movement = imports.movement;
    var logger = imports.logger;

    controlSocketServer.on('connection', function(ws) {
        logger.info('New connection to control server');
        ws.on('message', parseCommand);
    });

    function keysToMovementCommand(keys) {
        var availableKeys = {
            'ArrowUp': 'forward',
            'ArrowDown': 'backward',
            'ArrowLeft': 'left',
            'ArrowRight': 'right'
        };

        //keys.filter(function(item) {
        //    return !!(availableKeys[item]);
        //});
        //



        //movement('forward');
    }

    function keysToVideoCommand(keys) {
        var availableKeys = {
            'KeyR': 'reset'
        };

        if(keys.indexOf('KeyR') !== -1) {
            video.reset();
        }
    }

    function parseCommand(keys) {
        keysToVideoCommand(keys);
        keysToMovementCommand(keys);
    }


};

