// // Login
let button = document.getElementById("handleSubmit");
button.onclick = async function (e) {
    e.preventDefault();

    let email = document.getElementById("emailLogin").value;
    let senha = document.getElementById("senhaLogin").value;


    if (email.trim() === '' || senha.trim() === '') {
        NoCredentials();
    } else {
        let data = { email, senha }

        const response = await fetch('http://localhost:3005/api/auth/login', {
            method: "POST",
            headers: { "Content-type": "application/json;charset=UTF-8" },
            body: JSON.stringify(data)
        });

        let content = await response.json();

        if (content.success) {
            // Aqui vamos salvar uma flag indicando que o usuário está logado
            localStorage.setItem('userLoggedIn', 'true'); // ou você pode salvar um token se o seu backend fornecer
            window.location.replace("MainPage.html")
        } else {
            PSWarningLogin();
        }
        
    }
}


// // ShowPSSWRD
// // Card Login
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

function NoCredentials() {
    var Warning3 = document.getElementById('alert-credential-signin');
    if (Warning3.style.display === 'none') {
        Warning3.style.display = 'block';
        setTimeout(function () {
            Warning3.style.display = 'none';
        }, 5000);
    } else {
        Warning3.style.display = 'none';
    }
};