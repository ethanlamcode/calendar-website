const calendarBody = document.getElementById("calendar-body");
const monthYear = document.getElementById("month-year");
const prevMonthBtn = document.getElementById("prev-month");
const nextMonthBtn = document.getElementById("next-month");
const eventModal = document.getElementById("event-modal");
const modalDate = document.getElementById("modal-date");
const eventText = document.getElementById("event-text");
const saveEventBtn = document.getElementById("save-event");
const closeModal = document.getElementById("close-modal");

let currentDate = new Date();
let events = JSON.parse(localStorage.getItem("events") || "{}");

function renderCalendar(date) {
  const year = date.getFullYear();
  const month = date.getMonth();

  monthYear.textContent = `Month: ${month + 1}, Year: ${year}`;
  calendarBody.innerHTML = "";

  const firstDay = new Date(year, month, 1).getDay();
  const numDays = new Date(year, month + 1, 0).getDate();

  let row = document.createElement("tr");
  for (let i = 0; i < firstDay; i++) {
    row.appendChild(document.createElement("td"));
  }

  for (let day = 1; day <= numDays; day++) {
    const cell = document.createElement("td");
    const fullDate = `${year}-${month + 1}-${day}`;
    cell.textContent = day;

    if (events[fullDate]) {
      cell.style.backgroundColor = "#d1f7d6"; // mark with event
    }

    cell.addEventListener("click", () => {
        const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        window.location.href = `create-event.html?date=${formattedDate}`;
      });
      
    row.appendChild(cell);

    if ((firstDay + day) % 7 === 0 || day === numDays) {
      calendarBody.appendChild(row);
      row = document.createElement("tr");
    }
  }
}

function openModal(dateStr) {
  eventModal.classList.remove("hidden");
  modalDate.textContent = dateStr;
  eventText.value = events[dateStr] || "";
}

function closeModalWindow() {
  eventModal.classList.add("hidden");
}

prevMonthBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar(currentDate);
});

nextMonthBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar(currentDate);
});

saveEventBtn.addEventListener("click", () => {
  const dateStr = modalDate.textContent;
  const value = eventText.value.trim();
  if (value) {
    events[dateStr] = value;
  } else {
    delete events[dateStr];
  }
  closeModalWindow();
  renderCalendar(currentDate);
});

closeModal.addEventListener("click", closeModalWindow);
window.addEventListener("click", (e) => {
  if (e.target === eventModal) closeModalWindow();
});

renderCalendar(currentDate);
