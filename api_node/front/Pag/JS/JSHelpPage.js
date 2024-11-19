document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.searchEngine');
    const cards = document.querySelectorAll('.card');

    // Evento para ativar a pesquisa em tempo real
    searchInput.addEventListener('input', () => {
        const searchQuery = searchInput.value.toLowerCase();

        cards.forEach(card => {
            const cardTitle = card.querySelector('.card-header').textContent.toLowerCase();

            // Verifica se o título contém o texto pesquisado
            if (cardTitle.includes(searchQuery)) {
                card.style.display = 'block'; // Exibe o card
            } else {
                card.style.display = 'none'; // Oculta o card
            }
        });
    });

    // Dropdown funcionalidade (opcional)
    const headers = document.querySelectorAll('.card-header');
    headers.forEach(header => {
        header.addEventListener('click', () => {
            const cardContent = header.nextElementSibling;

            // Alterna a visibilidade do conteúdo
            if (cardContent.style.display === 'block') {
                cardContent.style.display = 'none';
            } else {
                cardContent.style.display = 'block';
            }
        });
    });
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
