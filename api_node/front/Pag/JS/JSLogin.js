// JSLogin.js

// Função de login
let button = document.getElementById("handleSubmit");
button.onclick = async function (e) {
    e.preventDefault();

    let email = document.getElementById("emailLogin").value;
    let senha = document.getElementById("senhaLogin").value;

    if (email.trim() === '' || senha.trim() === '') {
        NoCredentials();
    } else {
        let data = { email, senha };

        try {
            const response = await fetch('http://localhost:3005/api/auth/login', {
                method: "POST",
                headers: { "Content-type": "application/json;charset=UTF-8" },
                body: JSON.stringify(data)
            });

            let content = await response.json();
            let dadosUsuario = JSON.parse(content.data)[0]

            if (content.success) {
                
                localStorage.setItem('userLoggedIn', 'true'); // Flag para indicar que o usuário está logado
                // localStorage.setItem('dadosUsuario', dadosUsuario)
                localStorage.setItem('userEmail', email);
                localStorage.setItem('userPass', senha);
                window.location.replace("MainPage.html");
            } else {
                PSWarningLogin();
            }
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            PSWarningLogin();
        }
    }
};

// Função para mostrar/esconder senha
function LoginFunction() {
    var x = document.getElementById("senhaLogin");
    x.type = x.type === "password" ? "text" : "password";
}

// Função para exibir alerta de erro de login
function PSWarningLogin() {
    var Warning = document.getElementById('error-login');
    if (Warning.style.display === 'none') {
        Warning.style.display = 'block';
        setTimeout(() => Warning.style.display = 'none', 5000);
    } else {
        Warning.style.display = 'none';
    }
}

// Função para exibir alerta de credenciais vazias
function NoCredentials() {
    var Warning3 = document.getElementById('alert-credential-signin');
    if (Warning3.style.display === 'none') {
        Warning3.style.display = 'block';
        setTimeout(() => Warning3.style.display = 'none', 5000);
    } else {
        Warning3.style.display = 'none';
    }
}