function nodered (msg, flow) { // dont copy this line to nodeRED and also the line after return
  /**  Adds previous days min/max and removes oldest entry.
  * INPUT non
  * OUTPUT modifies petrolHistory
  * USES flow petrolMinMax, petrolHistory
  * VERSION: 2019-12-23T1041
  * PORTS: 1
  */
  const history = flow.get('petrolHistory');
  const minMax = flow.get('petrolMinMax');
  history[0].data[0].shift();
  history[0].data[0].push({ x: minMax.date, y: minMax.min });
  history[0].data[1].shift();
  history[0].data[1].push({ x: minMax.date, y: minMax.max });
return msg;
} // dont copy this line to nodeRed
