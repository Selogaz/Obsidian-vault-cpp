<%*
let year = await tp.system.prompt("Year of Calendar", tp.date.now("YYYY"));
let firstd = await tp.system.suggester(
  ["Sunday", "Monday"],
  ["Sunday", "Monday"],
  false,
  "First Day of the Week",
);

let monFirst = false;
if (firstd == "Monday") {
  monFirst = true;
}

if (tp.file.title.startsWith("Untitled")) {
  await tp.file.rename(`${year}.calendar`);
}

tR += `# ${year} Calendar\n\n`;
for (let i = 1; i <= 12; i++) {
  tR += `## ${tp.user.mdCalendar(year, i, monFirst)}\n`;
}
%>
