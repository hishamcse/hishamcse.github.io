/*----------------------- Menu Fade animation -------------------------*/

const navBar = document.querySelector('.navbar');
const fadeNav = function (e) {
    if (e.target.classList.contains('nav-link')) {
        const link = e.target;
        const siblings = link.closest('.navbar').querySelectorAll('.nav-link');
        const brand = link.closest('.navbar').querySelector('.navbar-brand');

        siblings.forEach(sibling => {
            if (sibling !== link) sibling.style.opacity = this;
        });
        brand.style.opacity = this;
    }
};

navBar.addEventListener('mouseover', fadeNav.bind(0.5));
navBar.addEventListener('mouseout', fadeNav.bind(1));