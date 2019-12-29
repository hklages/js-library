function nodered (msg, flow, node, env) { // dont copy this line to nodeRED and also the line after return
  /** Defines msg.payload as device id.
  * VERSION 2019-12-29T1620
  * PREREQ: HomePilot V5! (since 2019-09)
  * INPUT: subflow property valid device name
  * OUTPUT: msg.payload corresponding device id
  */
  const ERROR_PREFIX = 'GetPos - invalid input -';

  if (typeof env.get('Devicename') === 'undefined' || env.get('Devicename') === null ||
    (typeof env.get('Devicename') === 'number' && isNaN(env.get('Devicename'))) || env.get('Devicename') === '') {
    node.error(ERROR_PREFIX + 'Devicename undefined', msg);
    return;
  }

  const deviceName = env.get('Devicename');

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
  msg.payload = did;
  return msg;
} // dont copy this line to nodeRed
