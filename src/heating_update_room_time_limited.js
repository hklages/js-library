/**  Updates room profile data with new timeLimited values. 
 * 
 * @since 2020-11-19T1524
 * 
 * @param  {Object} msg.payload not used
 * 
 * @flow_variable {Object} timeLimitedChanges (read only)
 * @flow_variable {Object} roomProfiles (read(write))
 * 
 */
// eslint-disable-next-line no-unused-vars
function xxxx(msg, flow, node) { // please remove this line when copying back

  let newValues = flow.get('timeLimitedChanges')
  let values = flow.get('roomProfiles')
  let foundIndex

  for (const [key, value] of Object.entries(newValues)) {
    foundIndex = values.findIndex((room) => (key === room.device))
    values[foundIndex].timeLimited = value
  }
  flow.set('roomProfiles', values)
  return msg
} // please remove this line when copying back