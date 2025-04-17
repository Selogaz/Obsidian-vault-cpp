function mdCalendar(year, month, mondayFirst) {
  if (mondayFirst === undefined) mondayFirst = false;
  //Step 1: build an array of the abbreviated weekday names
  let dd = new Date(2022, 1, 27); //a Sunday
  let wnames = [];
  for (let i = 0; i < 8; i++) {
    wnames.push(dd.toLocaleString("default", { weekday: "short" }));
    dd.setDate(dd.getDate() + 1);
  }

  if (mondayFirst) {
    wnames = wnames.slice(1, 8); //gives [Mon,Tue,Wed,Thu,Fri,Sat,Sun]
  } else {
    wnames = wnames.slice(0, 7); //gives [Sun,Mon,Tue,Wed,Thu,Fri,Sat]
  }

  //Step 2: Get first day of the month
  // (Note: in the javascript Date object, the month has values from 0[Jan] to 11[Dec].)
  let day = new Date(year, month - 1, 1);

  //Step 3: Establish the calendar header which includes the month, year, and abbreviated weekday names
  let cal =
    `${day.toLocaleString("default", { month: "long" })} ${year}\n\n` +
    `| Week | ${wnames.join(" | ")} |\n` +
    "|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|\n";

  //Step 4: Populate the calendar with the days of the month
  let week = [
    "  .. ",
    "  .. ",
    "  .. ",
    "  .. ",
    "  .. ",
    "  .. ",
    "  .. ",

  ];
  while (day.getMonth() == month - 1) {
    let wday = day.getDay(); //day of the week (0[Sun] - 6[Sat])
    momentDay = moment(day);
    if (mondayFirst) wday = wday - 1 < 0 ? 6 : wday - 1;
    if (day.getDate() === 1 || wday === 0) {
      cal +=
        "|" +
        `[[periodic/weekly/${momentDay.format("gggg-[W]WW")}\\|${momentDay.format("WW")}]]`;
    }
    let d = `${day.getDate()}`;
    //week[wday] = '  ' + d.padStart(2,'0') + ' ';
    //week[wday] = '  [[' + day.toISOString().slice(0,10) + '\\|' + d.padStart(2,'0') + ']] ';

    week[wday] = `[[periodic/daily/${momentDay.format("YYYY-MM-DD")}\\|${momentDay.format(
      "DD",
    )}]]`;

    if (wday == 6) {
      cal += "|" + week.join("|") + "|\n";
      week = [
        "  .. ",
        "  .. ",
        "  .. ",
        "  .. ",
        "  .. ",
        "  .. ",
        "  .. ",

      ];
    }
    day = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1);
  }
  if (week[0] != "  .. ") cal += "|" + week.join("|") + "|\n";

  return cal;
}

module.exports = mdCalendar;
