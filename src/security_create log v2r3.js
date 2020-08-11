function nodered(msg, env, node, flow) { // dont copy this line to nodeRED and also the line after return
/**   Maintain a list of items - only add
* 
* @version 2020-08-11
* @param {boolean} msg.reset exist: resets the list to []
* @param {boolean} msg.restore exist: restores list from flow variable 
*
* @param {boolean} msg[state]: holds the state
* @param {string}  msg[info1]: holds additional data
* @param {string}  msg[info2]: holds additional data
*
* @output {object} msg.payload = {}
*
* @throws: in case of missing/wrong type data 
*/

// customization start
const listMaximum = 20
const flowVariable = 'ListLogAll'
const info1 = 'device'
const info2 = 'deviceType'
// customization end


// get flowVariable or if it does not exist set to [] (empty)
let list = []
if (flow.get(flowVariable)) {
    list = flow.get(flowVariable)
} else { 
    flow.set(flowVariable, list)
}


// reset flowVariable and list
if (msg.hasOwnProperty('reset')) {
    flow.set(flowVariable, [])
    msg.payload = []
    return msg
}

// restore - means restore from flow variable
if (msg.hasOwnProperty('restore')) {
    msg.payload = flow.get(flowVariable)
    return msg
}

// check incoming data!
if (!msg.hasOwnProperty(info1)) {
    node.error(`${info1} is missing`, msg)
    return null
}
if (typeof msg[info1] !== 'string' || msg[info1].length === 0) {
        node.error(`${info1}  must be of type string / not empty`, msg)
        return null
}
if (!msg.hasOwnProperty(info2)) {
    node.error(`${info2} is missing`, msg)
    return null
}
if (typeof msg[info2] !== 'string' || msg[info2].length === 0) {
        node.error(`${info2}  must be of type string / not empty`, msg)
        return null
}

// add to list
list.push({
    "info1": msg[info1],
    "info2": msg[info2],
    "ts": new Date().toISOString().substr(5,11)
})    
if (list.length > listMaximum) {
    list.pop()
}

// update flow variable
flow.set(flowVariable, list)
msg.payload = list
return msg
} // dont copy this line to nodeRed