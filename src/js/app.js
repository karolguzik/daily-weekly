import '../scss/main.scss';

const toggleMenu = () => {
  document.querySelector('.menu').classList.toggle("menu--isActive");
}


document.querySelector('.menu__handle').addEventListener('click', toggleMenu);