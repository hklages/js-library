/** Send error message to TASKER if debugToMobile is true
* GITHUB subflow handle errors
* @since 2019-10-13T1931
* PREREQ: uses TASKER autoremote and needs key, stored in global variable
*/
function dummy (env, msg, node) { // NODERED has to be deleted
  const unknown = 'unbekannt';

  let errorTab = env.get('Tabname');
  if (typeof errorTab === 'undefined' || errorTab === null || errorTab === '') {
    errorTab = unknown;
    node.warn('Tabname not defined');
  }

  let errorNodeName = unknown;
  let errorNodeType = unknown;
  let errorNodeId = unknown;
  let errorMessage = unknown;
  if (typeof msg.error === 'undefined' || msg.error === null || msg.error === '') {
    // no infos - use default text above
  } else {
    if (typeof msg.error.source === 'undefined' || msg.error.source === null || msg.error.source === '') {
      // no source infos - use default text above
    } else {
      if (typeof msg.error.source.name === 'undefined' || msg.error.source.name === null || msg.error.source.name === '') {
        // use default text above
      } else {
        errorNodeName = msg.error.source.name;
      }
      if (typeof msg.error.source.type === 'undefined' || msg.error.source.type === null || msg.error.source.type === '') {
        // use default text above
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
  const fullMessage = `Fehler in TAB: ${errorTab} NODENAME: ${errorNodeName} NODETYPE: ${errorNodeType} NODEID: ${errorNodeId} DETAIL: ${errorMessage}`;

  let msgUIandLog = { payload: fullMessage };

  let msgMobile;
  if (env.get('DebugToMobile')) {
    const keyVariableName = env.get('KeyVariable'); // first get name of global variable
    if (typeof keyVariableName === 'undefined' || keyVariableName === null || keyVariableName === '') {
      node.error('Error in subflow: handle error: Invalid key variable name');
      msgMobile = null; // no message
      msgUIandLog = null; // no message
    } else {
      const key = global.get(keyVariableName);
      if (typeof key === 'undefined' || key === null || key === '') {
        node.error('Error in subflow: handle error: Key variable not defined or key invalid');
        msgMobile = null; // no message
        msgUIandLog = null; // no message
      } else {
        msgMobile = { payload: fullMessage, key: key };
      }
    }
  } else {
    msgMobile = null; // not message
  }
  return [msgMobile, msgUIandLog];
} // NODERED has to be deleted;
