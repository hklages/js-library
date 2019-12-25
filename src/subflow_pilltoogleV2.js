function nodered (msg, env, node, flow) { // dont copy this line to nodeRED and also the line after return
  /**  Update global variable if payload is different from current value or buttonpressed
  * INPUT msg.payload either "buttonpresse" or true/false
  * OUTPUT msg.payload contains new value and if changed msg.change = true otherwise false
  * USES global variableGlobal
  * VERSION: 2019-12-24
  * PORTS: 1
  */

  const vname = env.get('variableGlobal');
  const current = global.get(vname);
  msg.change = true;

  if (msg.payload === 'buttonpress') {
    // indicator button pressed
    global.set(vname, !current);
    msg.payload = !current;
  } else {
    // standard input true or false
    if (msg.payload !== current) {
      global.set(vname, msg.payload);
    } else {
      msg.change = false; // no output
    }
  }
  return msg;
} // dont copy to nodeRED
