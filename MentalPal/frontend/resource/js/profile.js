document.addEventListener('DOMContentLoaded', () => {
    // --- Data Management & Profile Population ---
    function getRegisteredUserData() {
        const userDataString = localStorage.getItem('registeredUserData');
        return userDataString ? JSON.parse(userDataString) : null;
    }

    function populateProfile() {
        const userData = getRegisteredUserData();
        const email = localStorage.getItem('userEmail') || "user@mentalpal.com";
        
        const placeholderName = "User";
        const placeholderAge = "N/A";
        const placeholderGender = "N/A";
        const placeholderProfession = "N/A";

        if (userData) {
            document.getElementById('profileUserName').textContent = `${userData.firstName} ${userData.lastName}`;
            document.getElementById('profileUserEmail').textContent = email;
            document.getElementById('profileUserAge').textContent = userData.age;
            document.getElementById('profileUserGender').textContent = userData.gender;
            document.getElementById('profileUserProfession').textContent = userData.profession;
        } else {
            document.getElementById('profileUserName').textContent = placeholderName;
            document.getElementById('profileUserEmail').textContent = email;
            document.getElementById('profileUserAge').textContent = placeholderAge;
            document.getElementById('profileUserGender').textContent = placeholderGender;
            document.getElementById('profileUserProfession').textContent = placeholderProfession;
        }
        
        // Mock data for stats
        document.getElementById('journalCount').textContent = "57";
        document.getElementById('meditationTime').textContent = "12.5";
        document.getElementById('challengesCompleted').textContent = "8";
        document.getElementById('averageMood').textContent = "4.2";
    }

    populateProfile();

    // --- Button Functionality ---

    // Edit Profile Button
    const editProfileBtn = document.getElementById('editProfileBtn');
    const editProfileModal = document.getElementById('editProfileModal');
    const closeEditModalBtn = editProfileModal.querySelector('.close-btn');

    editProfileBtn.addEventListener('click', () => {
        const userData = getRegisteredUserData();
        if (userData) {
            document.getElementById('editFirstName').value = userData.firstName;
            document.getElementById('editLastName').value = userData.lastName;
            document.getElementById('editAge').value = userData.age;
            document.getElementById('editGender').value = userData.gender;
            document.getElementById('editProfession').value = userData.profession;
        }
        editProfileModal.style.display = 'flex';
    });

    closeEditModalBtn.addEventListener('click', () => {
        editProfileModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === editProfileModal) {
            editProfileModal.style.display = 'none';
        }
    });

    // Save Changes Form Submission
    const editProfileForm = document.getElementById('editProfileForm');
    editProfileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const updatedData = {
            firstName: document.getElementById('editFirstName').value,
            lastName: document.getElementById('editLastName').value,
            age: document.getElementById('editAge').value,
            gender: document.getElementById('editGender').value,
            profession: document.getElementById('editProfession').value,
        };
        
        // Save the updated data to local storage
        localStorage.setItem('registeredUserData', JSON.stringify(updatedData));
        localStorage.setItem('userName', updatedData.firstName);
        
        showNotification("Profile updated successfully!");
        editProfileModal.style.display = 'none';
        populateProfile(); // Refresh the page content with new data
    });

    // View All Activity Button
    const viewAllActivityBtn = document.getElementById('viewAllActivity');
    if (viewAllActivityBtn) {
        viewAllActivityBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'journal.html';
        });
    }
    
    // Logout Functionality
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const confirmed = confirm("Are you sure you want to log out?");
            if (confirmed) {
                // Clear all user-related data for a full reset
                localStorage.removeItem('userName');
                localStorage.removeItem('theme');
                localStorage.removeItem('registeredUsers');
                localStorage.removeItem('registeredUserData');
                localStorage.removeItem('userEmail');
                window.location.href = 'login.html'; 
            }
        });
    }

    // This part is the theme toggle logic from shared.js
    // It's still in shared.js and correctly linked in the HTML
});