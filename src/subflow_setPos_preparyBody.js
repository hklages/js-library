function nodered (msg, flow, node) { // dont copy this line to nodeRED and also the line after return
/** Defines msg.payload (html body) and msg.topic (device id).
* VERSION 2019-12-29T1458
* PREREQ: HomePilot V5! (since 2019-09)
* INPUT: msg.topic valid device name, msg.payload new position 0 ... 100
* OUTPUT: msg.topic corresponding device id, msg.payload body including new position value
*/
  const ERROR_PREFIX = 'SetPos - invalid input -';

  if (typeof msg.topic === 'undefined' || msg.topic === null ||
    (typeof msg.topic === 'number' && isNaN(msg.topic)) || msg.topic === '') {
    node.error(ERROR_PREFIX + 'topic undefined', msg);
    return;
  }

  if (typeof msg.payload === 'undefined' || msg.payload === null ||
    (typeof msg.payload === 'number' && isNaN(msg.payload)) || msg.payload === '') {
    node.error(ERROR_PREFIX + 'payload undefined', msg);
    return;
  }

  const position = parseInt(msg.payload);
  if (!Number.isInteger(position)) {
    node.error(ERROR_PREFIX + 'payload not integer', msg);
    return;
  }
  if (position > 100 || position < 0) {
    node.error(ERROR_PREFIX + 'payload not in range', msg);
    return;
  }

  const deviceName = msg.topic;
  const mapDid = global.get('blinds_DeviceNames');
  if (typeof mapDid === 'undefined' || mapDid === null) {
    node.error(ERROR_PREFIX + 'blinds_DeviceNames not properly set up', msg);
    return;
  }

  let did = 'not found';
  for (let i = 0; i < mapDid.length; i++) {
    if (mapDid[i].name === deviceName) {
      did = mapDid[i].id;
      break;
    }
  }
  if (did === 'not found') {
    node.error(ERROR_PREFIX + 'device name not found', msg);
    return;
  }

  msg.topic = did;
  msg.payload = { name: 'GOTO_POS_CMD', value: position };
  return msg;
} // dont copy this line to nodeRed
