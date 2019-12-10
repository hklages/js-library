function nodered (msg, flow) { // dont copy this line to nodeRED and also the line after return
  /** Sends msg.triggerIndex holding trigger index according to current time
  * PARAMETER: msg.payload holds the current ISO Time / home time zone
  * CAUTION: msg.payload time must be in ISO format and time zone of the sonos player location not the nodeRED server time zone
  * VERSION: 2019-12-09T1424
  * PORTS: 1
  */
  const TRIGGER = flow.get('trigger');

  // extract time from payload
  const hours = msg.payload.substr(11, 2);
  const minutes = msg.payload.substr(14, 2);
  const seconds = msg.payload.substr(17, 2);
  const hhmmss = hours.concat(minutes).concat(seconds);
  const mmss = hhmmss.substr(-4);

  let triggerIndex;
  if (mmss >= pad2digits(TRIGGER[3])) {
    // range [TRIGGER[3] to 00:00)
    triggerIndex = 3;
  } else if (mmss >= pad2digits(TRIGGER[2])) {
    // range [TRIGGER[2] to TRIGGER[3])
    triggerIndex = 2;
  } else if (mmss >= pad2digits(TRIGGER[1])) {
    // range [TRIGGER[1] to TRIGGER[2])
    triggerIndex = 1;
  } else if (mmss > pad2digits(TRIGGER[0])) {
    // range [TRIGGER[0] to TRIGGER[1])
    triggerIndex = 0;
  } else {
    // range [00:00 to TRIGGER[0])
    triggerIndex = 3;
  }

  return { payload: triggerIndex };
} // dont copy this line to NodeRED

/** Adds a leading 0 in case of 1 digit.
* @param {string} number any 1 or 2 digit number
* @return {string} adds leading 0 if necessary and cuts to last 2 digits
* @since  2019-09-30T0820
*/
function pad2digits (number) {
return ('0' + number).substr(-2);
}
