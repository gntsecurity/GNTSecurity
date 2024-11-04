document.getElementById('menu-toggle').addEventListener('click', function() {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('active');
});

// References popup functionality
const referencesBtn = document.getElementById('references-btn');
const popupOverlay = document.getElementById('popup-overlay');
const closeBtn = document.getElementById('close-btn');

referencesBtn.addEventListener('click', function() {
    popupOverlay.style.display = 'flex';
});

closeBtn.addEventListener('click', function() {
    popupOverlay.style.display = 'none';
});

popupOverlay.addEventListener('click', function(e) {
    if (e.target === popupOverlay) {
        popupOverlay.style.display = 'none';
    }
});
