document.addEventListener('DOMContentLoaded', () => {
    const calendarGrid = document.getElementById('calendarGrid');
    const currentMonthYearHeader = document.getElementById('currentMonthYear');
    const prevMonthBtn = document.getElementById('prevMonthBtn');
    const nextMonthBtn = document.getElementById('nextMonthBtn');
    const eventsList = document.getElementById('eventsList');
    const eventsListHeader = document.getElementById('eventsListHeader');

    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();

    // Mock event data
    const mockEvents = {
        '2025-7-10': [{ title: 'Therapy Session', time: '10:00 AM' }],
        '2025-7-15': [{ title: 'Yoga Class', time: '7:00 PM' }],
        '2025-8-1': [{ title: 'Mindfulness Workshop', time: '2:00 PM' }],
        '2025-8-17': [{ title: 'Team Meeting', time: '9:00 AM' }],
    };

    function renderCalendar(month, year) {
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        currentMonthYearHeader.textContent = new Date(year, month).toLocaleString('default', { month: 'long', year: 'numeric' });
        calendarGrid.innerHTML = '';
        
        // Render empty days from previous month
        for (let i = 0; i < firstDayOfMonth; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day other-month';
            calendarGrid.appendChild(emptyDay);
        }

        // Render current month days
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = day;
            dayElement.dataset.date = `${year}-${month}-${day}`;

            const dateKey = `${year}-${month}-${day}`;
            if (mockEvents[dateKey]) {
                dayElement.classList.add('has-events');
            }
            
            calendarGrid.appendChild(dayElement);
        }

        // Add a click listener to the entire grid
        calendarGrid.addEventListener('click', (e) => {
            const clickedDay = e.target.closest('.calendar-day');
            if (clickedDay && !clickedDay.classList.contains('other-month')) {
                const dateKey = clickedDay.dataset.date;
                displayEvents(dateKey);
            }
        });
    }

    function displayEvents(dateKey) {
        eventsList.innerHTML = '';
        eventsListHeader.textContent = `Events for ${new Date(dateKey).toLocaleDateString()}`;
        
        const events = mockEvents[dateKey];
        if (events && events.length > 0) {
            events.forEach(event => {
                const eventElement = document.createElement('div');
                eventElement.className = 'event-item';
                eventElement.innerHTML = `<div class="event-title">${event.title}</div><div class="event-time">${event.time}</div>`;
                eventsList.appendChild(eventElement);
            });
        } else {
            eventsList.innerHTML = '<p class="no-events-message">No events on this day.</p>';
        }
    }

    prevMonthBtn.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar(currentMonth, currentYear);
        displayEvents(null);
    });

    nextMonthBtn.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar(currentMonth, currentYear);
        displayEvents(null);
    });

    renderCalendar(currentMonth, currentYear);
});