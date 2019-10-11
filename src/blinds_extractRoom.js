// PURPOSE get current status of all blinds and get amount of open blinds
// OUTPUT MULTIPLE: Blind status for each blind and number of blinds open
// VERSION 2019-07-13T0931

var blinds = []; // clear current status
var blindsNotOpen = 0;
msg.payload.devices.forEach(function(device) {
    blinds.push({room: device.name, deviceId: device.did, position: device.position });
    if (device.position > 0) blindsNotOpen++;
});

return [
    {payload:blinds[0].position},
    {payload:blinds[1].position},
    {payload:blinds[2].position},
    {payload:blinds[3].position},
    {payload:blinds[4].position},
    {payload:blinds[5].position},
    {payload:blindsNotOpen}
];
