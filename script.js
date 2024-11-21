// Toggle the mobile navigation menu
document.querySelector('.hamburger').addEventListener('click', () => {
    const navMenu = document.querySelector('nav ul');
    navMenu.classList.toggle('active');
});


// Highlight the current section in the navigation bar
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');

    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 80;
        if (scrollY >= sectionTop) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(currentSection)) {
            link.classList.add('active');
        }
    });
});
