/** Define profile and submit actions.
 * 
 *  @since 2021-04-11T0906
 * 
 *  @params {Object} msg overwritten
 * 
 *  @flow_variable {Object} roomProfiles - for each room: travelling, timeLimited
 *                          rooms in lexical order by name
 * 
 *  @output {Array}   outputs [msg, msg1, msg2, msg3]
 *                    msg payload = new profile
 *                    msg1.payload  is mode auto, manu
 *                    msg2.payload  is week profile 1 for eco, 2 for holiday, 3 for at home
 *                    msg3.payload  is temperature array, different for each thermostate 
 * 
 *  @throws {string} node.error if roomProfiles do not provide data
 * 
 *  
 */

// eslint-disable-next-line no-unused-vars
function xxxx (msg, flow, node) { // please remove this line when copying back

  let msg1 = null
  let msg2 = null
  let msg3 = null
  let payload = 'unknown'
  if (msg.heatingStatus.isTravelling === 'on') {
    // set each heater to manual and to room specific travel temperature
    payload = 'travel'
    msg1 = { payload: 'manu' }
    msg3 = { payload: getTemperatureFromProfiles(payload) }
  } else if (msg.heatingStatus.timeLimitedFor > 0) {
    // set each heater to manual and to room specific time limited temperature
    payload = 'timeLimited'
    msg1 = { payload: 'manu' }
    msg3 = { payload: getTemperatureFromProfiles(payload) }
  } else if (msg.heatingStatus.isAtHome === 'on') {
    // set each heater to automatic and profile 3
    payload = 'atHome' 
    msg1 = { payload: 'auto' }
    msg2 = { payload: '3' }
  } else if (msg.heatingStatus.isHoliday === 'on') {
    // set each heater to automatic and profile 2
    payload = 'holiday'
    msg1 = { payload: 'auto' }
    msg2 = { payload: '2' }
  } else {
    // set each heater to automatic and profile 1
    payload = 'eco'
    msg1 = { payload: 'auto' }
    msg2 = { payload: '1' }
  }
  return [{ payload }, msg1, msg2, msg3]

   
  function getTemperatureFromProfiles(profileType) {
    let profiles =   flow.get('roomProfiles')
    let data = []
    if (profileType == 'travel') {
      for (let i = 0; i < profiles.length; i++) {
        data[i] = Number(profiles[i].travelling)
      }    
    } else if (profileType == 'timeLimited') {
      for (let i = 0; i < profiles.length; i++) {
        data[i] = Number(profiles[i].timeLimited)
      }
    } else {
      node.error('getTemperatureFromProfiles: no data', msg)
    }
    return data
  }
} // please remove this line when copying back