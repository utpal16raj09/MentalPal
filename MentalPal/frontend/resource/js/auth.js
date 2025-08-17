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

    // --- Modal Logic ---
    const modals = document.querySelectorAll('.modal');
    const openModalButtons = document.querySelectorAll('[data-modal]');
    const closeModalButtons = document.querySelectorAll('.modal .close-btn');

    openModalButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = button.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'flex';
            }
        });
    });

    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    });

    window.addEventListener('click', (e) => {
        modals.forEach(modal => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
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

    // --- Form Submission Logic ---

    // 1. Login Form Submission
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const emailInput = document.getElementById('email').value;
        const passwordInput = document.getElementById('password').value;
        
        const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
        const user = registeredUsers.find(
            u => u.email === emailInput && u.password === passwordInput
        );

        if (user) {
            localStorage.setItem('userName', user.userName);
            showNotification("Login successful! Redirecting...");
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);
        } else {
            showNotification("Invalid credentials. Please sign up first or check your details.");
        }
    });

    // 2. Sign Up Form Submission
    const signupForm = document.getElementById('signupForm');
    signupForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (password !== confirmPassword) {
            showNotification("Passwords do not match. Please try again.");
            return;
        }

        const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
        if (registeredUsers.find(u => u.email === email)) {
            showNotification("This email is already registered. Please sign in or use a different email.");
            return;
        }

        // The user's name is now a placeholder. It will be updated on the registration page.
        const userName = email.split('@')[0];
        const newUser = { email, password, userName: userName.charAt(0).toUpperCase() + userName.slice(1) };
        registeredUsers.push(newUser);
        localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));

        // Redirects to the registration page.
        showNotification("Account created! Redirecting to complete your profile.");
        document.getElementById('signupModal').style.display = 'none';
        signupForm.reset();
        setTimeout(() => {
            window.location.href = 'register.html';
        }, 1000);
    });

    // 3. Forgot Password Form Submission
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    forgotPasswordForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const resetEmail = document.getElementById('resetEmail').value;

        showNotification(`A password reset link has been sent to ${resetEmail}.`);
        document.getElementById('forgotPasswordModal').style.display = 'none';
        forgotPasswordForm.reset();
    });
});