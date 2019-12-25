function nodered (msg, flow) { // dont copy this line to nodeRED and also the line after return
  /**  Calculates minimum/maximum and stores in petrolMinMax.
  * INPUT msg.payload holds the new price
  * OUTPUT changes petrolMinMax
  * USES flow petrolMinMax
  * VERSION: 2019-12-23T0853
  * PORTS: 1
  */
  const minMax = flow.get('petrolMinMax');
  if (msg.payload > minMax.max) {
    minMax.max = msg.payload;
  }
  if (msg.payload < minMax.min) {
    minMax.min = msg.payload;
  }
  return [{ payload: minMax.min }, { payload: minMax.max }];
} // dont copy this line to nodeRed
