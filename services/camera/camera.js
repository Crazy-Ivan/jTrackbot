

module.exports = function setup(options, imports, register) {
    var logger = imports.logger;
    var spawn = require('child_process').spawn;
    var raspividProcess;
    var ffmpegProcess;

    function onError(err) {
        console.log('An error occurred: ' + err.message);
    }

    function onExit() {
        console.log('Processing finished !');
    }

    function getRaspividProcess(options) {

        var width = options.width | 320;
        var height =  options.height | 240;
        var fps = options.fps | 15;
        var mode = options.mode | 'default';

        var standardOptions = ['-t', '0', '-w', width, '-h', height, '-fps', fps, '-o', '-', '-b', '8000000', '--vflip'],
            additionalOptions = ['negative', 'solarise', 'whiteboard', 'blackboard', 'sketch', 'denoise', 'emboss', 'oilpaint', 'gpen', 'pastel', 'watercolour', 'film', 'blur', 'saturation', 'colourswap', 'washedout', 'posterise', 'colourpoint', 'colourbalance', 'cartoon'];

        if(additionalOptions.indexOf(mode) !== -1) {
            standardOptions.push('-ifx');
            standardOptions.push(mode);
        }

        //console.log('raspivid ' +  standardOptions.join(' '));
        return spawn('raspivid', standardOptions);
    }

    function getFfmpegProcess() {
        var standardOptions = ['-i', 'pipe:0', '-f', 'video4linux2', '-f', 'mpeg1video', '-b', '800k', '-r', '20', 'pipe:1'];

        //console.log(' | ffmpeg ' +  standardOptions.join(' '));
        return spawn('ffmpeg', standardOptions);
    }

    function run(options, onData) {

       if(raspividProcess || ffmpegProcess) {
           stop();
       }

       raspividProcess = getRaspividProcess(options);
       ffmpegProcess = getFfmpegProcess();

        raspividProcess.stdout.on('data', function(data) {
            ffmpegProcess.stdin.write(data);
        });

        raspividProcess.on('error', onError)
                       .on('exit', onExit);

        ffmpegProcess.on('error', onError)
                     .on('exit', onExit)
                     .stdout.on('data', onData);

        logger.info('camera on');
    }

    function stop() {
        raspividProcess.kill();
        ffmpegProcess.kill();

        logger.info('camera off');
    }

    register(null, {
        camera : {
            run: run,
            stop: stop
        }
    });

};

