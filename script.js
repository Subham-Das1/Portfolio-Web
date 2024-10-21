//Tube Loader 
document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        document.querySelector(".loader").style.display = "none"; 
        document.querySelector(".main-content").classList.remove("hidden");
    }, 3000);

    // Dark mode toggle
    function toggleTheme() {
        const bodyElement = document.body;
        const sunIcon = document.getElementById("sun-icon");
        const moonIcon = document.getElementById("moon-icon");

        bodyElement.classList.toggle("dark-mode");
        if (bodyElement.classList.contains("dark-mode")) {
            moonIcon.classList.add("hidden");
            sunIcon.classList.remove("hidden");
        } else {
            moonIcon.classList.remove("hidden");
            sunIcon.classList.add("hidden");
        }
    }

    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Initialize theme based on preference
    if (prefersDarkMode) {
        document.body.classList.add("dark-mode");
        document.getElementById("moon-icon").classList.add("hidden");
        document.getElementById("sun-icon").classList.remove("hidden");
    }

    const themeToggle = document.getElementById("dark-mode-toggle");
    themeToggle.addEventListener("click", toggleTheme);

    // Role typing effect
    const roles = ["Frontend Developer", "Designer", "Problem Solver"];
    let currentRole = "";
    let currentIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 280;
    const erasingSpeed = 100;
    const delayBetweenRoles = 1000; 

    function typeRole() {
        const roleElement = document.getElementById("role");

        if (!isDeleting && charIndex < roles[currentIndex].length) {
            currentRole += roles[currentIndex].charAt(charIndex);
            charIndex++;
            roleElement.textContent = currentRole;
            setTimeout(typeRole, typingSpeed);
        } else if (isDeleting && charIndex > 0) {
            currentRole = roles[currentIndex].substring(0, charIndex - 1);
            charIndex--;
            roleElement.textContent = currentRole;
            setTimeout(typeRole, erasingSpeed);
        } else {
            isDeleting = !isDeleting;
            if (!isDeleting) {
                currentIndex = (currentIndex + 1) % roles.length;
                setTimeout(typeRole, delayBetweenRoles);
            } else {
                setTimeout(typeRole, 500);
            }
        }
    }

    // Start the typing effect
    setTimeout(typeRole, delayBetweenRoles);

    // Mobile menu functionality
    const mobileMenuButton = document.getElementById("mobile-menu-button");
    const mobileMenu = document.getElementById("mobile-menu");

    mobileMenuButton.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
    });

    // Hide mobile menu and show section on navigation item click
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.section');

    navButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = btn.getAttribute('data-section');
            
            // Hide all sections
            sections.forEach(section => section.classList.add('hidden'));

            // Show the active section
            document.getElementById(sectionId).classList.remove('hidden');

            // Hide mobile menu if it's visible
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        });
    });
});


//Section Loader 
document.addEventListener('DOMContentLoaded', function() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const loader = document.getElementById('section-loader');
    const sections = document.querySelectorAll('.section');
    
    navButtons.forEach(btn => {
        btn.addEventListener('click', (event) => {
            event.preventDefault();
            
            loader.classList.remove('hidden');
            
            const sectionId = btn.getAttribute('data-section');
            
            setTimeout(() => {
                sections.forEach(section => section.classList.remove('active'));
                
                document.getElementById(sectionId).classList.add('active');
                
                loader.classList.add('hidden');
            }, 2300); 
        });
    });
});

// About Section Animation Management   
const aboutContentSecond = document.querySelector('.about-content-second');
const aboutContentFirst = document.querySelector('.about-content-first');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            aboutContentFirst.classList.add('hidden');

            aboutContentSecond.style.animation = 'none'; 
            aboutContentSecond.offsetHeight; 
            aboutContentSecond.style.animation = ''; 
        } else {
            aboutContentFirst.classList.remove('hidden');
            aboutContentSecond.classList.remove('visible');
        }
    });
}, {
    threshold: 0.5 
});


const disableAnimationOnMobile = () => {
    if (window.innerWidth <= 768) {
        aboutContentFirst.classList.remove('hidden'); 
        aboutContentSecond.classList.add('visible'); 
        
        observer.disconnect(); 
    } else {
        observer.observe(aboutContentSecond);
    }
};

disableAnimationOnMobile();

window.addEventListener('resize', disableAnimationOnMobile);



//Skill Section Management
const skillButtons = document.querySelectorAll('.Skill-btn');
const skillItems = document.querySelectorAll('.skill-item');

skillButtons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');
        
        if (category === 'all') {
            skillItems.forEach(item => item.style.display = 'flex');
        } else {
            skillItems.forEach(item => {
                if (item.getAttribute('data-category') === category) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        }
    });
});


//Project Section Management
document.addEventListener('DOMContentLoaded', () => {
    const descriptions = document.querySelectorAll('.animated-description-1, .animated-description-2'); 
    const heading = document.querySelector('.animated-heading');

    const observerOptions = {
        root: null, 
        threshold: 0.2 
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('animated-description-1')) {
                    setTimeout(() => {
                        entry.target.classList.add('visible-description-1');
                    }, 2000)
                } else if (entry.target.classList.contains('animated-description-2')) {
                        entry.target.classList.add('visible-description-2'); 
                } else if (entry.target.classList.contains('animated-heading')) {
                    entry.target.classList.add('visible-heading');
                }
            }
        });
    }, observerOptions);

    descriptions.forEach(description => observer.observe(description));
    observer.observe(heading);
});

// Refresh in Device Less than 768px 
let startY = 0;
let isPullingDown = false;
const refreshThreshold = 150; 
const pullResistance = 2.5;

window.addEventListener('touchstart', function(e) {
    if (window.scrollY === 0) {
        startY = e.touches[0].pageY;
        isPullingDown = true; 
    }
}, { passive: true });

window.addEventListener('touchmove', function(e) {
    if (isPullingDown) {
        let currentY = e.touches[0].pageY;
        if (currentY > startY) {
            let distancePulled = (currentY - startY) / pullResistance; 
            if (distancePulled > refreshThreshold) {
                location.reload(); 
                isPullingDown = false; 
            }
        } else {
            isPullingDown = false;
        }
    }
}, { passive: true });

window.addEventListener('touchend', function() {
    isPullingDown = false;
}, { passive: true });
