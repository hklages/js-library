function nodered (msg, flow, node) { // dont copy this line to nodeRED and also the line after return
  /**  Calculates minimum/maximum and stores in petrolMinMax.
  * INPUT msg.payload holds the new price
  * OUTPUT changes petrolMinMax
  * USES flow petrolMinMax
  * VERSION: 2019-12-26T1232
  * PORTS: 1
  */
  const minMax = flow.get('petrolMinMax');
  const currentDate = global.get('basics_CurrentDate');
  if (msg.payload > minMax.max) {
    minMax.max = msg.payload;
    minMax.date = currentDate;
  }
  if (msg.payload < minMax.min) {
    minMax.min = msg.payload;
    minMax.date = currentDate;
  }
  return [{ payload: minMax.min }, { payload: minMax.max }];
} // dont copy this line to nodeRed
