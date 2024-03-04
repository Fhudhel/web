function toggleTheme() {
  const body = document.body;
  if (body.classList.contains('dark-theme')) {
    applyLightTheme();
  } else {
    applyDarkTheme();
  }
}

function applyDarkTheme() {
  const body = document.body;
  body.classList.remove('light-theme');
  body.classList.add('dark-theme');
  document.getElementById('marqueeText').style.color = 'white';
}

function applyLightTheme() {
  const body = document.body;
  body.classList.remove('dark-theme');
  body.classList.add('light-theme');
  document.getElementById('marqueeText').style.color = 'red';
}

// Memastikan tema saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (isDarkMode) {
    applyDarkTheme();
  } else {
    applyLightTheme();
  }
});