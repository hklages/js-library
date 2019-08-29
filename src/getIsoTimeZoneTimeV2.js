function getIsoTimeZoneTimeV2(timeZone) {
  // PURPOSE Provides current date/time for a specific time zone in ISO format
  // VERSION 2019-07-09T1503 V2
  // RETURN current time in ISO format with timezone. example 2019-07-02T14:59:38+02:00
  // INPUT timeZone from list: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
  // CALL example: getIsoTimeZoneTime('Europe/Berlin')
  // HINT NO milliseconds, string format, DST conform

  // Get timezone short name
  let now = new Date();
  let tz = now.toLocaleDateString('en-US', { timeZone: timeZone, timeZoneName: 'short' });
  let index = tz.indexOf('GMT');
  tz = tz.substr(index + 3); // extract short timezone name eg GMT+2
  let nowTZ;
  if (tz.length === 0) {
    // no offset GMT time
    nowTZ = now.toISOString();
    nowTZ = nowTZ.substr(0, nowTZ.length - 5) + 'Z';
  } else {
    // convert timezone from GMT+x to +0x:00 format and offset in hours
    var offsetMsec = 0; // offset in milliseconds
    // get + or -
    var offsetText = tz.substr(0, 1); // offset as text
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
