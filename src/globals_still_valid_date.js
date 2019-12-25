function nodered (msg, flow, node) { // dont copy this line to nodeRED and also the line after return
  /**  Outputs msg.valid = false if NOT in past
  * INPUT msg.payload holds current date in ISO format at CCU Timezone
  * OUTPUT msg.valid = false / true
  * USES globals: basics_IsTravelUntil
  * VERSION: 2019-12-25T1845
  * PORTS: 1
  */

  const dayNow = (msg.payload).substr(0, 10);
  if (global.get('basics_IsTravelUntil') <= dayNow) {
    msg.valid = false;
  } else {
    msg.valid = true;
  }
  return msg;
} // dont copy this line to nodeRed
