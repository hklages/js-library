function nodered (msg, flow) { // dont copy this line to nodeRED and also the line after return
  /**  Extract data for shell/jet station and output best current price.
  * INPUT msg.payload.stations holds the data for all stations
  * OUTPUT msg.payload with station and price
  * VERSION: 2019-12-23T1104
  * PORTS: 1
  */
  const nameJet = 'JET FELDKIRCHEN MUENCHNER STR. 23';
  const nameShell = 'FELDKIRCHEN, MUENCHNER STR.';
  var priceJet;
  var priceShell;
  var stations = [];
  stations = msg.payload.stations;
  for (let index = 0; index < stations.length; ++index) {
    if (stations[index].name === nameJet) {
      if (stations[index].isOpen === true) {
        priceJet = stations[index].price;
      } else {
        priceJet = null;
      }
    }
    if (stations[index].name === nameShell) {
      if (stations[index].isOpen === true) {
        priceShell = stations[index].price;
      } else {
        priceShell = null;
      }
    }
  }
  // get current time
  var d = new Date();
  var time = ('0' + d.getHours()).substr(-2) + ':' + ('0' + d.getMinutes()).substr(-2);
  let price = 0;
  let station = '';
  if (priceJet == null) {
    if (priceShell == null) {
      msg.payload = 'Jet und Shell sind geschlossen';
    } else {
      station = 'Shell';
      price = priceShell;
      msg.payload = `${price} €/L at station ${station} at ${time}`;
    }
  } else {
    if (priceShell == null) {
      station = 'Jet';
      price = priceJet;
    } else {
      if (priceJet <= priceShell) {
        station = 'Jet';
        price = priceJet;
      } else {
        station = 'Shell';
        price = priceShell;
      }
    }
    msg.payload = `${price} €/L at station ${station} at ${time}`;
  }
  return msg;
} // dont copy this line to nodeRed
