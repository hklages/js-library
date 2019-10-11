module.exports = class SonosHelper {

  /** Returns true if day is a bank holiday
  *  @params {string} day: day to be checked; in ISO format YYYY-MM-DD ... at TimeZone!
  *  @params {array}  fixedHolidays: fixed holidays in format MM-DD
  */

  function isHoliday(day, fixedHolidays) {
    // list of difference in days to easter sunday
    const VARIABLE_HOLIDAYS = [-2, 0, 1, 39, 49, 50, 60];

    // start with fixed holidays and add variable
    let holidays = fixedHolidays.slice();// important to create copy!
    let easterSun = easterSunday(day.substring(0, 4)); // get year
    VARIABLE_HOLIDAYS.forEach(function (item) {
      holidays.push(addDaysToDate(easterSun, item));
    });

    // Check if in list
    return holidays.includes(day.substring(5, 10));
  }

  /** Returns easter sunday date for a given year in iso format
  *  @params {string} y: year in YYYY
  * Method: MEES algorithm
  */
  function easterSunday (y) {
    const SEP_ISO = '-';
    var a = y % 19;
    var b = Math.floor(y / 100);
    var c = y % 100;
    var d = Math.floor(b / 4);
    var e = b % 4;
    var f = Math.floor((b + 8) / 25);
    var g = Math.floor((b - f + 1) / 3);
    var h = (19 * a + b - d - g + 15) % 30;
    var i = Math.floor(c / 4);
    var k = c % 4;
    var l = (32 + 2 * e + 2 * i - h - k) % 7;
    var m = Math.floor((a + 11 * h + 22 * l) / 451);
    var n = Math.floor((h + l - 7 * m + 114) / 31);
    var p = (h + l - 7 * m + 114) % 31;
    p = Math.round(p + 1);
    n = (n < 10 ? '0' + n : n);
    p = (p < 10 ? '0' + p : p);
    return y + SEP_ISO + n + SEP_ISO + p;
  }

  function addDaysToDate (date, days) {
    // PURPOSE Returns resulting date (date + days) in in ISO format without year
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    result = result.toISOString();
    // YYYY-MM-DD: Select MM-DD
    result = result.substring(5, 10);
    return result;
  }

  /** Provides current time for a specific timezone in ISO format 2019-07-02T14:59:38+02:00
   * @param {string}   timezone timezone identifier, see  https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
   * @return {string} Return the time in ISO format for that timezone
   * @since      2019-07-09T1503 V2
   * Call example: getIsoTimeZoneTime('Europe/Berlin')
   * Hint: NO milliseconds, string format, takes in account DST (summer/winter time)
   */
  function getIsoTimeZoneTimeV2(timeZone) {
    // Get timezone short name
    const now = new Date();
    let tz = now.toLocaleDateString('en-US', { timeZone: timeZone, timeZoneName: 'short' });
    const index = tz.indexOf('GMT');
    tz = tz.substr(index + 3); // extract short timezone name eg GMT+2
    let nowTZ;
    if (tz.length === 0) {
      // no offset GMT time
      nowTZ = now.toISOString();
      nowTZ = nowTZ.substr(0, nowTZ.length - 5) + 'Z';
    } else {
      // convert timezone from GMT+x to +0x:00 format and offset in hours
      let offsetMsec = 0; // offset in milliseconds
      // get + or -
      let offsetText = tz.substr(0, 1); // offset as text
      tz = tz.substr(1);
      offsetMsec = parseFloat(tz) * 3600000;
      if (offsetText === '-') offsetMsec = (-1) * offsetMsec;

      if (offsetMsec === 0) {
        offsetText = 'Z';
      } else {
        offsetText = offsetText + convertDecimalToMinutes(tz);
      }
      // ajust time, convert to ISO and add timezone
      nowTZ = new Date(now.getTime() + offsetMsec);
      nowTZ = nowTZ.toISOString();
      nowTZ = nowTZ.substr(0, nowTZ.length - 5) + offsetText;
    }
    return nowTZ;
  }

  /** Converts hours/min (3.5 decimal) into hours/min (03:30).
  * @param {string} time time hours/min in decimal format
  * @return {string} hours/min in hh:mm format
  * @since  2019-09-30T0820
  * CAUTION: decimal sign is .
  * uses pad2digits
  */
  function convertDecimalToMinutes(time) {
    const hrs = parseInt(Number(time));
    const min = Math.round((Number(time) - hrs) * 60);
    return pad2digits(hrs) + ':' + pad2digits(min);
  }

  /** Adds a leading 0 in case of 1 digit.
  * @param {string} number any 1 or 2 digit number
  * @return {string} adds leading 0 if necessary and cuts to last 2 digits
  * @since  2019-09-30T0820
  */
  function pad2digits(number) {
    return ('0' + number).substr(-2);
  }

}
