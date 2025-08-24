document.addEventListener('DOMContentLoaded', () => {
    // --- Data Management & Profile Population ---
    function getRegisteredUserData() {
        const userDataString = localStorage.getItem('registeredUserData');
        return userDataString ? JSON.parse(userDataString) : null;
    }

    function populateProfile() {
        const userData = getRegisteredUserData();
        const email = localStorage.getItem('userEmail') || "user@mentalpal.com";

        document.getElementById('profileUserName').textContent = userData ? `${userData.firstName} ${userData.lastName}` : "User";
        document.getElementById('profileUserEmail').textContent = email;
        document.getElementById('profileUserAge').textContent = userData ? userData.age : "N/A";
        document.getElementById('profileUserGender').textContent = userData ? userData.gender : "N/A";
        document.getElementById('profileUserProfession').textContent = userData ? userData.profession : "N/A";

        // Mock stats
        document.getElementById('journalCount').textContent = "57";
        document.getElementById('meditationTime').textContent = "12.5";
        document.getElementById('challengesCompleted').textContent = "8";
        document.getElementById('averageMood').textContent = "4.2";
    }

    populateProfile();

    // --- Edit Profile Modal ---
    const editProfileBtn = document.getElementById("editProfileBtn");
    const editProfileModal = document.getElementById("editProfileModal");
    const closeBtn = editProfileModal.querySelector(".close-btn");

    // Open modal and populate form
    editProfileBtn.addEventListener("click", () => {
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

    // Close modal
    closeBtn.addEventListener("click", () => editProfileModal.style.display = 'none');
    window.addEventListener("click", (e) => { if (e.target === editProfileModal) editProfileModal.style.display = 'none'; });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") editProfileModal.style.display = 'none'; });

    // --- Save Changes Form Submission ---
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
        localStorage.setItem('registeredUserData', JSON.stringify(updatedData));
        localStorage.setItem('userName', updatedData.firstName);

        showNotification("Profile updated successfully!");
        editProfileModal.style.display = 'none';
        populateProfile();
    });

    // --- View All Activity ---
    const viewAllActivityBtn = document.getElementById('viewAllActivity');
    if (viewAllActivityBtn) {
        viewAllActivityBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'journal.html';
        });
    }

    // --- Logout ---
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (confirm("Are you sure you want to log out?")) {
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
