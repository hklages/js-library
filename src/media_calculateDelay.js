// PURPOSE: Calculates delay to next full hour and to 05min, 25min, 35min 55min
//          The previous time will be set to 0 delay
//          delay for 05 25 35 55  or 06:00 today|next day
// OUTPUT: msg.delay is set for 5 channels as above
// VERSION: 2019-07-13T1235

// TODO Overwork

const SECONDS_PER_HOUR = 3600;
const SECONDS_PER_MINUTE = 60;
const MILLISECONDS = 1000;

// get time
let hours = msg.payload.substr(11,2);
let minutes = msg.payload.substr(14,2);
let seconds = msg.payload.substr(17,2);
let t = hours.concat(minutes).concat(seconds);
// tInSecs is t in seconds x
let tInSecs = parseInt(hours)*SECONDS_PER_HOUR + parseInt(minutes)*SECONDS_PER_MINUTE + parseInt(seconds);
let delay1Htrigger;

// messages for output
let msg1h = null;
let msg5500 = null;
let msg3500 = null;
let msg2500 = null;
let msg0500 = null;

if (t < "060000") {
    // set delay for 06:00 today
    delay1Htrigger = 6*SECONDS_PER_HOUR - tInSecs;
    delay1Htrigger *= MILLISECONDS;
    // TODO sicherstellen auch in der ersten Stunden!!!
     msg1h = {"delay": delay1Htrigger};

} else if (t > "233000") {
    // do nothing - will be restarted at 06000
} else {
     // m is time withou hour
    let m = t.substr(-4);
    let mInSec = parseInt(minutes)*60 + parseInt(seconds);
    msg1h = {"delay": delayTo(0,mInSec)};
    if (m > "5500") {
        msg5500 = {"delay": 0};
    } else if (m > "3500") {
         msg5500 = {"delay": delayTo(5,mInSec)};
         msg3500 = {"delay":0};
    } else if (m > "2500") {
         msg5500 = {"delay": delayTo(5,mInSec) };
         msg3500 = {"delay": delayTo(25,mInSec)};
         msg2500 = {"delay":0};
    } else if (m > "0500") {
        msg5500 = {"delay": delayTo(5,mInSec)};
        msg3500 = {"delay": delayTo(25,mInSec)};
        msg2500 = {"delay": delayTo(35,mInSec)};
        msg0500 = {"delay": 0};
    } else {
        msg5500 = {"delay": delayTo(5,mInSec)};
        msg3500 = {"delay": delayTo(25,mInSec)};
        msg2500 = {"delay": delayTo(35,mInSec)};
        msg0500 = {"delay": delayTo(55,mInSec)};
    }
}
return [msg0500,msg2500,msg3500,msg5500,msg1h];

function delayTo(target, current) {
    // Paramenter: target in minutes, as number
    // Parameter: current in seconds, as number

    return (3600 - target*60 - current)*1000;
}
