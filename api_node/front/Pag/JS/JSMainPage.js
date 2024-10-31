// CARROUSEL

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

// INSERÇÃO
document.addEventListener('DOMContentLoaded', async () => {
  try {
      const response = await fetch('http://localhost:3005/api/get/catalog');
      const result = await response.json();

      console.log(result);

      if (result.success) {
          const cardWrapper = document.querySelector('.card-wrapper');

          // Função para renderizar os produtos em cards pequenos
          const renderCatalog = (catalogData) => {
              cardWrapper.innerHTML = ''; // Limpa a lista antes de renderizar

              // Cria o elemento <ul class="card-list swiper-wrapper">
              const cardList = document.createElement('ul');
              cardList.className = 'card-list swiper-wrapper';

              catalogData.forEach(catalog => {
                  const cardItem = document.createElement('li');
                  cardItem.className = 'card-item swiper-slide';

                  const cardLink = document.createElement('a');
                  cardLink.className = 'card-link';
                  cardLink.href = catalog.item_link;
                  cardLink.target = "_blank"; // Abre o link em uma nova aba

                  const img = document.createElement('img');
                  img.src = `http://localhost:3005/uploads/${catalog.item_img}`;
                  img.alt = catalog.item_name;
                  img.className = 'card-image';

                  const title = document.createElement('h2');
                  title.className = 'card-title';
                  title.textContent = catalog.item_name;

                  const status = document.createElement('h5');
                  status.className = '';
                  status.textContent = 'DISPONIVEL';

                  // Estrutura do card
                  cardLink.appendChild(img);
                  cardLink.appendChild(title);
                  cardLink.appendChild(status);
                  cardItem.appendChild(cardLink);

                  // Adiciona o cardItem à lista cardList
                  cardList.appendChild(cardItem);
              });

              // Adiciona o cardList ao cardWrapper
              cardWrapper.appendChild(cardList);
          };

          // Renderiza todos os itens inicialmente
          renderCatalog(result.data);

      } else {
          console.log('Erro ao carregar os dados:', result.message);
      }
  } catch (err) {
      console.log('Erro ao carregar os dados:', err);
  }
});
