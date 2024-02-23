const calendarBody = document.getElementById("tbody");
const monthYear = document.getElementById("monthYear");

const today = new Date();
let month = today.getMonth();
let year = today.getFullYear();

const previous = () => {
  month = month === 0 ? 11 : month - 1;
  year = month === 11 ? year - 1 : year;
  renderCalendar();
};

const next = () => {
  month = month === 11 ? 0 : month + 1;
  year = month === 0 ? year + 1 : year;
  renderCalendar();
};

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const renderCalendar = () => {
  const numDaysInMonth = new Date(year, month + 1, 0).getDate();
  let firstDay = new Date(year, month).getDay() - 1;

  if (firstDay === -1) {
    firstDay = 6;
  }

  const days = [];
  let day = 1;

  for (let week = 0; week <= Math.ceil(numDaysInMonth / 7); week++) {
    const cells = [];
    for (let j = 0; j < 7; j++) {
      if (week === 0 && j < firstDay) {
        cells.push("<td />");
      } else if (day <= numDaysInMonth) {
        const currentDate = new Date(year, month, day);
        const isToday = currentDate.toDateString() === today.toDateString();
        const formattedDate = currentDate.toLocaleDateString("ua", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        cells.push(
          `<td class="${
            isToday ? "today" : ""
          }" title="${formattedDate}">${day}</td>`
        );
        day++;
      }
    }

    days.push(cells);
  }

  monthYear.innerText = `${months[month]} ${year}`;

  calendarBody.innerHTML = `${days
    .map((row) => `<tr>${row.join("")}</tr>`)
    .join("")}`;
};

window.onload = renderCalendar();
