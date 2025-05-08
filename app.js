const menu = document.querySelector('#mobile-menu')
const menuLinks = document.querySelector('.navbar__menu')


menu.addEventListener('click', function() {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
});

document.getElementById("create-event-btn").addEventListener("click", function(e) {
    e.preventDefault();
  
    // Use today's date, or replace with selected date if applicable
    const today = new Date().toISOString().split("T")[0];
    window.location.href = `tech.html?date=${today}`;
  });
  