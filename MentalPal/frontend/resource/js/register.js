document.addEventListener('DOMContentLoaded', () => {
    // --- Theme Toggle Logic ---
    const themeToggleBtn = document.querySelector('.theme-toggle');
    const body = document.body;

    const savedTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', savedTheme);

    if (savedTheme === 'dark') {
        themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
    }

    themeToggleBtn.addEventListener('click', () => {
        if (body.getAttribute('data-theme') === 'dark') {
            body.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
        }
    });

    // --- Notification Functionality ---
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;

        document.body.appendChild(notification);
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        setTimeout(() => {
            notification.classList.remove('show');
            notification.addEventListener('transitionend', () => {
                notification.remove();
            });
        }, 3000);
    }

    // --- Registration Form Submission Logic ---
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const age = document.getElementById('age').value;
            const gender = document.getElementById('gender').value;
            const profession = document.getElementById('profession').value;

            // Save the user's first name for the dashboard welcome message
            localStorage.setItem('userName', firstName.charAt(0).toUpperCase() + firstName.slice(1));

            // Create a single object with all the user's data
            const userData = {
                firstName: firstName,
                lastName: lastName,
                age: age,
                gender: gender,
                profession: profession
            };
            
            // NEW: Save the entire userData object to local storage
            localStorage.setItem('registeredUserData', JSON.stringify(userData));

            console.log("Registration data submitted:", userData);
            
            showNotification("Registration successful! Redirecting to your dashboard.");

            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);
        });
    }
});