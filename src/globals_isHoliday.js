function nodered (msg, flow) { // dont copy this line to nodeRED and also the line after return
/**  Checks whether provided date is a holiday.
* INPUT msg.payload must be current date in ISO format yyyy-mm-dd
* OUTPUT msg.payload  true/false
* USES basics_fixedholidays and from general_helper.js: isHoliday, easterSunday, addDaysToDate
* VERSION: 2019-12-24T1429
* PORTS: 1
*/

  var fixedHolidays = global.get('basics_FixedHolidays');
  msg.payload = isHoliday(msg.payload, fixedHolidays);
  return msg;
} // dont copy this line to nodeRED
