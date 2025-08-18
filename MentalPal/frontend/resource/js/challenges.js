document.addEventListener('DOMContentLoaded', () => {
    // This is where you would load challenge data from an API or local storage.
    // For this demonstration, we'll use a hard-coded array.
    const challenges = [
        {
            id: 1,
            title: "7-Day Gratitude Journal",
            description: "Write down three things you're grateful for every day to boost your positivity.",
            status: "Active",
            progress: 75
        },
        {
            id: 2,
            title: "Mindful Moments",
            description: "Take a moment each day to focus on your breathing and surroundings.",
            status: "New",
            progress: 0
        },
        {
            id: 3,
            title: "30-Day Sleep Improvement",
            description: "Follow a series of steps to improve your sleep hygiene and get better rest.",
            status: "Completed",
            progress: 100
        }
    ];

    const challengesGrid = document.querySelector('.challenges-grid');

    // Dynamically render the challenge cards on the page
    function renderChallenges() {
        if (!challengesGrid) return;
        challengesGrid.innerHTML = ''; // Clear existing cards

        challenges.forEach(challenge => {
            const card = document.createElement('section');
            card.className = 'dashboard-card challenge-card';
            
            const buttonText = (challenge.status === 'Active') ? 'Continue Challenge' :
                               (challenge.status === 'Completed') ? 'View Results' :
                               'Start Challenge';
            
            const buttonClass = (challenge.status === 'Active') ? 'btn-primary' : 'btn-secondary';

            card.innerHTML = `
                <div class="card-header">
                    <h2>${challenge.title}</h2>
                    <span class="challenge-status ${challenge.status}">${challenge.status}</span>
                </div>
                <p class="challenge-description">${challenge.description}</p>
                <div class="challenge-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${challenge.progress}%;"></div>
                    </div>
                    <span class="progress-text">Progress: ${challenge.progress}%</span>
                </div>
                <button class="btn ${buttonClass} btn-block" data-challenge-id="${challenge.id}">${buttonText}</button>
            `;
            challengesGrid.appendChild(card);
        });
    }

    renderChallenges();

    // Add a single event listener to handle all button clicks within the grid
    challengesGrid.addEventListener('click', (e) => {
        const button = e.target.closest('button');
        if (button) {
            const challengeId = button.dataset.challengeId;
            // Use the global showNotification function from shared.js
            window.showNotification(`Action taken on challenge ID: ${challengeId}`);
            
            // This is where you would add logic to start, continue, or view a challenge
        }
    });

    // The theme toggle and other shared logic is in a separate shared.js file
    
    // For consistency, let's also add the logout functionality here
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