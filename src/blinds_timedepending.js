// PURPOSE create commands to activate time depended scene for a hot day
// PRREQ scenes must be designe
// OUTPUT scene command for blinds

var date = new Date();
var hours = date.getHours();

if (hours >= 21) {
    msg.payload = "setBlindScene HotSunset";
} else if (hours >= 17) {
    msg.payload = "setBlindScene Hot1700";
} else if (hours >= 13) {
    msg.payload = "setBlindScene Hot1300";
} else if (hours >= 11) {
    msg.payload = "setBlindScene Hot1100";
} else if (hours >= 6) {
     msg.payload = "setBlindScene HotMorning";
} else {
     // dont know
}

return msg
