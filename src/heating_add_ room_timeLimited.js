/**  Adds roomName and timeLimited temperature to each item in list.
 * 
 * @since 2020-11-19T1221
 * 
 * @param  {array} msg.payload not used
 * 
 * @flow_variable {Object} roomStatus (read/write)
 * @flow_variable {Object} roomProfiles (read only)
 * 
 * @output {array} array of objects {roomName, valueIst, valueSoll, valueTimeLimited}
 */
// eslint-disable-next-line no-unused-vars
function xxxx(msg, flow, node) { // please remove this line when copying back

  let profiles = flow.get('roomProfiles')
  let status = flow.get('roomStatus')
  let index
  let newPayload = status.map((statusItem) => {
    index = profiles.findIndex ((item) => item.device === statusItem.device)
    statusItem.roomName = profiles[index].roomName
    statusItem.valueTimeLimited = profiles[index].timeLimited
    return statusItem
  })
  msg.payload = newPayload.slice()
  return msg

} // please remove this line when copying back