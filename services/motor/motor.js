var pwm = require('pi-blaster.js');
var gpio = require('pi-gpio');

module.exports = function setup(options, imports, register) {

   function Motor(powerPin, directionPinA, directionPinB) {
        this.powerPin = powerPin;
        this.directionPinA = directionPinA;
        this.directionPinB = directionPinB;

        this.power = 0;
        this.direction = true;
   }

   Motor.prototype.setPower = function(power) {

   }

   Motor.prototype.setDirection = function(isForward) {

   }


   function motorFactory(powerPin, directionPinA, directionPinB) {
       return new Motor(powerPin, directionPinA, directionPinB);
   }

    register(null, {
        motor: motorFactory
    });

};