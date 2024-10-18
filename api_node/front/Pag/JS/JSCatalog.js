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
