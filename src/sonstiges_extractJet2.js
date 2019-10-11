//  PURPOSE extract data for 2 stations and get price
//  PREREQ api has to be build to get data for those stations, name must be unique
//  OUTPUT msg provides prices for two stations, ordered by lowest price
//  VERSION 2019-07-13T1242

const nameJet = "JET FELDKIRCHEN MUENCHNER STR. 23";
const nameShell = "FELDKIRCHEN, MUENCHNER STR."
const closed = "zu";
const prefix = "Um ";
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
var d = new Date();
var time = ("0"+ d.getHours()).substr(-2) + ":" + ("0" + d.getMinutes()).substr(-2);
if (priceJet <= priceShell) {
    msg.payload = prefix + time + "   Jet " + priceJet + "€/L" + " Shell " + priceShell + "€/L";
} else {
    msg.payload = prefix + time + "   Shell " + priceShell + "€/L" +"  Jet " + priceJet + "€/L";
}
return msg;
