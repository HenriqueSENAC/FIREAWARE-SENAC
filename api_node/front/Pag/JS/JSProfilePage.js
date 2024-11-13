// Seleciona todos os elementos com a classe 'Field'
const infoDisplays = document.querySelectorAll('.Field');

function EditToggle() {
    infoDisplays.forEach((infoDisplay) => {
        if (infoDisplay.style.display === 'flex') {
            // Esconde o elemento .Field
            infoDisplay.style.display = 'none';

            // Cria um novo elemento de input e define o valor atual do .Field como valor do input
            const inputField = document.createElement('input');
            inputField.type = 'text';
            inputField.value = infoDisplay.textContent; // Usa o conteúdo de texto do .Field
            inputField.classList.add('edit-input'); // Classe para estilizar ou identificar os inputs

            // Insere o input na mesma posição do elemento .Field
            infoDisplay.parentNode.insertBefore(inputField, infoDisplay.nextSibling);
        } else {
            // Remove o campo de input, se existir
            const inputField = infoDisplay.nextElementSibling;
            if (inputField && inputField.classList.contains('edit-input')) {
                // Atualiza o conteúdo do .Field com o valor do input
                infoDisplay.textContent = inputField.value;
                
                // Remove o campo de input
                inputField.remove();
            }

            // Mostra o elemento .Field novamente
            infoDisplay.style.display = 'flex';
        }
    });
}
