function nodered(msg, env, node, flow) { // dont copy this line to nodeRED and also the line after return
/**   Maintain a list of items - add and remove!
* 
* @version 2020-08-11
* @param {boolean} msg.reset exists: resets the list to []
* @param {boolean} msg.restore exists: restores list from flow variable 
*
* @param {string}  msg[uniqueIdentifier]: holds the unique identifier (key)
* @param {boolean} msg[state]: holds the state
* @param {string}  msg[info1]: holds additional data
* @param {string}  msg[info2]: holds additional data
*
* @output {object} msg.payload = {}
*
* @throws: in case of missing/wrong type data 
* 
* METHOD
* add item: first item received state must be true 
* remove item: second item received state must be false 
*
*/

// customization start
const flowVariable = 'listUnreach'
const uniqueIdentifier = 'datapointName'    
const currentState = 'payload'
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

// restore - means restore from flow variable but does not process any other data
if (msg.hasOwnProperty('restore')) {
    msg.payload = flow.get(flowVariable)
    return msg
}

// check incoming data!
if (!msg.hasOwnProperty(uniqueIdentifier)) {
    node.error('uniqueIdentifier is missing', msg)
    return null
}
if (typeof msg[uniqueIdentifier] !== 'string' || msg[uniqueIdentifier].length === 0) {
        node.error('uniequeIdentifier must be of type string / not empty', msg)
        return null
}
if (!msg.hasOwnProperty(currentState)) {
    node.error('currentState is missing', msg)
    return null
}
if (typeof msg[currentState] !== 'boolean') {
        node.error('currentState must be of type boolean', msg)
        return null
}
if (!msg.hasOwnProperty(info1)) {
    node.error(`${info1} is missing`, msg)
    return null
}
if (typeof msg[info1] !== 'string' || msg[info1].length === 0) {
        node.error(`${info1} must be of type string / not empty`, msg)
        return null
}
if (!msg.hasOwnProperty(info2)) {
    node.error(`${info2} is missing`, msg)
    return null
}
if (typeof msg[info2] !== 'string' || msg[info2].length === 0) {
        node.error(`${info2} must be of type string / not empty`, msg)
        return null
}

// add to or remove from list
if (list.length === 0) {
    if (!msg[currentState]) {
        // ignore
        return null
    } else {
        list.push({
        "uniqueIdentifier": msg[uniqueIdentifier],
        "info1": msg[info1],
        "info2": msg[info2],
        "currentState": msg[currentState]
        })    
    }
    
} else {
    let index = -1 // not found
    index = list.findIndex(item => item.uniqueIdentifier === msg[uniqueIdentifier])
    if (index >= 0) {
        if (list[index].currentState && !msg[currentState]) {
            list.splice(index, 1);
        } else {
            node.error('First value not true or second not false!', msg)
            return null
        }
    } else {
        if (!msg[currentState]) {
            // ignore
            return null
        } else {
            list.push({
            "uniqueIdentifier": msg[uniqueIdentifier],
            "info1": msg[info1],
            "info2": msg[info2],
            "currentState": msg[currentState]
            })    
        }
    }
}

// update flow variable
flow.set(flowVariable, list)
msg.payload = list
return msg
} // dont copy this line to nodeRed