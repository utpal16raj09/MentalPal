// --- File: ../resource/js/dashboard.js ---

document.addEventListener('DOMContentLoaded', () => {

    // -------- Mood Tracker Functionality --------
    const moodOptions = document.querySelectorAll('.mood-option');
    moodOptions.forEach(option => {
        option.addEventListener('click', () => {
            moodOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            const selectedMood = option.getAttribute('data-mood');
            console.log(`User selected mood: ${selectedMood}`);
            showNotification(`Mood logged: ${selectedMood.charAt(0).toUpperCase() + selectedMood.slice(1)}!`);
        });
    });

    // -------- Daily Check-in Form Submission --------
    const dailyCheckinForm = document.getElementById('dailyCheckinForm');
    if (dailyCheckinForm) {
        dailyCheckinForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const sleepHours = dailyCheckinForm.querySelector('input[type="number"]').value;
            const stressLevel = dailyCheckinForm.querySelector('input[type="range"]').value;
            console.log(`Daily check-in submitted: Sleep=${sleepHours}, Stress=${stressLevel}`);
            showNotification('Daily check-in submitted successfully!');
        });
    }

    // -------- Dynamic User Name --------
    const userNameSpan = document.getElementById('userName');
    const storedUserName = localStorage.getItem('userName') || 'User';
    userNameSpan.textContent = storedUserName;

    // -------- Mood History Chart --------
    const moodChartCanvas = document.getElementById('moodChart');
    if (moodChartCanvas) {
        const moodData = {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Mood Rating',
                data: [4, 5, 3, 5, 4, 5, 5],
                backgroundColor: 'rgba(216, 191, 216, 0.6)',
                borderColor: '#d8bfd8',
                borderWidth: 2,
                tension: 0.4,
                fill: true,
            }]
        };

        const moodChartConfig = {
            type: 'line',
            data: moodData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 5,
                        grid: { color: 'rgba(234, 234, 234, 0.5)' },
                        ticks: {
                            callback: function(value) {
                                switch(value) {
                                    case 1: return 'Terrible';
                                    case 2: return 'Bad';
                                    case 3: return 'Neutral';
                                    case 4: return 'Good';
                                    case 5: return 'Great!';
                                }
                                return '';
                            },
                            color: getComputedStyle(document.body).getPropertyValue('--text-color-light')
                        }
                    },
                    x: {
                        grid: { color: 'rgba(234, 234, 234, 0.5)' },
                        ticks: {
                            color: getComputedStyle(document.body).getPropertyValue('--text-color-light')
                        }
                    }
                },
                plugins: { legend: { display: false } }
            }
        };

        const moodChart = new Chart(moodChartCanvas, moodChartConfig);

        // Update chart colors on theme change
        const observer = new MutationObserver(() => {
            const newTextColor = getComputedStyle(document.body).getPropertyValue('--text-color-light');
            const newGridColor = getComputedStyle(document.body).getPropertyValue('--border-color-light');
            moodChart.options.scales.y.ticks.color = newTextColor;
            moodChart.options.scales.x.ticks.color = newTextColor;
            moodChart.options.scales.y.grid.color = newGridColor;
            moodChart.options.scales.x.grid.color = newGridColor;
            moodChart.update();
        });
        observer.observe(document.body, { attributes: true, attributeFilter: ['data-theme'] });
    }

    // -------- Quick Actions Redirects --------
    const journalBtn = document.querySelector('.quick-actions .btn-block:nth-child(1)');
    const meditationBtn = document.querySelector('.quick-actions .btn-block:nth-child(2)');
    const challengesBtn = document.querySelector('.quick-actions .btn-block:nth-child(3)');

    if (journalBtn) journalBtn.addEventListener('click', () => window.location.href = 'journal.html');
    if (meditationBtn) meditationBtn.addEventListener('click', () => window.location.href = 'meditation.html');
    if (challengesBtn) challengesBtn.addEventListener('click', () => window.location.href = 'challenges.html');

});

// -------- Logout Modal Function --------
function initLogout() {
    const logoutBtns = document.querySelectorAll('.logout-btn');
    const logoutModal = document.getElementById('logoutConfirmModal'); // match ID with HTML
    if (!logoutModal) return;

    const closeBtn = logoutModal.querySelector('.close-btn');
    const cancelBtn = document.getElementById('cancelLogout');
    const confirmBtn = document.getElementById('confirmLogout');

    logoutBtns.forEach(btn => btn.addEventListener('click', e => {
        e.preventDefault();
        logoutModal.style.display = 'flex';
    }));

    closeBtn?.addEventListener('click', () => logoutModal.style.display = 'none');
    cancelBtn?.addEventListener('click', () => logoutModal.style.display = 'none');
    window.addEventListener('click', e => { if (e.target === logoutModal) logoutModal.style.display = 'none'; });

    confirmBtn?.addEventListener('click', () => {
        localStorage.clear();
        window.location.href = 'login.html';
    });
}
// -------- Theme Toggle --------
const themeToggleBtn = document.querySelector('.theme-toggle');
if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.body.setAttribute('data-theme', newTheme);

    // optional: save preference
    localStorage.setItem('theme', newTheme);
  });
}

// -------- Apply saved theme on load --------
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.body.setAttribute('data-theme', savedTheme);
});

