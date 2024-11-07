// Carrossel
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

// Insersão dos produtos
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('http://localhost:3005/api/get/catalog');
    const result = await response.json();

    console.log(result);

    if (result.success) {
      const cardWrapper = document.querySelector('.card-wrapper');
      const renderCatalog = (catalogData) => {
        cardWrapper.innerHTML = '';
        const cardList = document.createElement('ul');
        cardList.className = 'card-list';
        
        catalogData.slice(0, 4).forEach(catalog => {
          const cardItem = document.createElement('li');
          cardItem.className = 'card-item swiper-slide';
          
          const cardLink = document.createElement('a');
          cardLink.className = 'card-link';
          cardLink.href = 'CatalogLista.html';

          const img = document.createElement('img');
          img.src = `http://localhost:3005/uploads/${catalog.item_img}`;
          img.alt = catalog.item_name;
          img.className = 'card-image';

          const title = document.createElement('h2');
          title.className = 'card-title';
          title.textContent = catalog.item_name;

          const status = document.createElement('h5');
          status.textContent = 'DISPONIVEL';

          cardLink.appendChild(img);
          cardLink.appendChild(title);
          cardLink.appendChild(status);
          cardItem.appendChild(cardLink);
          cardList.appendChild(cardItem);
        });
        cardWrapper.appendChild(cardList);
      };
      renderCatalog(result.data);
    } else {
      console.log('Erro ao carregar os dados:', result.message);
    }
  } catch (err) {
    console.log('Erro ao carregar os dados:', err);
  }
});

// Mapa interativo
const map = L.map('map').setView([-29.796523747827955, -51.15286481646456], 16);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(map);
const markerData = [
  { coords: [-29.803457948306125, -51.1562964548087], popup: "<b>INSTALFIRE</b><br>Soluções contra Incêndio." },
  { coords: [-29.811872626822254, -51.147364946097696], popup: "<b>Projetos EVITARE</b><br>Serviços de prevenção contra Incêndio" },
  { coords: [-29.78014249567775, -51.141013475297676], popup: "<b>GURI</b><br>Sistemas Contra Incêndio" },
  { coords: [-29.782322740493512, -51.128869065003016], popup: "<b>ECI-Equipamentos</b><br>Loja de equipamentos contra Incêndio" },
  { coords: [-29.81866924122059, -51.16079807495008], popup: "<b>Sul Brasil Extintores</b><br>Loja de equipamentos contra Incêndio" }
];
markerData.forEach(({ coords, popup }) => {
  L.marker(coords).addTo(map).bindPopup(popup);
});

// Função para deslogar o usuário
function logout() {
  localStorage.removeItem('userLoggedIn');
  window.location.replace("Login.html");
}

// Função para exibir/ocultar os botões de acordo com o login
function LogButtons() {
  const userLoggedIn = localStorage.getItem('userLoggedIn');
  document.getElementById('btnProfile').style.display = userLoggedIn ? 'flex' : 'none';
  document.getElementById('btnSair').style.display = userLoggedIn ? 'flex' : 'none';
  document.getElementById('btnEntrar').style.display = userLoggedIn ? 'none' : 'flex';
  document.getElementById('LoginWarning').style.display = userLoggedIn ? 'none' : 'flex';
}

// Chama LogButtons ao carregar a página para ajustar os botões
document.addEventListener('DOMContentLoaded', LogButtons);
