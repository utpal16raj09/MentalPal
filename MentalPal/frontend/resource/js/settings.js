document.addEventListener('DOMContentLoaded', () => {
  const logoutBtn = document.getElementById('logoutBtn');
  const logoutModal = document.getElementById('logoutModal');
  const closeLogoutModal = logoutModal ? logoutModal.querySelector('.close-btn') : null;
  const cancelLogoutBtn = document.getElementById('cancelLogoutBtn');
  const confirmLogoutBtn = document.getElementById('confirmLogoutBtn');

  if (logoutBtn && logoutModal) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      logoutModal.style.display = 'flex';
    });
  }

  if (closeLogoutModal) {
    closeLogoutModal.addEventListener('click', () => {
      logoutModal.style.display = 'none';
    });
  }

  if (cancelLogoutBtn) {
    cancelLogoutBtn.addEventListener('click', () => {
      logoutModal.style.display = 'none';
    });
  }

  if (confirmLogoutBtn) {
    confirmLogoutBtn.addEventListener('click', () => {
      // Remove only current session info
      localStorage.removeItem('userName');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userAvatar');
      localStorage.removeItem('twoFactorEnabled');
      logoutModal.style.display = 'none';
      window.showNotification("Logged out successfully!");
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 500);
    });
  }

  window.addEventListener('click', (e) => {
    if (e.target === logoutModal) {
      logoutModal.style.display = 'none';
    }
  });
});
