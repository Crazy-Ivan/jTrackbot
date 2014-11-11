

module.exports = function setup(options, imports, register) {
    var spawn = require('child_process').spawn;
    var raspivid;

    function onError(err) {
        console.log('An error occurred: ' + err.message);
    }

    function onExit() {
        console.log('Processing finished !');
    }

    function run(mode, onData) {
       if(raspivid) {
           stop();
       }

       var standardOptions = ['-t', '0', '-w', '320', '-h', '240', '-fps', '20', '-o', '-'],
           additionalOptions = ['negative', 'solarise', 'whiteboard', 'blackboard', 'sketch', 'denoise', 'emboss', 'oilpaint', 'gpen', 'pastel', 'watercolour', 'film', 'blur', 'saturation', 'colourswap', 'washedout', 'posterise', 'colourpoint', 'colourbalance', 'cartoon'];

       if(additionalOptions.indexOf(mode) !== -1) {
           standardOptions.push('-ifx');
           standardOptions.push(mode);
       }
       raspivid = spawn('raspivid', standardOptions);
       raspivid.on('error', onError)
               .on('exit', onExit)
               .stdout.on('data', onData);
    }

    function stop() {
        raspivid.kill();
    }

    register(null, {
        camera : {
            run: run,
            stop: stop
        }
    });

};

