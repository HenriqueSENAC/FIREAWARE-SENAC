let button = document.getElementById("handleSubmit")

button.onclick = async function() {
    let form = document.getElementById("formulario");
    let dadosForm = new FormData(form);
    
    const response = await fetch('http://localhost:3005/api/store/catalog', {
        method: "POST",
        body: dadosForm
    })

    let content = await response.json();

    if(content.success) {
        alert("Success!")
        e.preventDefault();
        
    } else {
        alert("Não deu certo!!!")
        console.log(content.sql);
        e.preventDefault();
    }
}

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


// ADCIONAR MARCADORES

        // Função para renderizar a lista de marcadores salvos
function renderMarkerList() {
    const markerList = document.getElementById('markerList');
    markerList.innerHTML = ''; // Limpa a lista antes de renderizar

    const markers = JSON.parse(localStorage.getItem('markers')) || [];

    markers.forEach(marker => {
        const listDiv = document.createElement('div');
        listDiv.className = "MarkerDiv";

        const listItem = document.createElement('li');
        listItem.className = "NewMarker";

        const RemoveBtnBox = document.createElement('div');
        RemoveBtnBox.className = "BtnBox";

        // Extrai o nome do estabelecimento do campo popup
        const estabelecimentoMatch = marker.popup.match(/<b>(.*?)<\/b>/);
        const estabelecimento = estabelecimentoMatch ? estabelecimentoMatch[1] : 'Sem nome';

        listItem.textContent = estabelecimento; // Exibe apenas o nome do estabelecimento

        // Botão de remoção para cada marcador
        const removeButton = document.createElement('button');
        removeButton.className = "RemoveBtn";
        removeButton.textContent = 'Remover';
        removeButton.onclick = () => removeMarker(marker.id);

        listItem.appendChild(RemoveBtnBox);
        RemoveBtnBox.appendChild(removeButton)
        listDiv.appendChild(listItem)
        markerList.appendChild(listDiv);
    });
}


document.getElementById('addMarkerForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const latitude = parseFloat(document.getElementById('latitude').value);
    const longitude = parseFloat(document.getElementById('longitude').value);
    const estabelecimento = document.getElementById('estabelecimento').value;
    const descricao = document.getElementById('description').value;

    const newMarker = { latitude, longitude, estabelecimento, descricao };

    try {
        const response = await fetch('http://localhost:3005/api/markers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newMarker),
        });
        const result = await response.json();

        if (result.success) {
            alert('Marcador adicionado com sucesso!');
            renderMarkerList(); // Atualizar lista
        } else {
            alert('Erro ao adicionar marcador');
        }
    } catch (err) {
        console.error('Erro:', err);
    }
});

async function renderMarkerList() {
    const markerList = document.getElementById('markerList');
    markerList.innerHTML = '';

    try {
        const response = await fetch('http://localhost:3005/api/markers');
        const result = await response.json();

        if (result.success) {
            result.data.forEach(marker => {
                const listDiv = document.createElement('div');
                listDiv.className = "MarkerDiv";

                const listItem = document.createElement('li');
                listItem.className = "NewMarker";
                listItem.textContent = marker.estabelecimento;

                const removeButton = document.createElement('button');
                removeButton.className = "RemoveBtn";
                removeButton.textContent = 'Remover';
                removeButton.onclick = () => removeMarker(marker.id);

                listDiv.appendChild(listItem);
                listItem.appendChild(removeButton);
                markerList.appendChild(listDiv);
            });
        }
    } catch (err) {
        console.error('Erro ao carregar marcadores:', err);
    }
}

async function removeMarker(id) {
    try {
        const response = await fetch(`http://localhost:3005/api/markers/${id}`, { method: 'DELETE' });
        const result = await response.json();

        if (result.success) {
            renderMarkerList();
        } else {
            alert('Erro ao remover marcador');
        }
    } catch (err) {
        console.error('Erro ao remover marcador:', err);
    }
}

// Renderizar marcadores ao carregar a página
document.addEventListener('DOMContentLoaded', renderMarkerList);
