/**
 * Provides current time for a specific timezone in ISO format 2019-07-02T14:59:38+02:00
 *  Maybe obsolete as there is node-red-contrib-sun-position to provide in exactly that format.
 *
 * @since      2019-07-09T1503 V2
 * @param {string}   timezone timezone identifier, see  https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
 *
 * @return {string} Return the time in ISO format for that timezone
 *
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
