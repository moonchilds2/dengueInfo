document.getElementById('menu-btn').addEventListener('click', function() {
    const menu = document.querySelector('nav ul');
    menu.classList.toggle('active');
});

document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('formulario');
    const mensagemDiv = document.getElementById('mensagem');
    const submitButton = formulario.querySelector('button[type="submit"]');

    formulario.addEventListener('submit', function(e) {
        e.preventDefault();
        submitButton.disabled = true; // Desabilita o botão para evitar múltiplos cliques

        const formData = new FormData(formulario);

        // Exibe indicador de carregamento
        mensagemDiv.innerText = 'Enviando sua denúncia...';
        
        fetch('/enviar', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            mensagemDiv.innerText = 'Sua denúncia foi enviada com sucesso!';
            formulario.reset();
        })
        .catch(error => {
            mensagemDiv.innerText = 'Erro ao enviar a denúncia. Tente novamente mais tarde.';
            console.error('Erro:', error);
        })
        .finally(() => {
            submitButton.disabled = false; // Reabilita o botão após a operação
        });
    });
});
