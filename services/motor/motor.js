var pwm = require('pi-blaster.js');
var gpio = require('pi-gpio');

module.exports = function setup(options, imports, register) {

   function Motor(powerPin, directionPinA, directionPinB) {

        this.powerPin = powerPin;
        this.directionPinA = { nr: directionPinA, value: 0, isOpen: false };
        this.directionPinB = { nr: directionPinB, value: 0, isOpen: false };

        this.power = 0;
        this.direction = true;

        this.openPins();
   }

   function openPin(pin) {
       if(!pin.isOpen) {
           gpio.close(pin.nr, function(){
               gpio.open(pin.nr, "output", function(err) {
                   if(!err) {
                       pin.isOpen = true;
                   }
               })
           });
       }
   }

   function closePin(pin, callback) {
       if(pin.isOpen) {
           gpio.close(pin.nr, function(err) {
               pin.isOpen = false;
               callback();
           });
       }
   }

   function setDirectionPin(pin, value) {

       if((value === 0 || value === 1) && pin.value !== value && pin.isOpen) {

           pin.value = value;
           gpio.write(pin.nr, pin.value);
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

    Motor.prototype.openPins = function() {
        openPin(this.directionPinA);
        openPin(this.directionPinB);
    };

    Motor.prototype.closePins = function() {
       closePin(this.directionPinA);
       closePin(this.directionPinB);
   };


   function motorFactory(powerPin, directionPinA, directionPinB) {
       return new Motor(powerPin, directionPinA, directionPinB);
   }

   function initMotorDriver(standByPinNr) {
       gpio.open(standByPinNr, "output", function(err) {
           gpio.write(standByPinNr, 1, function() {
               gpio.close(standByPinNr);
           });
       });

       return motorFactory;
   }

    register(null, {
        motor: initMotorDriver
    });

};