module.exports = function setup(options, imports, register) {

    var camera = imports.camera;
    var logger = imports.logger;
    var videoSocketServer = imports.websocket.createServer({ port: 8083 });
    var cameraOptions = {
        width: 320,
        height: 240,
        fps: 5
    };

    function onClientConnect(socket) {
        var streamHeader = new Buffer(8);

        streamHeader.write('jsmp');
        streamHeader.writeUInt16BE(cameraOptions.width, 4);
        streamHeader.writeUInt16BE(cameraOptions.height, 6);

        socket.send(streamHeader, { binary: true });

        logger.info('New connection to video stream');
    }

    function onClientClose() {
        logger.info('Disconnected from video stream');
    }

    function onCameraData(data) {
        videoSocketServer.broadcast(data, { binary: true });
    }

    function startVideo(options) {

        if(options) {
            cameraOptions = Object.defineProperties(cameraOptions,  options);
        }

        camera.run(cameraOptions, onCameraData);
        logger.info('transmitting video started');
    }

    function resetVideo(options) {
       camera.stop();
       startVideo(options);
    }

    videoSocketServer.on('connection', onClientConnect);
    videoSocketServer.on('close', onClientClose);
    //startVideo();

    register(null, {
        video: {
            start: startVideo,
            stop: camera.stop,
            reset: resetVideo
        }
    });

};

