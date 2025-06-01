const track = document.querySelector('.carousel-track');
const nextButton = document.querySelector('.carousel-btn.next');
const prevButton = document.querySelector('.carousel-btn.prev');
const projectItems = document.querySelectorAll('.project-item');
const totalItems = projectItems.length;

// Clone items for infinite scroll
const firstClone = projectItems[0].cloneNode(true);
const lastClone = projectItems[totalItems - 1].cloneNode(true);
track.appendChild(firstClone);
track.insertBefore(lastClone, projectItems[0]);

const allItems = document.querySelectorAll('.project-item'); // Include clones
let index = 1; // Start at first original item (after lastClone)
const slideWidth = projectItems[0].offsetWidth + 32; // Width + margin

// Set initial position
track.style.transform = `translateX(-${index * slideWidth}px)`;

// Smooth scroll for navigation links
document.querySelectorAll('.nav__links a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        window.scrollTo({
            top: targetElement.offsetTop,
            behavior: 'smooth'
        });
    });
});

// Carousel navigation
nextButton.addEventListener('click', () => {
    index++;
    updateCarousel(true);
});

prevButton.addEventListener('click', () => {
    index--;
    updateCarousel(true);
});

function updateCarousel(transition = true) {
    // Enable/disable transition for smooth or instant jump
    track.style.transition = transition ? 'transform 0.5s ease-in-out' : 'none';
    track.style.transform = `translateX(-${index * slideWidth}px)`;

    // Highlight active item
    allItems.forEach((item, i) => {
        item.style.opacity = i === index ? '1' : '0.7';
        item.style.transform = i === index ? 'scale(1.05)' : 'scale(1)';
    });

    // Infinite scroll logic
    if (index >= totalItems + 1) {
        setTimeout(() => {
            track.style.transition = 'none';
            index = 1;
            track.style.transform = `translateX(-${index * slideWidth}px)`;
        }, 500); // Match transition duration
    } else if (index <= 0) {
        setTimeout(() => {
            track.style.transition = 'none';
            index = totalItems;
            track.style.transform = `translateX(-${index * slideWidth}px)`;
        }, 500); // Match transition duration
    }
}

// Auto-play carousel
let autoPlay = setInterval(() => {
    index++;
    updateCarousel(true);
}, 4000);

// Pause auto-play on hover
track.addEventListener('mouseenter', () => clearInterval(autoPlay));
track.addEventListener('mouseleave', () => {
    autoPlay = setInterval(() => {
        index++;
        updateCarousel(true);
    }, 4000);
});

// Animate skills on scroll
const skillsSection = document.querySelector('.skills');
const skillItems = document.querySelectorAll('.skill__item');
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 200);
                });
            }
        });
    },
    {threshold: 0.3}
);
observer.observe(skillsSection);