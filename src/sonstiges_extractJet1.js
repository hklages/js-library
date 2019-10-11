//  PURPOSE extract data for 2 stations and get price
//  PREREQ api has to be build to get data for those stations, name must be unique
//  OUTPUT msg jet price, msg1 shell price
//  VERSION 2019-07-13T1242

const nameJet = "JET FELDKIRCHEN MUENCHNER STR. 23";
const nameShell = "FELDKIRCHEN, MUENCHNER STR."
const closed = "zu";
var priceJet;
var priceShell;
var stations = [];
stations = msg.payload.stations;
for (index = 0; index < stations.length; ++index) {
    if (stations[index].name == nameJet) {
        if(stations[index].isOpen == true) {
            priceJet = stations[index].price;
        } else {
            priceJet = closed;
        }
    }
    if (stations[index].name == nameShell) {
        if (stations[index].isOpen == true) {
            priceShell = stations[index].price;
        } else {
            priceShell = closed;
        }
    }
}

msg.payload = priceJet;
msg.topic = "Jet";
var msg1 = {"payload": priceShell, "topic":"Shell"};
return [msg, msg1];
