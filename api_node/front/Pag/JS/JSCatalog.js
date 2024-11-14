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

document.getElementById('addMarkerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const latitude = parseFloat(document.getElementById('latitude').value);
    const longitude = parseFloat(document.getElementById('longitude').value);
    const estabelecimento = document.getElementById('estabelecimento').value;
    const description = document.getElementById('description').value;

    // Novo marcador com o nome do estabelecimento e descrição
    const newMarker = { 
        coords: [latitude, longitude], 
        popup: `<b>${estabelecimento}</b><br>${description}` 
    };

    // Recupera os marcadores existentes no localStorage ou cria uma lista vazia
    let markers = JSON.parse(localStorage.getItem('markers')) || [];
    markers.push(newMarker);
    localStorage.setItem('markers', JSON.stringify(markers));

    alert("Marcador adicionado com sucesso!");
    document.getElementById('addMarkerForm').reset();
});