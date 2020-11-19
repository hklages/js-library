
// HINT array is at beginning build up from scratch
// OUTPUT array with updated status (device added if not in list)

/**   Updates flow roomStatus with new Ist/soll temperature for specific device.
 * If device is not in list, new entry will be created.
 * 
 * @since 2020-11-19T1123
 * 
 * @param {string} msg.payload new value
 * @param {string} msg.device  device name
 * @param {string} msg.datapoint  ACTUAL_TEMPERATURE|SET_POINT_TEMPERATURE
 * 
 * @flow_variable {Object} roomStatus (read/write)
 * 
 * @output {Object} updated flow variable roomStatus
 * @output {Object} msg.payload = ''
 *  
 */
// eslint-disable-next-line no-unused-vars
function xxxx(msg, flow, node) { // please remove this line when copying back
    
  let status = flow.get('roomStatus')

  let value = msg.payload
  let i = status.findIndex(x => x.device == msg.device)
  let isIstTemperature = (msg.datapoint === 'ACTUAL_TEMPERATURE')

  if (isIstTemperature) {
    if (i >= 0) {
      status[i].valueIst = value
    } else {
      status.push({ 'device': msg.device, 'valueIst': value, 'valueSoll': '' })
    }
  } else {
    if (i >= 0) {
      status[i].valueSoll = value
    } else {
      status.push({ 'device': msg.device, 'valueIst': '', 'valueSoll': value })
    }    
  }

  flow.set('roomStatus', status)
    
  // no data as we read from flow variable
  msg.paylaod = ''
  return msg
} // please remove this line when copying back
