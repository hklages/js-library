const SECONDS_PER_HOUR = 3600;
const SECONDS_PER_MINUTE = 60;
const MILLISECONDS = 1000;

function nodered (msg, flow) { // dont copy this line to nodeRED and also the line after return
  /** Sets delay in milliseconds to 4 output channels: trigger0, trigger1, trigger2, trigger3
  * PARAMETER: msg.payload holds the ISO Time for CCU time zone
  * CAUTION: msg.payload time must be in ISO format and time zone of the sonos player location not the nodeRED server time zone
  * VERSION: 2019-12-04T0903
  * PORTS: 4
  */

  // Get key properites from flow example 06:00, 23:30
  const timeStart = flow.get('timeStart').split(':');
  const timeEnd = flow.get('timeEnd').split(':');

  // format hhmmss for TIME* and positive integer smaler 60 for trigger elements
  const TIME_START = pad2digits(timeStart[0]) + timeStart[1] + '00';
  const TIME_END = pad2digits(timeEnd[0]) + timeEnd[1] + '00';

  const TRIGGER = flow.get('trigger');

  const newMsg = [null, null, null, null];

  // extract time from payload
  const hours = msg.payload.substr(11, 2);
  const minutes = msg.payload.substr(14, 2);
  const seconds = msg.payload.substr(17, 2);
  const hhmmss = hours.concat(minutes).concat(seconds);
  const mmss = hhmmss.substr(-4);
  const mInSec = parseInt(minutes) * SECONDS_PER_MINUTE + parseInt(seconds);

  if (hhmmss < TIME_START || hhmmss > TIME_END) {
    // do nothing - out of time range
  } else {
    // triggers in current hour
    if (mmss > (pad2digits(TRIGGER[3]) + '00')) {
      // range [TRIGGER[3] to 00:00) - no timer to be set
    } else if (mmss > (pad2digits(TRIGGER[2]) + '00')) {
      // range [TRIGGER[2] to TRIGGER[3])
      newMsg[3] = { delay: delayTo(TRIGGER[0], mInSec) };
    } else if (mmss > (pad2digits(TRIGGER[1]) + '00')) {
      // range [TRIGGER[1] to TRIGGER[2])
      newMsg[2] = { delay: delayTo(TRIGGER[1], mInSec) };
      newMsg[3] = { delay: delayTo(TRIGGER[0], mInSec) };
    } else if (mmss > (pad2digits(TRIGGER[0]) + '00')) {
      // range [TRIGGER[0] to TRIGGER[1])
      newMsg[1] = { delay: delayTo(TRIGGER[2], mInSec) };
      newMsg[2] = { delay: delayTo(TRIGGER[1], mInSec) };
      newMsg[3] = { delay: delayTo(TRIGGER[0], mInSec) };
    } else {
      // range [00:00 to TRIGGER[0])
      newMsg[0] = { delay: delayTo(TRIGGER[3], mInSec) };
      newMsg[1] = { delay: delayTo(TRIGGER[2], mInSec) };
      newMsg[2] = { delay: delayTo(TRIGGER[1], mInSec) };
      newMsg[3] = { delay: delayTo(TRIGGER[0], mInSec) };
    }
  }
  return newMsg;
} // dont copy this line to nodeRED

function delayTo (target, current) {
  // Paramenter: target in minutes, as number
  // Parameter: current in seconds, as number
  return (SECONDS_PER_HOUR - target * SECONDS_PER_MINUTE - current) * MILLISECONDS;
}

/** Adds a leading 0 in case of 1 digit.
* @param {string} number any 1 or 2 digit number
* @return {string} adds leading 0 if necessary and cuts to last 2 digits
* @since  2019-09-30T0820
*/
function pad2digits (number) {
  return ('0' + number).substr(-2);
}
