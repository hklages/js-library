/**  Extracts the week program data out of the ccu response. 
 * 
 * @since 2020-11-19T1513
 * 
 * @param  {Object} msg.payload not used
 * @param  {string} msg.day one of MONDAY|TUESDAY|...|SUNDAY
 * 
 * @flow_variable {Object} request (read only)
 * 
 * @output {object} object containing to arrays: triggers[] and temperatures[]
 * triggers in format hh:mm, temperatures as string
 * 
 * DETAILS: Input Data has format "<program>_ENDTIME_<day>_<index>"
 * with program P1|P2|P3, day see above, <index> 1 to 13
 * last relevant item is with 1440 = 24:00 all following will be ignored
 */
// eslint-disable-next-line no-unused-vars
function xxxx(msg, flow, node) { // please remove this line when copying back

  const PROFILE = flow.get('request').program
  const DAY = msg.day

  // define arrays - extracting data and transforming end point to start point
  const triggers = []
  const temperatures = []
  triggers.push(0) // start 00:00
  temperatures.push(20) // dummy - will be updated
  let trigger
  let key
  let keyTemperature
  let keyNextTemperature
  // There are maximum 13 point, last is that with = 1440 = 24:00
  // all other can be ignore. 
  // we have to transform from endpoint temperature to startpoint temperature
  for (let i = 1; i <= 13 ; i++) {
    key = `${PROFILE}_ENDTIME_${DAY}_${i.toString()}`
    keyTemperature = `${PROFILE}_TEMPERATURE_${DAY}_${i.toString()}`
    keyNextTemperature = `${PROFILE}_TEMPERATURE_${DAY}_${(i+1).toString()}`
    trigger = msg.payload[key]
    triggers.push(trigger)
    if (trigger === 1440) {
      temperatures[0]= msg.payload[keyTemperature]
      temperatures.push(msg.payload[keyTemperature])
      break
    } else {
      temperatures.push(msg.payload[keyNextTemperature])    
    }   
  }
  msg.payload = {
    triggers: triggers,
    temperatures: temperatures
  }
  return msg
} // please remove this line when copying back