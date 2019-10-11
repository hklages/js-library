// PURPOSE creates an response array with values of requested global or flow variable
// OUTPUT array with name value

const CMD_GLOBAL_SV = "getSvGlobal"
const CMD_FLOW_SV = "getSvFlow"
const MSG_NOT_DEFINED = "Variable not defined";
const MSG_NOT_FOUND = "Function not found"
//
var resultArray = [];
//
var cmdArray = msg.payload.commands;
//
cmdArray.forEach(function process(element) {

    switch (element.function) {
        case CMD_GLOBAL_SV: value = global.get(element.name);
                break;
        case CMD_FLOW_SV: value = flow.get(element.name);
                break;
        default: value = MSG_NOT_FOUND;
    }
    if (value === undefined) {
        value = MSG_NOT_DEFINED;
    }
    resultArray.push({"name": element.name, "value" :value});
});
msg.payload = resultArray;
return msg;
