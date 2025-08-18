document.addEventListener('DOMContentLoaded', () => {
    const meditationGrid = document.querySelector('.meditation-grid');
    
    meditationGrid.addEventListener('click', (e) => {
        const button = e.target.closest('.start-meditation-btn');
        if (button) {
            const meditationCard = button.closest('.meditation-card');
            const meditationId = meditationCard.dataset.meditationId;
            const meditationTitle = meditationCard.querySelector('h2').textContent;
            
            window.showNotification(`Starting: ${meditationTitle}`);
            
            console.log(`Starting meditation with ID: ${meditationId}`);
        }
    });

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const confirmed = confirm("Are you sure you want to log out?");
            if (confirmed) {
                localStorage.removeItem('userName');
                localStorage.removeItem('theme');
                localStorage.removeItem('registeredUsers'); 
                window.location.href = 'login.html'; 
            }
        });
    }
});