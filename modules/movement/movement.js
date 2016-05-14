

module.exports = function setup(options, imports, register) {

    var motor = imports.motor;

    var POWER_LEFT_MOTOR_PIN = 17,
        DIRECTION_LEFT_MOTOR_PIN_A = 12,
        DIRECTION_LEFT_MOTOR_PIN_B = 16,

        POWER_RIGHT_MOTOR_PIN = 22,
        DIRECTION_RIGHT_MOTOR_PIN_A = 18,
        DIRECTION_RIGHT_MOTOR_PIN_B = 22,

        motorLeft = motor.create(POWER_LEFT_MOTOR_PIN, DIRECTION_LEFT_MOTOR_PIN_A, DIRECTION_LEFT_MOTOR_PIN_B),
        motorRight =  motor.create(POWER_RIGHT_MOTOR_PIN, DIRECTION_RIGHT_MOTOR_PIN_A, DIRECTION_RIGHT_MOTOR_PIN_B);

    motor.standBy(1);

    function move(movement) {

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

                motorLeft.setPower(80);
                motorLeft.setDirection(true);

                motorRight.setPower(100);
                motorRight.setDirection(true);
                break;
            case "forward-right":

                motorLeft.setPower(100);
                motorLeft.setDirection(true);

                motorRight.setPower(80);
                motorRight.setDirection(true);
                break;
            case "backward-left":

                motorLeft.setPower(80);
                motorLeft.setDirection(false);

                motorRight.setPower(100);
                motorRight.setDirection(false);
                break;
            case "backward-right":

                motorLeft.setPower(100);
                motorLeft.setDirection(false);

                motorRight.setPower(80);
                motorRight.setDirection(false);
                break;
            default:
                motorLeft.setPower(0);
                motorRight.setPower(0);
                break;
        }
    }

    register(null, {
        movement: move
    });

};

