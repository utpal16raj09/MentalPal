document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    const isUserLoggedIn = localStorage.getItem('userName');
    if (!isUserLoggedIn) {
        window.location.href = 'login.html';
        return;
    }

    // --- Data Loading and Population ---
    function getRegisteredUserData() {
        const userDataString = localStorage.getItem('registeredUserData');
        return userDataString ? JSON.parse(userDataString) : null;
    }

    function populateSettings() {
        const userData = getRegisteredUserData();
        const userEmail = localStorage.getItem('userEmail') || "user@example.com";
        
        if (userData) {
            const firstNameInput = document.getElementById('settingFirstName');
            if (firstNameInput) firstNameInput.value = userData.firstName || '';
            const lastNameInput = document.getElementById('settingLastName');
            if (lastNameInput) lastNameInput.value = userData.lastName || '';
        }

        const emailInput = document.getElementById('settingEmail');
        if (emailInput) emailInput.value = userEmail;

        // Load notification preferences
        document.getElementById('journalRemindersToggle').checked = localStorage.getItem('journalReminders') === 'true';
        document.getElementById('meditationRemindersToggle').checked = localStorage.getItem('meditationReminders') === 'true';
        document.getElementById('challengeUpdatesToggle').checked = localStorage.getItem('challengeUpdates') === 'true';

        // Load app preferences
        document.getElementById('appLanguage').value = localStorage.getItem('appLanguage') || 'en';
        document.getElementById('dateFormat').value = localStorage.getItem('dateFormat') || 'mm-dd-yyyy';

        // Load security preferences
        document.getElementById('twoFactorToggle').checked = localStorage.getItem('twoFactorEnabled') === 'true';
    }

    populateSettings();

    // --- Profile Avatar Upload ---
    const avatarInput = document.getElementById('avatarInput');
    if (avatarInput) {
        avatarInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const profileAvatar = document.getElementById('profileAvatar');
                    if (profileAvatar) {
                        profileAvatar.src = e.target.result;
                    }
                    localStorage.setItem('userAvatar', e.target.result); // Save avatar data
                    window.showNotification("Profile photo updated!");
                };
                reader.readAsDataURL(file);
            }
        });
    }
    
    // Load saved avatar on page load
    const savedAvatar = localStorage.getItem('userAvatar');
    if (savedAvatar) {
        const profileAvatar = document.getElementById('profileAvatar');
        if (profileAvatar) {
            profileAvatar.src = savedAvatar;
        }
    }


    // --- General Settings Form Submission ---
    const generalSettingsForm = document.getElementById('generalSettingsForm');
    if (generalSettingsForm) {
        generalSettingsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const firstName = document.getElementById('settingFirstName').value;
            const lastName = document.getElementById('settingLastName').value;
            
            let userData = getRegisteredUserData() || {};
            userData.firstName = firstName;
            userData.lastName = lastName;
            localStorage.setItem('registeredUserData', JSON.stringify(userData));
            localStorage.setItem('userName', firstName.charAt(0).toUpperCase() + firstName.slice(1));

            window.showNotification("General settings saved!");
        });
    }

    // --- App Preferences ---
    document.getElementById('appLanguage').addEventListener('change', (e) => {
        localStorage.setItem('appLanguage', e.target.value);
        window.showNotification(`Language set to ${e.target.options[e.target.selectedIndex].text}.`);
    });

    document.getElementById('dateFormat').addEventListener('change', (e) => {
        localStorage.setItem('dateFormat', e.target.value);
        window.showNotification(`Date format set to ${e.target.value}.`);
    });


    // --- Notification Toggles ---
    document.getElementById('journalRemindersToggle').addEventListener('change', (e) => {
        localStorage.setItem('journalReminders', e.target.checked);
        window.showNotification(`Journal reminders ${e.target.checked ? 'enabled' : 'disabled'}.`);
    });

    document.getElementById('meditationRemindersToggle').addEventListener('change', (e) => {
        localStorage.setItem('meditationReminders', e.target.checked);
        window.showNotification(`Meditation reminders ${e.target.checked ? 'enabled' : 'disabled'}.`);
    });

    document.getElementById('challengeUpdatesToggle').addEventListener('change', (e) => {
        localStorage.setItem('challengeUpdates', e.target.checked);
        window.showNotification(`Challenge updates ${e.target.checked ? 'enabled' : 'disabled'}.`);
    });

    // --- Security Toggles ---
    document.getElementById('twoFactorToggle').addEventListener('change', (e) => {
        localStorage.setItem('twoFactorEnabled', e.target.checked);
        window.showNotification(`Two-Factor Authentication ${e.target.checked ? 'enabled' : 'disabled'}.`);
    });


    // --- Account Security Actions ---
    const changePasswordBtn = document.getElementById('changePasswordBtn');
    const changePasswordModal = document.getElementById('changePasswordModal');
    const closeChangePasswordModalBtn = changePasswordModal.querySelector('.close-btn');

    if (changePasswordBtn) {
        changePasswordBtn.addEventListener('click', () => {
            changePasswordModal.style.display = 'flex';
        });
    }

    if (closeChangePasswordModalBtn) {
        closeChangePasswordModalBtn.addEventListener('click', () => {
            changePasswordModal.style.display = 'none';
            document.getElementById('changePasswordForm').reset();
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === changePasswordModal) {
            changePasswordModal.style.display = 'none';
            document.getElementById('changePasswordForm').reset();
        }
    });

    const changePasswordForm = document.getElementById('changePasswordForm');
    if (changePasswordForm) {
        changePasswordForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const currentPassword = document.getElementById('currentPassword').value;
            const newPassword = document.getElementById('newPassword').value;
            const confirmNewPassword = document.getElementById('confirmNewPassword').value;
            
            if (newPassword !== confirmNewPassword) {
                window.showNotification("New passwords do not match. Please try again.");
                return;
            }

            window.showNotification("Password changed successfully!");
            changePasswordModal.style.display = 'none';
            changePasswordForm.reset();
        });
    }

    const exportDataBtn = document.getElementById('exportDataBtn');
    if (exportDataBtn) {
        exportDataBtn.addEventListener('click', () => {
            const data = JSON.stringify(localStorage, null, 2);
            const blob = new Blob([data], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'mentalpal_data.json';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            window.showNotification("Your data has been exported!");
        });
    }

    const importDataBtn = document.getElementById('importDataBtn');
    if (importDataBtn) {
        importDataBtn.addEventListener('click', () => {
            window.showNotification("Data import functionality not implemented yet.");
        });
    }


    const deleteAccountBtn = document.getElementById('deleteAccountBtn');
    if (deleteAccountBtn) {
        deleteAccountBtn.addEventListener('click', () => {
            const confirmed = confirm("Are you sure you want to delete your account? This action cannot be undone.");
            if (confirmed) {
                localStorage.clear();
                window.showNotification("Account deleted successfully! Redirecting to login.");
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 1000);
            }
        });
    }

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const confirmed = confirm("Are you sure you want to log out?");
            if (confirmed) {
                localStorage.removeItem('userName');
                localStorage.removeItem('theme');
                localStorage.removeItem('registeredUsers');
                localStorage.removeItem('registeredUserData');
                localStorage.removeItem('userEmail');
                window.location.href = 'login.html'; 
            }
        });
    }
});