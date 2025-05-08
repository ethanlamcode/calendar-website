const calendarBody = document.getElementById("calendar-body");
const monthYear = document.getElementById("month-year");
const prevMonthBtn = document.getElementById("prev-month");
const nextMonthBtn = document.getElementById("next-month");
const eventModal = document.getElementById("event-modal");
const modalDate = document.getElementById("modal-date");
const eventText = document.getElementById("event-text");
const saveEventBtn = document.getElementById("save-event");
const closeModal = document.getElementById("close-modal");
const deleteEventBtn = document.getElementById("delete-event"); // Select Delete Button
const backHomeBtn = document.getElementById("back-home");


let currentDate = new Date();

function loadEvents() {
  return JSON.parse(localStorage.getItem("events") || "{}");
}

let events = loadEvents();

function renderCalendar(date) {
  events = loadEvents(); // Refresh from localStorage every time

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
    const fullDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    cell.textContent = day;

    if (events[fullDate]) {
      cell.style.backgroundColor = "#d1f7d6";
      const eventPreview = document.createElement("div");
      eventPreview.textContent = events[fullDate].title || "(No title)";
      eventPreview.style.fontSize = "0.7rem";
      eventPreview.style.marginTop = "5px";
      eventPreview.style.color = "#333";
      cell.appendChild(eventPreview);
    }

    cell.addEventListener("click", () => {
      const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      openModal(formattedDate); // Open modal for event editing
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
  
    if (events[dateStr]) {
      eventText.value = events[dateStr].title || ""; // Assuming you're saving title
    } else {
      eventText.value = ""; // If no event exists, clear the text area
    }
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

// Save event button handler
saveEventBtn.addEventListener("click", () => {
  const dateStr = modalDate.textContent;
  const value = eventText.value.trim();

  if (value) {
    events[dateStr] = { title: value }; // Save event with a title
  } else {
    delete events[dateStr]; // Delete event if no title
  }

  localStorage.setItem("events", JSON.stringify(events));
  closeModalWindow();
  renderCalendar(currentDate);
});

// Delete event button handler
deleteEventBtn.addEventListener("click", () => {
  const dateStr = modalDate.textContent;
  delete events[dateStr]; // Remove event from object
  localStorage.setItem("events", JSON.stringify(events)); // Update local storage
  closeModalWindow(); // Close the modal
  renderCalendar(currentDate); // Re-render the calendar
});

backHomeBtn.addEventListener("click", () => {
  window.location.href = "index.html"; // Change this if your homepage URL is different
});

closeModal.addEventListener("click", closeModalWindow);
window.addEventListener("click", (e) => {
  if (e.target === eventModal) closeModalWindow();
});

renderCalendar(currentDate);
