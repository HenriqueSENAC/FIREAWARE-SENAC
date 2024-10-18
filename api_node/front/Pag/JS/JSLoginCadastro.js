// Cadastro
async function cadastrar(event) {
    event.preventDefault();

    let email = document.getElementById("email").value;
    let senha = document.getElementById("senha").value;
    let senhaAuth = document.getElementById("senhaAuth").value;
    let cel = document.getElementById("cel").value;

    if (email.trim() === '' || senha.trim() === '' || cel.trim() === '') {
        alert('Porfavor preencha os campos necessários!');
    } else {
        if (senhaAuth.trim() != senha.trim()) {
            PSWarningSignin();
        } else {
            let data = { email, senha, cel }
            const response = await fetch('http://localhost:3005/api/store/user', {
                method: "POST",
                headers: { "Content-type": "application/json;charset=UTF-8" },
                body: JSON.stringify(data)

            });
        }
    }
}



// Login
let button = document.getElementById("handleSubmit");

button.onclick = async function (e) {
    e.preventDefault();

    let email = document.getElementById("emailLogin").value;
    let senha = document.getElementById("senhaLogin").value;


    if (email.trim() === '' || senha.trim() === '') {
        alert('Credenciais incorretas');
    } else {
        let data = { email, senha }

        const response = await fetch('http://localhost:3005/api/auth/login', {
            method: "POST",
            headers: { "Content-type": "application/json;charset=UTF-8" },
            body: JSON.stringify(data)
        });

        let content = await response.json();

        if (content.success) {
            alert("Login feito");
            // Aqui vamos salvar uma flag indicando que o usuário está logado
            localStorage.setItem('userLoggedIn', 'true'); // ou você pode salvar um token se o seu backend fornecer
            window.location.replace("../MainPage.html")
        } else {
            PSWarningLogin();
        }
        
    }
}


// ShowPSSWRD
// Card Cadastro
function SignInFunction() {
    var x = document.getElementById("senha");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    };
};

// Card Login
function LoginFunction() {
    var x = document.getElementById("senhaLogin");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
};

// PasswordAlerts
function PSWarningLogin() {
    var Warning = document.getElementById('error-login');
    if (Warning.style.display === 'none') {
        Warning.style.display = 'block';
        setTimeout(function () {
            Warning.style.display = 'none';
        }, 5000);
    } else {
        Warning.style.display = 'none';
    }
};

function PSWarningSignin() {
    var Warning = document.getElementById('error-signin');
    if (Warning.style.display === 'none') {
        Warning.style.display = 'block';
        setTimeout(function () {
            Warning.style.display = 'none';
        }, 5000);
    } else {
        Warning.style.display = 'none';
    }
};
