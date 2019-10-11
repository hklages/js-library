// PURPOSE Update flow array deviceStatus with all current temperature  device data
// VERSION 2019-09-21T1740
// HINT array is at beginning build up from scratch
// OUTPUT array wiht updated status (device added if not in list)

let value = msg.value.toString();
if (value.indexOf(".") < 0) {
    value += ".0";
}

let statusArray = flow.get("deviceStatus");
let i = statusArray.findIndex(x => x.id == msg.device)
let profileArray = flow.get('roomProfiles');
let j = profileArray.findIndex(y => y.room == msg.room);
if (i >= 0) {
    statusArray[i].valueIst = value;
    statusArray[i].valueSpecial = profileArray[j].timeLimited;
} else {
    statusArray.push({ "id": msg.device, "room": msg.room ,
        "valueIst": value, "valueSoll": "",
        value, "valueSpecial": profileArray[j].timeLimited});
}

flow.set("deviceStatus", statusArray);
msg.payload = statusArray;
return msg;
