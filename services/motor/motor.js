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

   function setDirectionPin(pin, value) {

       if(value === 0 || value === 1) {
           gpio.open(pin, "output", function(err) {
               gpio.write(pin, value, function() {
                   gpio.close(pin);
               });
           });
       }
   }

   Motor.prototype.setPower = function(power) {

       if(power >= 0 && power <= 100) {
           this.power = power;
           this.power = this.power/100;
           pwm.setPwm(this.powerPin, this.power);
       }

   };

   Motor.prototype.setDirection = function(isForward) {
        if(isForward) {
            setDirectionPin(this.directionPinA, 1);
            setDirectionPin(this.directionPinB, 0);
        } else {
            setDirectionPin(this.directionPinA, 0);
            setDirectionPin(this.directionPinB, 1);
        }

       this.direction = isForward;
   };


   function motorFactory(powerPin, directionPinA, directionPinB) {
       return new Motor(powerPin, directionPinA, directionPinB);
   }

    register(null, {
        motor: motorFactory
    });

};