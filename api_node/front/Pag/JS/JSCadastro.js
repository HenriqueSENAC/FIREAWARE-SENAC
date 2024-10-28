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

// // ShowPSSWRD
function SignInFunction() {
    var x = document.getElementById("senha");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    };
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