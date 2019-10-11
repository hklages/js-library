// PURPOSE
// PREREQ uses and changes flow variables deviceStatus
// OUTPUT msg.payload contains amout of open windows and array deviceStatus is updated
//        msg. list contains new status data
// VERSION 2019-07-13T1001
// state icon state color are not used anymore
statusArray = flow.get("deviceStatus");

var stateIcon = (msg.value == "1"? "lock_open" : "lock");
var stateColor = (msg.value== "1"? "CornflowerBlue" : "Silver");
var newData = { "id": msg.device,
                "room": msg.room ,
                "state": msg.value,
                "stateIcon": stateIcon,
                "stateColor": stateColor
};
var i = statusArray.findIndex(x => x.id == newData.id)
if (i >= 0) {
    statusArray[i] = newData;
} else {
    statusArray.push(newData);
}

flow.set("deviceStatus", statusArray);

var open = 0;
statusArray.forEach(function(entry) {
    if (entry.state == 1) open +=1;
});
msg.list = statusArray;
msg.payload = open;
return msg;
