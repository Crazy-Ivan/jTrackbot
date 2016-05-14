module.exports = function setup(options, imports, register) {
    var controlSocketServer = imports.websocket.createServer({ port: 8084 });
    var video = imports.video;
    var movement = imports.movement;
    var logger = imports.logger;

    controlSocketServer.on('connection', function(ws) {
        logger.info('New connection to control server');
        ws.on('message', parseCommand);
    });

    function parseMovementCommand(command) {
        var availableMovements = ['forward', 'backward', 'right', 'left', 'stop', 'forward-right', 'backward-right', 'forward-left', 'backward-left'];
        if(command.type == 'movement' && availableMovements.indexOf(command.name) !== -1) {
            console.log(command.name);
            movement(command.name);
        }
    }

    function parseVideoCommand(command) {
        if(command.type === 'video') {
            switch(command.name) {
                case 'reset':
                    video.reset(command.payload);
                    break;
                case 'start':
                    video.start(command.payload);
                    break;
                case 'stop':
                    video.stop();
                    break;
            }
        }
    }

    function parseCommand(command) {
        command = JSON.parse(command);
        parseVideoCommand(command);
        parseMovementCommand(command);
    }


};

