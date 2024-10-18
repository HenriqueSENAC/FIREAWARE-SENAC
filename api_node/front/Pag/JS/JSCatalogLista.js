document.addEventListener('DOMContentLoaded', async () => { 
    try {
        const response = await fetch('http://localhost:3005/api/get/catalog');
        const result = await response.json();

        console.log(result);

        if (result.success) {
            const catalogList = document.querySelector('.catalog-list');
            const searchInput = document.getElementById('search');

            // Função para renderizar os produtos
            const renderCatalog = (catalogData) => {
                catalogList.innerHTML = ''; // Limpa a lista antes de renderizar
                if (catalogData.length === 0) {
                    // Mensagem caso nenhum item corresponda à pesquisa
                    catalogList.innerHTML = '<p>Nenhum produto encontrado.</p>';
                } else {
                    catalogData.forEach(catalog => {
                        // Cria o card principal
                        const card = document.createElement('div');
                        card.className = 'catalog-card';

                        // Cria e define a imagem
                        const img = document.createElement('img');
                        img.src = `http://localhost:3005/uploads/${catalog.item_img}`;
                        img.alt = catalog.item_name;

                        // Cria a div de informações do card
                        const infoDiv = document.createElement('div');
                        infoDiv.className = 'info';

                        // Adiciona o nome do item
                        const name = document.createElement('h2');
                        name.textContent = catalog.item_name;

                        // Adiciona a descrição do item
                        const description = document.createElement('p');
                        description.className = 'description';
                        description.textContent = catalog.item_description;

                        // Cria o botão "..." para expandir/recolher o texto
                        const expandBtn = document.createElement('button');
                        expandBtn.textContent = "...";
                        expandBtn.className = "expand-btn";

                        expandBtn.addEventListener('click', () => {
                            if (description.classList.contains('expanded')) {
                                description.classList.remove('expanded');
                                expandBtn.textContent = "...";
                            } else {
                                description.classList.add('expanded');
                                expandBtn.textContent = "↑";
                            }
                        });

                        // Adiciona o botão "Veja mais"
                        const buttonsContainer = document.createElement('div');
                        buttonsContainer.className = 'buttons-container';

                        const btn = document.createElement('a');
                        btn.href = catalog.item_link;
                        btn.textContent = "Veja mais";
                        btn.className = "see-more-btn";
                        btn.target = "_blank";
                        buttonsContainer.appendChild(btn);

                        infoDiv.appendChild(name);
                        infoDiv.appendChild(description);
                        infoDiv.appendChild(expandBtn);
                        infoDiv.appendChild(buttonsContainer);
                        card.appendChild(img);
                        card.appendChild(infoDiv);
                        catalogList.appendChild(card);
                    });
                }
            };

            // Renderiza todos os itens inicialmente
            renderCatalog(result.data);

            // Função para filtrar os produtos com base na pesquisa
            const filterCatalog = () => {
                const query = searchInput.value.toLowerCase();
                const filteredData = result.data.filter(catalog => 
                    catalog.item_name.toLowerCase().includes(query) || 
                    catalog.item_description.toLowerCase().includes(query)
                );
                renderCatalog(filteredData);
            };

            // Adiciona evento de input para o campo de pesquisa
            searchInput.addEventListener('input', filterCatalog);

        } else {
            console.log('Erro ao carregar os dados:', result.message);
        }
    } catch (err) {
        console.log('Erro ao carregar os dados:', err);
    }
});

// AuthGuard para proteger páginas
function checkAuth() {
    const userLoggedIn = localStorage.getItem('userLoggedIn');

    if (!userLoggedIn) {
        // Se o usuário não estiver logado, redireciona para a página de login
        window.location.replace("Login.html");
    }
}

// Chame esta função em todas as páginas protegidas
checkAuth();
