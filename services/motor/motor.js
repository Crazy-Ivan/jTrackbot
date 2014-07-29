var pwm = require('pi-blaster.js');
var gpio = require('pi-gpio');

module.exports = function setup(options, imports, register) {

   var logger = imports.logger;

   function Motor(powerPin, directionPinA, directionPinB) {
        this.powerPin = powerPin;
        this.directionPinA = directionPinA;
        this.directionPinB = directionPinB;

        this.power = 0;
        this.direction = true;

        gpio.open(directionPinA, 'output', logError);
        gpio.open(directionPinB, 'output', logError);
   }

   Motor.prototype.setPower = function(power) {
       if(power <= 100 && power >= 0) {
           this.power = power;
           pwm.setPwm(this.powerPin, power/100);
       }
   };

   Motor.prototype.setDirection = function(isForward) {
       this.direction = isForward;

       if(isForward) {
           gpio.write(this.directionPinA, 1, logError);
           gpio.write(this.directionPinB, 0, logError);
       } else {
           gpio.write(this.directionPinA, 0, logError);
           gpio.write(this.directionPinB, 1, logError);
       }
   };

   function logError(err) {
       if(err) {
           logger.error('Motor GPIO error: ' + err);
       }
   }

   function motorFactory(powerPin, directionPinA, directionPinB) {
       return new Motor(powerPin, directionPinA, directionPinB);
   }

    register(null, {
        motor: motorFactory
    });

};