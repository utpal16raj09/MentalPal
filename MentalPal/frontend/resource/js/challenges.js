document.addEventListener('DOMContentLoaded', () => {
    const challengesData = [
        { id: 1, title: "7-Day Gratitude Journal", description: "Write down three things you're grateful for every day to boost your positivity.", status: "Active", progress: 75 },
        { id: 2, title: "Mindful Moments", description: "Take a moment each day to focus on your breathing and surroundings.", status: "New", progress: 0 },
        { id: 3, title: "30-Day Sleep Improvement", description: "Follow a series of steps to improve your sleep hygiene and get better rest.", status: "Completed", progress: 100 },
        { id: 4, title: "Positive Affirmations", description: "Practice daily affirmations to build self-confidence and a positive mindset.", status: "New", progress: 0 },
        { id: 5, title: "Digital Detox", description: "A week-long challenge to reduce screen time and reconnect with your environment.", status: "New", progress: 0 },
        { id: 6, title: "Weekly Mood Tracker", description: "Check in with your feelings every day for a week to better understand your emotional patterns.", status: "New", progress: 0 },
        { id: 7, title: "5-Minute Journal", description: "Spend just five minutes each morning reflecting on your goals and thoughts.", status: "New", progress: 0 },
        { id: 8, title: "Social Connection", description: "Connect with a friend or family member for a meaningful conversation every day.", status: "New", progress: 0 },
    ];
    
    const challengesGrid = document.getElementById('challengesGrid');
    const toggleViewBtn = document.getElementById('toggleViewBtn');
    const initiallyVisibleCards = 4;
    let isExpanded = false;

    function createChallengeCard(challenge) {
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
        return card;
    }

    function renderInitialChallenges() {
        challengesData.slice(0, initiallyVisibleCards).forEach(challenge => {
            const card = createChallengeCard(challenge);
            challengesGrid.appendChild(card);
        });

        if (challengesData.length <= initiallyVisibleCards) {
            toggleViewBtn.style.display = 'none';
        }
    }

    function renderAllChallenges() {
        challengesData.slice(initiallyVisibleCards).forEach(challenge => {
            const card = createChallengeCard(challenge);
            challengesGrid.appendChild(card);
        });
    }

    // Toggle button functionality
    toggleViewBtn.addEventListener('click', () => {
        if (!isExpanded) {
            // "View More" state -> "View Less" state
            renderAllChallenges();
            toggleViewBtn.textContent = 'View Less Challenges';
            document.body.style.overflowY = 'auto'; // Make page scrollable
        } else {
            // "View Less" state -> "View More" state
            const cardsToRemove = challengesGrid.querySelectorAll('.challenge-card:nth-child(n+' + (initiallyVisibleCards + 1) + ')');
            cardsToRemove.forEach(card => card.remove());
            toggleViewBtn.textContent = 'View More Challenges';
            document.body.style.overflowY = 'hidden'; // Make page non-scrollable
            window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top
        }
        isExpanded = !isExpanded;
    });

    // Handle button clicks on challenges
    challengesGrid.addEventListener('click', (e) => {
        const button = e.target.closest('button');
        if (button) {
            const challengeId = button.dataset.challengeId;
            window.showNotification(`Action taken on challenge ID: ${challengeId}`);
        }
    });

    // Initial render
    renderInitialChallenges();

    // Logout Functionality
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