/** Process incoming error caught from other notes on same tab
*   VERSION: 2019-09-29T1607
*   Prereq: Uses global variable for tasker key. Name is stored in property KeyVariable
*          properties define the alert type
*          property DebugToMobile requires key and uses Tasker Autoremote
*/
const errorTab = env.get('Tabname')
let errorNodeName = 'unbekannt';
let errorNodeType = 'unbekannt';
let errorNodeId = 'unbekannt';
let errorMessage = 'unbekannt';
let fullMessage;

if (typeof msg.error === 'undefined' || msg.error === null || msg.error === '') {
  // no infos - use default text
} else {
  if (typeof msg.error.source === 'undefined' || msg.error.source === null || msg.error.source === '') {
    // no source infos - use default
  } else {
    if (typeof msg.source.name === 'undefined' || msg.source.name === null || msg.source.name === '') {
      // use default text
    } else {
      errorNodeName = msg.source.name;
    }
    if (typeof msg.source.type === 'undefined' || msg.source.type === null || msg.source.type === '') {
      // use default text
    } else {
      errorNodeType = msg.source.type;
    }
    if (typeof msg.source.id === 'undefined' || msg.source.id === null || msg.source.id === '') {
      // use default text
    } else {
      errorNodeId = msg.source.id;
    }
  }
  if (typeof msg.error.message === 'undefined' || msg.error.message === null ||msg.error.message === '') {
    // no infos - use default text
  } else {
    errorMessage = msg.error.message;
  }
}

fullMessage = `Fehler in Tab-Node-function: ${errorTab}. NodeName: ${errorNodeName} NodeType: ${errorNodeType} NodeId: ${errorNodeId} Msg: ${errorMessage}`;

if (env.get("DebugToUI")) {
    node.error(fullMessage);
}
if (env.get("DebugToLog")) {
    node.log(fullMessage);
}
