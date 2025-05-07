// Typing animation
const words = ["Data Scientist", "Analytics Professional", "Machine Learning Engineer"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 100;

function type() {
    const currentWord = words[wordIndex];
    const dynamicText = document.querySelector('.dynamic-text');
    
    if (isDeleting) {
        dynamicText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = 50;
    } else {
        dynamicText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 100;
    }

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typingDelay = 2000;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typingDelay = 500;
    }

    setTimeout(type, typingDelay);
}

// Start typing animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    type();
    
    // Initialize intersection observer for section animations
    const sections = document.querySelectorAll('.section');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Add hover effect to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Scroll animations for service cards
    const animateOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Observe all service cards
    serviceCards.forEach((card, index) => {
        // Add stagger delay based on index
        card.style.animationDelay = `${index * 0.2}s`;
        animateOnScroll.observe(card);
    });

    // Scroll animations for experience and education cards
    const animateOnScrollExperience = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    });

    // Observe all degree cards
    document.querySelectorAll('.degree').forEach((card, index) => {
        // Add stagger delay based on index
        card.style.animationDelay = `${index * 0.2}s`;
        animateOnScrollExperience.observe(card);
    });

    // Project cards animation
    const projectCards = document.querySelectorAll('.project-card');
    const projectsSection = document.getElementById('projects');
    const projectsHeading = projectsSection ? projectsSection.querySelector('h2') : null;

    const animateProjectCards = () => {
        if (projectsHeading) {
            projectsHeading.classList.add('animate');
        }
        projectCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('animate');
            }, index * 200); // Stagger the animations
        });
    };

    // Intersection Observer for project cards
    const projectsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProjectCards();
                projectsObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    });

    if (projectsSection) {
        projectsObserver.observe(projectsSection);
    }

    // Initialize experience section animations
    const experienceSection = document.querySelector('#experience');
    if (experienceSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateExperienceSection();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(experienceSection);
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add fade-in animation to all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(section);
});

// Add hover effects to links
document.querySelectorAll('a').forEach(link => {
    link.style.transition = 'color 0.3s ease, transform 0.3s ease';
    link.addEventListener('mouseover', () => {
        link.style.transform = 'scale(1.05)';
    });
    link.addEventListener('mouseout', () => {
        link.style.transform = 'scale(1)';
    });
});

// Add animation to profile section
const profile = document.querySelector('.profile');
if (profile) {
    profile.style.opacity = '0';
    profile.style.transform = 'translateY(-20px)';
    profile.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    
    // Trigger animation after page load
    window.addEventListener('load', () => {
        profile.style.opacity = '1';
        profile.style.transform = 'translateY(0)';
    });
}

// Add animation to job and project cards
document.querySelectorAll('.job, .project').forEach(card => {
    card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    card.addEventListener('mouseover', () => {
        card.style.transform = 'translateY(-5px)';
        card.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
    });
    card.addEventListener('mouseout', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = 'none';
    });
});

// Skills section animation
const skillsSection = document.querySelector('#skills');
const skillCategories = document.querySelectorAll('.skill-category');

function animateSkillsSection() {
    skillCategories.forEach((category, index) => {
        setTimeout(() => {
            category.style.opacity = '1';
            category.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillsSection();
            skillsObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
});

if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// Contact section animation
const contactSection = document.getElementById('contact');
const contactHeading = contactSection ? contactSection.querySelector('h2') : null;
const contactCards = document.querySelectorAll('.contact-card');
const socialLinks = document.querySelectorAll('.social-link');

const animateContactSection = () => {
    if (contactHeading) {
        contactHeading.classList.add('animate');
    }
    contactCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('animate');
        }, index * 200);
    });
    socialLinks.forEach((link, index) => {
        setTimeout(() => {
            link.classList.add('animate');
        }, (contactCards.length * 200) + (index * 200));
    });
};

// Intersection Observer for contact section
const contactObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateContactSection();
            contactObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
});

if (contactSection) {
    contactObserver.observe(contactSection);
}

// Tech stack animation
const techItems = document.querySelectorAll('.tech-item');

const animateTechStack = (jobCard) => {
    const techItems = jobCard.querySelectorAll('.tech-item');
    techItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('animate');
        }, index * 100);
    });
};

// Enhanced experience card animation
const experienceCards = document.querySelectorAll('.job');

const animateExperienceCards = () => {
    experienceCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('animate');
            animateTechStack(card);
        }, index * 200);
    });
};

// Intersection Observer for experience cards
const experienceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateExperienceCards();
            experienceObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
});

if (experienceCards.length > 0) {
    experienceObserver.observe(experienceCards[0].parentElement);
}

// Mobile Navigation Menu
const navLinks = document.querySelector('.nav-links');
const navbar = document.querySelector('.navbar');

