/** Extract blind position and amount of blinds closed from payload data.
* VERSION 2019-10-11T1053
* PREREQ: HomePilot V5! (since 2019-09)
* OUTPUT
* msg0 ... msg5: position - ordered by blind device id!
* msg6 amount of not opened blinds
*/

let blindsNotOpen = 0
if (typeof msg.payload === 'undefined' || msg.payload === null ||
  (typeof msg.payload === 'number' && isNaN(msg.payload)) || msg.payload === '') {
  node.error('invalid payload', msg);
  return;
}

if (typeof msg.payload.devices === 'undefined' || msg.payload.devices === null ||
  (typeof msg.payload.devices === 'number' && isNaN(msg.payload.devices)) || msg.payload.devices === '') {
  node.error('invalid payload.devices - undefined', msg);
  return;
}

if (!Array.isArray(msg.payload.devices)) {
    node.error('invalid payload.devices- not array', msg);
    return;
}
msg.payload.devices.forEach(function(device) {
    if (device.statusesMap.Position > 0) blindsNotOpen++;
});

return [
    {payload:msg.payload.devices[0].statusesMap.Position},
    {payload:msg.payload.devices[1].statusesMap.Position},
    {payload:msg.payload.devices[2].statusesMap.Position},
    {payload:msg.payload.devices[3].statusesMap.Position},
    {payload:msg.payload.devices[4].statusesMap.Position},
    {payload:msg.payload.devices[5].statusesMap.Position},
    {payload:blindsNotOpen}
];
