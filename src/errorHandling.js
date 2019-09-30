/** Process incoming error caught from other notes on same tab
* @param {Object} msg incoming message
* @param {Object} env environment variable - KeyVariable for tasker, message output indicators
* @param {Object} node this node
* @since 2019-09-30T0912
* Prereq: property DebugToMobile requires key and uses Tasker Autoremote
* Uses global variable for tasker key. Name is stored in property KeyVariable
*/

// GITHUB MODULE errorHandling.js To use in function node the following and last line have to be removed/ as comment
function errorHandling (msg, env, node) {
  const errorTab = env.get('Tabname');
  let errorNodeName = 'unbekannt';
  let errorNodeType = 'unbekannt';
  let errorNodeId = 'unbekannt';
  let errorMessage = 'unbekannt';

  if (typeof msg.error === 'undefined' || msg.error === null || msg.error === '') {
    // no infos - use default text
  } else {
    if (typeof msg.error.source === 'undefined' || msg.error.source === null || msg.error.source === '') {
      // no source infos - use default
    } else {
      if (typeof msg.error.source.name === 'undefined' || msg.error.source.name === null || msg.error.source.name === '') {
        // use default text
      } else {
        errorNodeName = msg.error.source.name;
      }
      if (typeof msg.error.source.type === 'undefined' || msg.error.source.type === null || msg.error.source.type === '') {
        // use default text
      } else {
        errorNodeType = msg.error.source.type;
      }
      if (typeof msg.error.source.id === 'undefined' || msg.error.source.id === null || msg.error.source.id === '') {
        // use default text
      } else {
        errorNodeId = msg.error.source.id;
      }
    }
    if (typeof msg.error.message === 'undefined' || msg.error.message === null || msg.error.message === '') {
      // no infos - use default text
    } else {
      errorMessage = msg.error.message;
    }
  }

  const fullMessage = `Fehler in Tab-Node-function: ${errorTab}. NodeName: ${errorNodeName} NodeType: ${errorNodeType} NodeId: ${errorNodeId} Msg: ${errorMessage}`;

  if (env.get('DebugToUI')) {
    node.error(fullMessage);
  }
  if (env.get('DebugToLog')) {
    node.log(fullMessage);
  }
  if (env.get('DebugToMobile')) {
    const key = global.get(env.get('KeyVariable'));
    msg = { 'payload': fullMessage, 'key': key}
    return msg;
  }
}
