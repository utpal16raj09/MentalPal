document.addEventListener('DOMContentLoaded', () => {
    // Notification
    function showNotification(msg) {
        alert(msg);
    }
    window.showNotification = showNotification;

    // Meditation buttons
    const meditationGrid = document.querySelector('.meditation-grid');
    meditationGrid.addEventListener('click', (e) => {
        const button = e.target.closest('.start-meditation-btn');
        if (button) {
            const meditationCard = button.closest('.meditation-card');
            const meditationId = meditationCard.dataset.meditationId;
            const meditationTitle = meditationCard.querySelector('h2').textContent;
            showNotification(`Starting: ${meditationTitle}`);
            console.log(`Starting meditation with ID: ${meditationId}`);
        }
    });

    // Initialize logout modal function
    function initLogoutModal() {
        const logoutBtns = document.querySelectorAll('.logout-btn');
        const logoutModal = document.getElementById('logoutConfirmModal');
        if (!logoutModal) return;

        const closeBtn = logoutModal.querySelector('.close-btn');
        const cancelBtn = document.getElementById('cancelLogout');
        const confirmBtn = document.getElementById('confirmLogout');

        logoutBtns.forEach(btn => btn.addEventListener('click', e => {
            e.preventDefault();
            logoutModal.style.display = 'flex';
        }));

        closeBtn.addEventListener('click', () => logoutModal.style.display = 'none');
        cancelBtn.addEventListener('click', () => logoutModal.style.display = 'none');
        window.addEventListener('click', e => { if (e.target === logoutModal) logoutModal.style.display = 'none'; });
        confirmBtn.addEventListener('click', () => {
            localStorage.clear();
            window.location.href = 'login.html';
        });
    }

    // Shared HTML container
    fetch('../const/shared.html')
      .then(res => res.text())
      .then(html => {
        document.getElementById('shared-container').innerHTML = html;
        initLogoutModal(); // Initialize logout modal AFTER it's added to DOM
      })
      .catch(err => console.error(err));
});
