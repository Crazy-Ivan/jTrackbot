var pwm = require('pi-blaster.js');
var gpio = require('pi-gpio');

module.exports = function setup(options, imports, register) {

   function Motor(powerPin, directionPinA, directionPinB) {

        this.powerPin = powerPin;
        this.directionPinA = { nr: directionPinA, value: 0 };
        this.directionPinB = { nr: directionPinB, value: 0 };

        this.power = 0;
        this.direction = true;
   }

   function setDirectionPin(pin, value) {

       if((value === 0 || value === 1) && pin.value !== value) {

           pin.value = value;

           gpio.open(pin.nr, "output", function(err) {
               gpio.write(pin.nr, pin.value, function() {
                   gpio.close(pin.nr);
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

   function motorsStandBy(value){
       if(value === 0 || value === 1) {
           gpio.open(options.standByPin, "output", function(err) {
               gpio.write(options.standByPin, value, function() {
                   gpio.close(options.standByPin);
               });
           });
       }
   }

    register(null, {
        motor: {
            create: motorFactory,
            standBy: motorsStandBy
        }
    });

};