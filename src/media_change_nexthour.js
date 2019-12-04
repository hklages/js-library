const SECONDS_PER_HOUR = 3600;
const SECONDS_PER_MINUTE = 60;
const MILLISECONDS = 1000;

function nodered (msg, flow) { // dont copy this line to nodeRED and also the line after return
  /** Sets msg.delay to next hour
  * PARAMETER: msg.payload holds the current ISO Time / home time zone
  * CAUTION: msg.payload time must be in ISO format and time zone of the sonos player location not the nodeRED server time zone
  * VERSION: 2019-12-04T0905
  * PORTS: 1
  */

  // Get key properites from flow example 06:00, 23:30
  const timeStart = flow.get('timeStart').split(':');
  const timeEnd = flow.get('timeEnd').split(':');

  // format hhmmss for TIME* and positive integer smaler 60 for trigger elements
  const TIME_START = pad2digits(timeStart[0]) + timeStart[1] + '00';
  const TIME_END = pad2digits(timeEnd[0]) + timeEnd[1] + '00';

  // extract time from payload
  const hours = msg.payload.substr(11, 2);
  const minutes = msg.payload.substr(14, 2);
  const seconds = msg.payload.substr(17, 2);
  const hhmmss = hours.concat(minutes).concat(seconds);
  const mInSec = parseInt(minutes) * SECONDS_PER_MINUTE + parseInt(seconds);

  // messages for output, null means no message on that port
  let newMsg = null;

  if (hhmmss < (TIME_START) || hhmmss > (TIME_END)) {
    // do nothing - out of time range
  } else {
    // activate recurrent trigger for hours
    newMsg = { delay: delayTo(0, mInSec) };
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
