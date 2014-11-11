module.exports = function setup(options, imports, register) {

    var camera =  imports.camera;
    var move = imports.movement;
    var ws = imports.websocket;

    function onCameraData(data) {
        ws.emit('videoStream', data);
    }

    camera.run('default', onCameraData);
    register(null, {});

};

