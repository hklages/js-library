// PURPOSE: Sets delay 05 25 35 55 min
// OUTPUT: msg.delay is set for 4 channels as above
// VERSION: 2019-09-12T1554

const SECONDS_PER_MINUTE = 60;
const MILLISECONDS = 1000;

// messages for output
let msg5500 = {"delay": 55*SECONDS_PER_MINUTE*MILLISECONDS};
let msg3500 = {"delay": 35*SECONDS_PER_MINUTE*MILLISECONDS};
let msg2500 = {"delay": 25*SECONDS_PER_MINUTE*MILLISECONDS};
let msg0500 = {"delay": 5*SECONDS_PER_MINUTE*MILLISECONDS};

return [msg0500,msg2500,msg3500,msg5500];
