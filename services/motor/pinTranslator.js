var fs = require("fs");

var rev = fs.readFileSync("/proc/cpuinfo").toString().split("\n").filter(function(line) {
    return line.indexOf("Revision") == 0;
})[0].split(":")[1].trim();

rev = parseInt(rev, 16) < 3 ? 1 : 2; // http://elinux.org/RPi_HardwareHistory#Board_Revision_History

var pinMapping = {
    "3": 0,
    "5": 1,
    "7": 4,
    "8": 14,
    "10": 15,
    "11": 17,
    "12": 18,
    "13": 21,
    "15": 22,
    "16": 23,
    "18": 24,
    "19": 10,
    "21": 9,
    "22": 25,
    "23": 11,
    "24": 8,
    "26": 7,

    // Model A+ and Model B+ pins
    "29": 5,
    "31": 6,
    "32": 12,
    "33": 13,
    "35": 19,
    "36": 16,
    "37": 26,
    "38": 20,
    "40": 21
};

if (rev == 2) {
    pinMapping["3"] = 2;
    pinMapping["5"] = 3;
    pinMapping["13"] = 27;
}

function isNumber(number) {
    return !isNaN(parseInt(number, 10));
}

function sanitizePinNumber(pinNumber) {
    if (!isNumber(pinNumber) || !isNumber(pinMapping[pinNumber])) {
        throw new Error("Pin number isn't valid");
    }

    return parseInt(pinNumber, 10);
}

function translate(pinNumber) {
    return pinMapping[sanitizePinNumber(pinNumber)];
}

module.exports = translate;