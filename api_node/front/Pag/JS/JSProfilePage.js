// Seleciona todos os elementos com a classe 'Field'
const infoDisplays = document.querySelectorAll('.Field');
const email = localStorage.getItem("userEmail")
const senha = localStorage.getItem("userPass")
// let usuarioDados = localStorage.getItem("dadosUsuario")

document.addEventListener("DOMContentLoaded", function() {
    // Define os placeholders para cada campo de input

    // Placeholder para o campo de Email
    const emailInput = document.querySelector("#NameForm .edit-input");
    emailInput.placeholder = email;

    // Placeholder para o campo de Senha
    const passwordInput = document.querySelector("#PasswordForm .edit-input");
    passwordInput.placeholder = senha;
})
 
function saveData() {
    let useremail = document.getElementById("emailform").value;
    let userpass = document.getElementById("senhaform").value;

    const updatedData = {
        email: useremail,
        senha: userpass
    };

    console.log(updatedData);

    // Salva no localStorage
    localStorage.setItem("userEmail", useremail);
    localStorage.setItem("userPass", userpass);

    // Atualiza no servidor
    fetch('http://localhost:3005/api/put/user', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
    })
    .then(response => {
        if (!response.ok) throw new Error('Erro ao salvar os dados no servidor');
        return response.json();
    })
    .then(data => {
        console.log('Resposta do servidor:', data);
        alert('Dados salvos com sucesso!');
    })
    .catch(error => {
            
        // console.error('Erro:', error);
        // alert('Ocorreu um erro ao salvar os dados.');
    });
}
 
document.getElementById("saveButton").addEventListener("click", saveData);

// Função para deslogar o usuário
function logout() {
    localStorage.removeItem('userLoggedIn');
    window.location.replace("Login.html");
  }