function convertDecimalToMinutes (time) {
  // PURPOSE Converts hours/min in decimal to hours with hours:minutes, example 3.5 to 03:30  or 3 to 03:00
  // PREREQ: decimal sign is . (may be omitted if integer)
  const hrs = parseInt(Number(time));
  const min = Math.round((Number(time) - hrs) * 60);
  return pad2digits(hrs) + ':' + pad2digits(min);
}
