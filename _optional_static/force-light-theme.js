// Force light theme for resume view
// This prevents dark mode from being applied even if user has it set in localStorage

(function() {
  // Set light mode immediately
  document.documentElement.dataset.mode = 'light';
  document.documentElement.dataset.theme = 'light';
  
  // Clear any stored dark mode preferences
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('mode', 'light');
    localStorage.setItem('theme', 'light');
  }
  
  // Prevent theme switching
  document.addEventListener('DOMContentLoaded', function() {
    // Find and disable theme toggle buttons if they exist
    const themeToggles = document.querySelectorAll('.theme-switch-button, [data-toggle="theme"]');
    themeToggles.forEach(toggle => {
      toggle.style.display = 'none';
    });
  });
})();
