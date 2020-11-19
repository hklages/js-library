/**  Sets at each port the temperature for the device if temperature > 5
 * 
 * @since 2020-11-19T1123
 * 
 * @param  {array} msg.payload array of temperatures 
 * 
 * @output {array} array of objects { "payload": temperature }|{} 
 *  
 * @prerequisite: devices must be ordered by roomName
 */
// eslint-disable-next-line no-unused-vars
function xxxx(msg, flow, node) { // please remove this line when copying back

  const MIN = 5
  let temperatures = msg.payload // array!
  let msgArray = []
  let output = {}
  for (let i = 0; i < temperatures.length; i++) {
    if (temperatures[i] > MIN) {
      output = { payload: temperatures[i] }
    } else {
      output = null // no message
    }
    msgArray.push(output)
  }
  return msgArray
} // please remove this line when copying back