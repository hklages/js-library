// PURPOSE Update flow array deviceStatus with all current soll temperature  device data
// VERSION 2019-09-19T1530
// HINT array is at beginning build up from scratch
// OUTPUT array wiht updated status (device added if not in list)

let statusArray = flow.get("deviceStatus");

let value = msg.value.toString();
if (value.indexOf(".") < 0) {
    value += ".0";
}

let i = statusArray.findIndex(x => x.id == msg.device)
if (i >= 0) {
    statusArray[i].valueSoll = value;
} else {
    statusArray.push({ "id": msg.device, "room": msg.room ,
            "valueIst": "", "valueSoll": value,
            "valueSpecial":"-"});
}

flow.set("deviceStatus", statusArray);
msg.payload = statusArray;
return msg;
