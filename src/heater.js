let msg1 = {payload:{}};
let msg2 = {payload:{}};
let msg3 = {payload:{}};
let msg4 = {payload:{}};
let temperatureArray = [];
node.warn('x');
node.warn(global.get('basics_IsTravel'));
if (global.get('basics_IsTravel') == true) {
  // set each heater to manual and to room specific travel temperature
    flow.set("currentProfile", 'imUrlaub');
    msg.payload = {mode: 0, temperatures: temperatureArray};
} else if (parseInt(flow.get('TimeLimitedFor' > 0))) {
    //  set each heater to manual and to room specific time limited temperature
    flow.set("currentProfile", 'zeitbegrenzt');
    msg.payload = {mode: 0, temperatures: temperatureArray};
} else if (global.get('basics_IsAtHome')== true) {
    // set each heater to automatic and profile 3
    node.warn('xxxx');
    flow.set("currentProfile", 'zuHause');
    msg.payload = {mode: 1, profile: 3 };
} else if (global.get('basics_IsHoliday')== true) {
    // set each heater to automatic and profile 2
    flow.set("currentProfile", 'Feiertag');
    msg.payload = {mode: 1, profile: 2 };
} else {
    // set each heater to automatic and profile 1
    flow.set("currentProfile", 'Standard');
    msg.payload = {mode: 1, profile: 2 };
}
return [msg, msg1, msg2, msg3, msg4];


function getTemperatureFromProfiles(profileType) {
    let profiles =   flow.get("profiles", zeitbegrenzt);
    let data = []
    if (profileType == 'Travel') {
        for (i = 0; i < profiles.length; i++) {
            data[i] = profiles[i].Travel;
        }
    } else if (profileType == 'TimeLimited') {
        for (i = 0; i < profiles.length; i++) {
            data[i] = profiles[i].TimeLimited;
        }
    } else {
        node.error('no data');
    }

    return data;
}
