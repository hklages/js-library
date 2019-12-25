function nodered (msg, flow) { // dont copy this line to nodeRED and also the line after return
  /**  Verify that new date is NOT in the past - otherwise restore old value
  * INPUT msg.payload holds new date
  * OUTPUT msg.payload: date in iso format: if valid: selected date otherwise today
  * VERSION: 2019-12-25T1845
  * PORTS: 1
  */
  const selectedDate = new Date(msg.payload);
  const currentDate = new Date();
  if (selectedDate > currentDate) {
    msg.payload = selectedDate;
    msg.valid = true;
  } else {
    msg.payload = currentDate;
    msg.valid = false;
  }
  return msg;
} // dont copy this line to nodeRed
