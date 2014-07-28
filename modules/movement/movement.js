

module.exports = function setup(options, imports, register) {

    var motor = imports.motor;

    var POWER_LEFT_MOTOR_PIN = 1,
        DIRECTION_LEFT_MOTOR_PIN_A = 2,
        DIRECTION_LEFT_MOTOR_PIN_B = 3,

        POWER_RIGHT_MOTOR_PIN = 4,
        DIRECTION_RIGHT_MOTOR_PIN_A = 5,
        DIRECTION_RIGHT_MOTOR_PIN_B = 6,

        motorLeft = motor(POWER_LEFT_MOTOR_PIN, DIRECTION_LEFT_MOTOR_PIN_A, DIRECTION_LEFT_MOTOR_PIN_B),
        motorRight =  motor(POWER_RIGHT_MOTOR_PIN, DIRECTION_RIGHT_MOTOR_PIN_A, DIRECTION_RIGHT_MOTOR_PIN_B),

        movement = 'forward';

    switch(movement) {
        case "forward":
            motorLeft.setPower(100);
            motorLeft.setDirection(true);

            motorRight.setPower(100);
            motorRight.setDirection(true);
            break;
        case "backward":
            motorLeft.setPower(100);
            motorLeft.setDirection(false);

            motorRight.setPower(100);
            motorRight.setDirection(false);
            break;
        case "left":
            motorLeft.setPower(100);
            motorLeft.setDirection(true);

            motorRight.setPower(100);
            motorRight.setDirection(false);
            break;
        case "right":
            motorLeft.setPower(100);
            motorLeft.setDirection(false);

            motorRight.setPower(100);
            motorRight.setDirection(true);
            break;
        case "forward-left":
            motorLeft.setPower(50);
            motorLeft.setDirection(true);

            motorRight.setPower(100);
            motorRight.setDirection(true);
            break;
        case "forward-right":
            motorLeft.setPower(100);
            motorLeft.setDirection(true);

            motorRight.setPower(50);
            motorRight.setDirection(true);
            break;
        case "backward-left":
            motorLeft.setPower(50);
            motorLeft.setDirection(false);

            motorRight.setPower(100);
            motorRight.setDirection(false);
            break;
        case "backward-right":
            motorLeft.setPower(100);
            motorLeft.setDirection(false);

            motorRight.setPower(50);
            motorRight.setDirection(false);
            break;
        default:
            motorLeft.setPower(0);
            motorRight.setPower(0);
            break
    }

    register(null, {});

};

