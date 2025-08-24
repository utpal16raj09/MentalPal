document.addEventListener('DOMContentLoaded', () => {
    const journalForm = document.getElementById('journalForm');
    const entriesList = document.getElementById('entriesList');

    // --- Simple notification function ---
    function showNotification(msg) {
        alert(msg); // or replace with fancier UI later
    }

    // --- Load existing entries from local storage on page load ---
    function loadEntries() {
        const savedEntries = JSON.parse(localStorage.getItem('journalEntries')) || [];
        if (savedEntries.length > 0) {
            entriesList.innerHTML = '';
            savedEntries.forEach(entry => displayEntry(entry));
        } else {
            entriesList.innerHTML = '<p class="no-entries-message">No journal entries yet. Add your first one!</p>';
        }
    }

    // --- Function to display a single journal entry ---
    function displayEntry(entry) {
        const entryElement = document.createElement('div');
        entryElement.className = 'entry';
        
        const date = new Date(entry.timestamp).toLocaleString();
        entryElement.innerHTML = `
            <h3>${entry.title} - ${date}</h3>
            <p>${entry.content}</p>
        `;
        entriesList.prepend(entryElement);
    }

    // --- Handle new journal entry form submission ---
    journalForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;

        if (title.trim() === '' || content.trim() === '') {
            showNotification('Title and content cannot be empty.');
            return;
        }

        const newEntry = {
            title: title,
            content: content,
            timestamp: new Date()
        };

        // Save the new entry to local storage
        const savedEntries = JSON.parse(localStorage.getItem('journalEntries')) || [];
        savedEntries.push(newEntry);
        localStorage.setItem('journalEntries', JSON.stringify(savedEntries));

        // Display the new entry and clear the form
        if (document.querySelector('.no-entries-message')) {
            entriesList.innerHTML = '';
        }
        displayEntry(newEntry);
        journalForm.reset();

        showNotification('Journal entry saved!');
    });

    // Initial load of all entries
    loadEntries();
});
