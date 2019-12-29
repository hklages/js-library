function nodered (msg, flow, node) { // dont copy this line to nodeRED and also the line after return
/** Defines msg.payload (html body) and msg.topic (scene id).
* VERSION 2019-12-29T1530
* PREREQ: HomePilot V5! (since 2019-09)
* INPUT: msg.payload valid scene name
* OUTPUT: msg.topic corresponding scene id, msg.payload body including
*/
  const ERROR_PREFIX = 'ExecScene - invalid input -';

  if (typeof msg.payload === 'undefined' || msg.payload === null ||
    (typeof msg.payload === 'number' && isNaN(msg.payload)) || msg.payload === '') {
    node.error(ERROR_PREFIX + 'payload undefined', msg);
    return;
  }
  const sceneName = msg.payload;
  const mapSid = global.get('blinds_SceneNames');
  if (typeof mapSid === 'undefined' || mapSid === null) {
    node.error(ERROR_PREFIX + 'blinds_SceneNames not properly set up', msg);
    return;
  }
  let sid = 'not found';
  for (let i = 0; i < mapSid.length; i++) {
    if (mapSid[i].name === sceneName) {
      sid = mapSid[i].id;
      break;
    }
  }
  if (sid === 'not found') {
    node.error(ERROR_PREFIX + 'device name not found', msg);
    return;
  }
  msg.topic = sid;
  msg.payload = { request_type: 'EXECUTESCENE', trigger_event: 'TRIGGER_SCENE_MANUALLY_EVT' };
  return msg;
} // dont copy this line to nodeRed