// Toggle mobile menu
document.addEventListener('click', (e) => {
    if (e.target.closest('.nav-links a')) {
        navLinks.classList.remove('active');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Experience section animations
function animateExperienceSection() {
    const jobCards = document.querySelectorAll('.job-card');
    const techItems = document.querySelectorAll('.tech-item');
    
    jobCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('animate');
        }, index * 200);
    });
    
    techItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('animate');
        }, index * 100);
    });
}

// Toggle job details
function toggleJobDetails(header, forceExpand = false) {
    const jobCard = header.closest('.job-card');
    const details = jobCard.querySelector('.job-details');
    const isActive = header.classList.contains('active');
    const allJobCards = Array.from(document.querySelectorAll('.job-card'));
    const currentIndex = allJobCards.indexOf(jobCard);

    if (!isActive || forceExpand) {
        // Hide all other job cards
        allJobCards.forEach((card, idx) => {
            if (card !== jobCard) {
                card.classList.add('hide-when-other-active');
                const otherHeader = card.querySelector('.job-header');
                const otherDetails = card.querySelector('.job-details');
                otherHeader.classList.remove('active');
                otherDetails.style.maxHeight = '0';
                otherDetails.style.opacity = '0';
            } else {
                card.classList.remove('hide-when-other-active');
            }
        });
        // Expand the current job card
        jobCard.classList.add('expanded');
        header.classList.add('active');
        details.style.maxHeight = '2000px';
        details.style.opacity = '1';
        // Scroll to the expanded card with smooth animation
        jobCard.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
        // Animate tech stack items
        const techItems = jobCard.querySelectorAll('.tech-item');
        techItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('animate');
            }, index * 100);
        });
        // Remove any existing nav
        const oldNav = jobCard.querySelector('.exp-nav');
        if (oldNav) oldNav.remove();
        // Add navigation buttons if not present
        const navContainer = document.createElement('div');
        navContainer.className = 'exp-nav';
        if (currentIndex > 0) {
            const prevBtn = document.createElement('button');
            prevBtn.className = 'exp-nav-btn prev';
            prevBtn.innerHTML = '⟨ Previous';
            navContainer.appendChild(prevBtn);
            prevBtn.onclick = (e) => {
                e.stopPropagation();
                navigateExperience(jobCard, -1);
            };
        }
        if (currentIndex < allJobCards.length - 1) {
            const nextBtn = document.createElement('button');
            nextBtn.className = 'exp-nav-btn next';
            nextBtn.innerHTML = 'Next ⟩';
            navContainer.appendChild(nextBtn);
            nextBtn.onclick = (e) => {
                e.stopPropagation();
                navigateExperience(jobCard, 1);
            };
        }
        details.appendChild(navContainer);
    } else {
        // Collapse the expanded card, then show all cards after transition
        header.classList.remove('active');
        details.style.maxHeight = '0';
        details.style.opacity = '0';
        // Wait for transition to finish before restoring grid
        const onTransitionEnd = function(e) {
            if (e.propertyName === 'max-height') {
                allJobCards.forEach(card => {
                    card.classList.remove('hide-when-other-active', 'expanded');
                    // Remove navigation buttons if present
                    const nav = card.querySelector('.exp-nav');
                    if (nav) nav.remove();
                });
                details.removeEventListener('transitionend', onTransitionEnd);
                // Scroll back to the header position
                header.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        };
        details.addEventListener('transitionend', onTransitionEnd);
    }
}

function navigateExperience(currentCard, direction) {
    const allJobCards = Array.from(document.querySelectorAll('.job-card'));
    const currentIndex = allJobCards.indexOf(currentCard);
    let newIndex = currentIndex + direction;
    if (newIndex < 0 || newIndex >= allJobCards.length) return; // Prevent out of bounds
    // Collapse current
    const header = currentCard.querySelector('.job-header');
    header.classList.remove('active');
    const details = currentCard.querySelector('.job-details');
    details.style.maxHeight = '0';
    details.style.opacity = '0';
    // Remove nav buttons after transition
    const onTransitionEnd = function(e) {
        if (e.propertyName === 'max-height') {
            currentCard.classList.remove('hide-when-other-active', 'expanded');
            const nav = details.querySelector('.exp-nav');
            if (nav) nav.remove();
            details.removeEventListener('transitionend', onTransitionEnd);
            // Expand new (immediately show only the new card)
            allJobCards.forEach((card, idx) => {
                if (idx !== newIndex) {
                    card.classList.add('hide-when-other-active');
                } else {
                    card.classList.remove('hide-when-other-active');
                }
            });
            const newHeader = allJobCards[newIndex].querySelector('.job-header');
            toggleJobDetails(newHeader, true);
        }
    };
    details.addEventListener('transitionend', onTransitionEnd);
}

// Education section animation (enhanced for degree cards)
const educationSection = document.querySelector('#education');
const degreeCards = document.querySelectorAll('.degree');

function animateEducationSection() {
    degreeCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('animate');
        }, index * 200);
    });
}

const educationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateEducationSection();
            educationObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
});

if (educationSection) {
    educationObserver.observe(educationSection);
} 