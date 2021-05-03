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

/*--------------------- Reveal Elements on scroll -------------------*/

const sections = document.querySelectorAll('.row');

const revealObserverCallBack = (entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        entry.target.classList.remove('row--hidden');
        observer.unobserve(entry.target);                  // as we don't need them after revealing once
    });
};

const revealObserverOptions = {
    root: null,
    threshold: 0.1
};

const revealObserver = new IntersectionObserver(revealObserverCallBack, revealObserverOptions);
sections.forEach(section => {
    section.classList.add('row--hidden');
    revealObserver.observe(section);
});

/*--------------------- Reveal Connect Link on hover -------------------*/

const footer_link = document.querySelector('.footer__link');

document.querySelector('.footer__p').addEventListener('mouseover', e => {
    if (e.target.classList.contains('bi')) {
        footer_link.classList.remove('hidden');
        footer_link.textContent = e.target.closest('a').getAttribute('href');
    } else {
        footer_link.classList.add('hidden');
    }
});