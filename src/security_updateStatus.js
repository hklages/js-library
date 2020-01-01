function nodered (msg, flow, node, env) { // dont copy this line to nodeRED and also the line after return
  /** Updates the deviceStatus array (adds new devices if discovered or updated existing with new status).
  * VERSION 2019-12-30T0827
  * USES deviceStatus
  * INPUT: new device with properties
  * OUTPUT: msg.payload amount of windows, msg.list array of all devices with updated status, room, id
  */

  const statusArray = flow.get('deviceStatus');
  const newData = {
    id: msg.device,
    room: msg.room,
    state: msg.value
  };
  var i = statusArray.findIndex(x => x.id === newData.id);
  if (i >= 0) {
    statusArray[i] = newData;
  } else {
    statusArray.push(newData);
  }

  flow.set('deviceStatus', statusArray);

  var open = 0;
  statusArray.forEach(function (entry) {
    if (entry.state === 1) open += 1;
  });
  msg.list = statusArray;
  msg.payload = open;
  return msg;
} // dont copy this line to nodeRed
