// Theme Mode Setup
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add("dark");
}

const themeToggle = document.querySelector("#theme-toggle");

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        document.body.classList.contains("light-theme")
            ? enableDarkMode()
            : enableLightMode();
    });
}

function enableDarkMode() {
    document.body.classList.remove("light-theme");
    document.body.classList.add("dark-theme");
    document.body.classList.add("dark");
}

function enableLightMode() {
    document.body.classList.remove("dark-theme");
    document.body.classList.add("light-theme");
    document.body.classList.remove("dark");
}

function setThemePreference() {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        enableDarkMode();
        return;
    }
    enableLightMode();
}

function toggleMenu() {
    var menu = document.getElementById("menu");
    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
}

// Section Switching with URL Hash Support
function showSection(sectionId, updateHash = true) {
    var activeSection = document.getElementById(sectionId);
    if (!activeSection) return;

    // Update URL hash without reloading page
    if (updateHash) {
        window.location.hash = sectionId;
    }

    // Remove active class from all menu items
    var menuItems = document.querySelectorAll('#menu li a');
    menuItems.forEach(function (item) {
        item.classList.remove('active');
    });

    // Hide and remove active class from all sections
    var sections = document.querySelectorAll('.section');
    sections.forEach(function (section) {
        section.classList.remove('active-section');
    });

    // Transition delay for fading out
    setTimeout(function () {
        sections.forEach(function (section) {
            section.style.display = 'none';
        });

        // Show selected section
        activeSection.style.display = 'block';

        setTimeout(function () {
            activeSection.classList.add('active-section');
        }, 10);
    }, 200);

    // Highlight current menu item
    var activeLink = document.querySelector('#menu li a[onclick*="' + sectionId + '"]');
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// Load current section on page load or refresh
function loadInitialSection() {
    const hash = window.location.hash.replace('#', '');
    const initialSection = hash || 'about-section';
    showSection(initialSection, false);
}

// Event Listeners for Initial Load and Browser Navigation
window.addEventListener('DOMContentLoaded', () => {
    setThemePreference();
    loadInitialSection();
});

window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
        showSection(hash, false);
    }
});

// Card Button Logic
document.querySelectorAll('.card').forEach(card => {
    card.querySelectorAll('.card-buttons button').forEach(button => {
        button.addEventListener('click', function (e) {
            const targetSectionId = button.getAttribute('data-section');
            const targetSection = card.querySelector(targetSectionId);

            if (targetSectionId.includes('about')) {
                card.classList.remove('is-active');
            } else {
                card.classList.add('is-active');
            }

            card.setAttribute('data-state', targetSectionId);

            card.querySelectorAll('.card-section').forEach(section => section.classList.remove('is-active'));
            card.querySelectorAll('.card-buttons button').forEach(btn => btn.classList.remove('is-active'));

            button.classList.add('is-active');
            if (targetSection) {
                targetSection.classList.add('is-active');
            }
        });
    });
});


// Slideshow Logic
let slideIndex = 0;
let slideTimer;

function showSlides(n) {
    const slides = document.querySelectorAll('.slide');
    if (!slides.length) return;

    if (n !== undefined) {
        slideIndex = n;
    } else {
        slideIndex++;
    }

    if (slideIndex >= slides.length) { slideIndex = 0; }
    if (slideIndex < 0) { slideIndex = slides.length - 1; }

    slides.forEach((slide, idx) => {
        slide.style.display = (idx === slideIndex) ? 'block' : 'none';
    });

    // Reset auto-play timer
    clearTimeout(slideTimer);
    slideTimer = setTimeout(showSlides, 4000);
}

function moveSlide(step) {
    showSlides(slideIndex + step);
}

// Start slideshow once page components load
document.addEventListener('DOMContentLoaded', () => {
    showSlides(0);
});