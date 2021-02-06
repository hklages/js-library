/** Identify profile and submit actions.
 * 
 *  @since 2021-02-06T0828
 * 
 *  @params {Object} msg not used, overwritten
 * 
 *  @flow_variable {string} currentProfile
 *  @flow_variable {Object} roomProfiles
 *  @global_variable {boolean} basics_IsTravel 
 * 
 *  @output {Array}  2 outputs [msg, msg1] 
 *  @output {Object} msg.payload = {"mode":"1" , "temperatures": [] } | {}
 *  @output {Object} msg1.payload = {} | {"mode":"0" , "profile": "1"|"2"|"3" } 
 * 
 *  @throws {string} node.error if roomProfiles do not provide data
 * 
 *  @prerequisites data in roomProfiles must be alphabetically ordered by roomName
 */

// eslint-disable-next-line no-unused-vars
function xxxx (msg, flow, node) { // please remove this line when copying back

  msg = null
  let msg1 = null
  if (global.get('basics_IsTravel')) {
    // set each heater to manual and to room specific travel temperature
    flow.set('currentProfile', 'verreist')
    msg = { payload: { mode: '1', temperatures: getTemperatureFromProfiles('travel') } }
  } else if (parseInt(flow.get('timeLimitedFor')) > 0) {
    //  set each heater to manual and to room specific time limited temperature
    flow.set('currentProfile', 'zeitbegrenzt')
    msg = { payload: { mode: '1', temperatures: getTemperatureFromProfiles('timeLimited') } }
  } else if (global.get('basics_IsAtHome')) {
    // set each heater to automatic and profile 3
    flow.set('currentProfile', 'zuHause')
    msg1 = { payload: { mode: '0', profile: '3' } }
  } else if (global.get('basics_IsHoliday')) {
    // set each heater to automatic and profile 2
    flow.set('currentProfile', 'Feiertag')
    msg1 = { payload: { mode: '0', profile: '2' } }
  } else {
    // set each heater to automatic and profile 1
    flow.set('currentProfile', 'Eco')
    msg1 = { payload: { mode: '0', profile: '1' } }
  }
  return [msg, msg1]

   
  function getTemperatureFromProfiles(profileType) {
    let profiles =   flow.get('roomProfiles')
    let data = []
    if (profileType == 'travel') {
      for (let i = 0; i < profiles.length; i++) {
        data[i] = profiles[i].travelling
      }    
    } else if (profileType == 'timeLimited') {
      for (let i = 0; i < profiles.length; i++) {
        data[i] = profiles[i].timeLimited
      }
    } else {
      node.error('getTemperatureFromProfiles: no data', msg)
    }
    return data
  }
} // please remove this line when copying back