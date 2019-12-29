function nodered (msg, node, flow) { // dont copy this line to nodeRED and also the line after return
  /**  Extract data for JET/SHELL and outputs prices.
  * INPUT msg.payload.stations holds the data for all stations
  * OUTPUT payload: jet/shell price - both with topic and label
  * USES global basics_CurrentDate
  * VERSION: 2019-12-24T1400
  * PORTS: 1
  */
  const nameJet = 'JET FELDKIRCHEN MUENCHNER STR. 23';
  const nameShell = 'FELDKIRCHEN, MUENCHNER STR.';
  const label = 'Tagesverlauf ' + global.get('basics_CurrentDate');
  var stations = [];
  stations = msg.payload.stations;
  for (let index = 0; index < stations.length; ++index) {
    if (stations[index].name === nameJet) {
      if (stations[index].isOpen === true) {
        msg = { payload: stations[index].price, topic: 'Jet', label: label };
        node.send(msg);
      } else {
        // closed
      }
    }

    if (stations[index].name === nameShell) {
      if (stations[index].isOpen === true) {
        msg = { payload: stations[index].price, topic: 'Shell', label: label };
        node.send(msg);
      } else {
        // closed
      }
    }
  }
  return null;
} // dont copy to nodeRED
