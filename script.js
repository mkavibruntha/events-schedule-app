const eventForm = document.getElementById('eventForm');
const eventList = document.getElementById('eventList');

let events = JSON.parse(localStorage.getItem('events')) || [];

function renderEvents() {
  eventList.innerHTML = '';

  if (events.length === 0) {
    eventList.innerHTML = '<li>No upcoming events</li>';
    return;
  }

  events.forEach((event, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div>
        <strong>${event.title}</strong><br>
        <small>${event.date} - ${event.time}</small>
      </div>
      <button class="delete-btn" onclick="deleteEvent(${index})">Delete</button>
    `;
    eventList.appendChild(li);
  });
}

function deleteEvent(index) {
  events.splice(index, 1);
  localStorage.setItem('events', JSON.stringify(events));
  renderEvents();
}

eventForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('eventTitle').value.trim();
  const date = document.getElementById('eventDate').value;
  const time = document.getElementById('eventTime').value;

  if (title && date && time) {
    events.push({ title, date, time });
    localStorage.setItem('events', JSON.stringify(events));
    renderEvents();
    eventForm.reset();
  }
});

renderEvents();
