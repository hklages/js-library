function nodered (msg, flow, node) { // dont copy this line to nodeRED and also the line after return
/** Extract array of blind devices with name, id, position.
* VERSION 2019-12-29T1308
* PREREQ: HomePilot V5! (since 2019-09)
* INPUT: Output from corresponding http request to Homepilot
* OUTPUT: Array of { name: , position: , did: }
*/
  const ERROR_PREFIX = 'GetPosAll - invalid data from HomePilot -';

  if (typeof msg.payload === 'undefined' || msg.payload === null ||
    (typeof msg.payload === 'number' && isNaN(msg.payload)) || msg.payload === '') {
    node.error(ERROR_PREFIX + 'payload undefined', msg);
    return;
  }

  if (typeof msg.payload.devices === 'undefined' || msg.payload.devices === null ||
    (typeof msg.payload.devices === 'number' && isNaN(msg.payload.devices)) || msg.payload.devices === '') {
    node.error(ERROR_PREFIX + '- payload.devices - undefined', msg);
    return;
  }

  if (!Array.isArray(msg.payload.devices)) {
    node.error(ERROR_PREFIX + 'invalid payload.devices- not array', msg);
    return;
  }
  const statusArray = [];
  msg.payload.devices.forEach(function (device) {
    statusArray.push({ name: device.name, position: device.statusesMap.Position, did: device.did });
  });
  if (statusArray.length > 0) {
    msg.payload = statusArray;
  } else {
    msg = null;
    node.error(ERROR_PREFIX + 'could not find any blinds', msg);
  }
  return msg;
} // dont copy this line to nodeRed
