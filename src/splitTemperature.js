/**  Sets at each port the temperature for the device.
  * @param  {array} msg.payload array of temperatures
  * Temperatur lower, equal zero is ignored.
  */
const MIN = 5;
let temperatures = msg.payload; // array!
let msgArray = [];
let output = {};
for (i = 0; i < temperatures.length; i++) {
  if (temperatures[i] > MIN) {
      output = {payload:temperatures[i]}
  } else {
      output = null; // no message
  }
  msgArray.push(output);
}
return msgArray;
