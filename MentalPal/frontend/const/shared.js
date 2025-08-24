// --- Theme toggle ---
const themeToggleBtn = document.querySelector('.theme-toggle');
const body = document.body;
const savedTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', savedTheme);
themeToggleBtn.innerHTML = savedTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';

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

// --- Sidebar toggle ---
const sidebar = document.querySelector('.sidebar');
const sidebarToggle = document.querySelector('.sidebar__toggle');
if (sidebarToggle) sidebarToggle.addEventListener('click', () => sidebar.classList.toggle('collapsed'));

// --- Global Logout Modal ---
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

// --- Load shared modal ---
fetch('../const/shared.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('shared-container').innerHTML = html;
    initLogoutModal(); // Attach events AFTER modal is in DOM
  })
  .catch(err => console.error(err));
