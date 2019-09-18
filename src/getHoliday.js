function isHoliday(day, fixedHolidays) {
//   PURPOSE check whether day is a holiday
//   PARAMS
//      day: day to be checked; in ISO format YYYY-MM-DD ... at TimeZone!
//      fixedHolidays: array of fixed holidays in format MM-DD
//   RESULT: true or false

  // list of difference in days to easter sunday
  const VARIABLE_HOLIDAYS = [-2, 0, 1, 39, 49, 50, 60];

  // start with fixed holidays and add variable
  var holidays = fixedHolidays.slice();// important to create copy!
  var easterSun = easterSunday(day.substring(0, 4)); // get year
  VARIABLE_HOLIDAYS.forEach(function (item) {
    holidays.push(addDaysToDate(easterSun, item));
  });

  // Check if in list
  return holidays.includes(day.substring(5, 10));
}

function easterSunday (y) {
  // PURPOSE Returns easter sunday date in iso format
  // INPUT: Year
  // MEES algorithm
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
