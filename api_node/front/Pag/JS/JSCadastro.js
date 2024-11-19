// Cadastro
async function cadastrar(event) {
    event.preventDefault();

    let email = document.getElementById("email").value;
    let senha = document.getElementById("senha").value;
    let senhaAuth = document.getElementById("senhaAuth").value;
    let cel = document.getElementById("cel").value;

    if (email.trim() === '' || senha.trim() === '' || cel.trim() === '') {
        NoCredentials();
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
               console.log(response.status);
               if(response.status == 201){
                   window.location.replace("Login.html");
               } else if (response.status == 500) {
                EMailWarningSignin();
               }
        }
    }
}

// // ShowPSSWRD
function SignInFunction() {
    let x = document.getElementById("senha");
    let y = document.getElementById("senhaAuth");
    x.type = x.type === "password" ? "text" : "password";
    y.type = y.type === "password" ? "text" : "password";
}
    

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

function EMailWarningSignin() {
    var Warning2 = document.getElementById('error-email-signin');
    if (Warning2.style.display === 'none') {
        Warning2.style.display = 'flex';
        setTimeout(function () {
            Warning2.style.display = 'none';
        }, 5000);
    } else {
        Warning2.style.display = 'none';
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