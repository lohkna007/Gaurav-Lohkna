// Toggle the mobile navigation menu
document.querySelector('.hamburger').addEventListener('click', () => {
    const navMenu = document.querySelector('nav ul');
    navMenu.classList.toggle('active');
});
