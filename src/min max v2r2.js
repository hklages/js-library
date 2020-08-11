function nodered(msg, env, node, flow) { // dont copy this line to nodeRED and also the line after return
    /**  Calculate daily (local time) minimum and maximum of incoming messages
    * @version 2020-07-24
    * @param {float} msg.payload - should be in rage [MAXSTART, MINSTART]
    * @param {boolean} msg.reset - initiates a reset of minimum maximum if true
    * @param {boolean} msg.output - does not recalculate minimum, maximum, just outputs current values
    * @returns {object} msg.payload {"date": , "minimum": , "maximum": } 
    * @throws: parseFloat
    *
    * USES:  global variable for current data in ISO format e. g. 2020-02-22
    * 
    * PORTS: 1
    *
    */

    // customizing start
    const MINSTART = 100.0  // as start value
    const MAXSTART = 0.0    // as start value
    const GLOBAL_CURRENTDATE = 'basics_CurrentDate'  // must exist!
    // customizing end

    // validate context variables & initialize
    const currentDate = global.get(GLOBAL_CURRENTDATE)
    if (!context.get('date')) {
        context.set('date', currentDate)
    } else {
        if (context.get('date') !== currentDate) {
            // full reset
            context.set('date', currentDate)
            context.set('maximum', MAXSTART)
            context.set('minimum', MINSTART)
        }
    }
    if (!context.get('maximum')) {
        context.set('maximum', MAXSTART)
    }

    if (!context.get('minimum')) {
        context.set('minimum', MINSTART)
    }

    // mgs.reset is true: will reset data
    if (msg.hasOwnProperty('reset') && msg.reset === true) {
        // full reset
        context.set('date', currentDate)
        context.set('maximum', MAXSTART)
        context.set('minimum', MINSTART)
        return null
    }

    // msg.output is true: will output current data
    if (msg.hasOwnProperty('outputOnly') && msg.outputOnly === true) {
        msg.payload = {
            "date": context.get('date'),
            "maximum": context.get('maximum'),
            "minimum": context.get('minimum')
        }
        return msg
    }

    // process msg.payload and update maximum, minimum
    let newValue
    try {
        newValue = parseFloat(msg.payload)
    } catch (error) {
        node.error(error, msg);
    }
    if (newValue > context.get('maximum')) {
        context.set('maximum', newValue)
    }
    if (newValue < context.get('minimum')) {
        context.set('minimum', newValue)
    }
    context.set('date', currentDate)

    msg.payload = {
        "date": context.get('date'),
        "maximum": context.get('maximum'),
        "minimum": context.get('minimum')
    }
    return msg;
} // dont copy this line to nodeRed