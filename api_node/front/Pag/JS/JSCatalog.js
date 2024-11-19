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


// Função para adicionar um novo marcador ao localStorage
document.getElementById('addMarkerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const latitude = parseFloat(document.getElementById('latitude').value);
    const longitude = parseFloat(document.getElementById('longitude').value);
    const estabelecimento = document.getElementById('estabelecimento').value;
    const description = document.getElementById('description').value;

    // Cria um ID único para o marcador
    const id = Date.now();

    const newMarker = { 
        id, 
        coords: [latitude, longitude], 
        popup: `<b>${estabelecimento}</b><br>${description}` 
    };

    // Salva o novo marcador no localStorage
    let markers = JSON.parse(localStorage.getItem('markers')) || [];
    markers.push(newMarker);
    localStorage.setItem('markers', JSON.stringify(markers));

    alert("Marcador adicionado com sucesso!");
    document.getElementById('addMarkerForm').reset();

    renderMarkerList(); // Atualiza a lista de marcadores
});

// Função para remover um marcador específico pelo ID
function removeMarker(id) {
    let markers = JSON.parse(localStorage.getItem('markers')) || [];
    markers = markers.filter(marker => marker.id !== id); // Remove o marcador com o ID correspondente
    localStorage.setItem('markers', JSON.stringify(markers));

    renderMarkerList(); // Atualiza a lista após a remoção
}

// Chama renderMarkerList ao carregar a página para exibir os marcadores salvos
document.addEventListener('DOMContentLoaded', renderMarkerList);