document.addEventListener('DOMContentLoaded', () => {
    const listaQuartos = document.getElementById('lista-quartos');
    const quartos = JSON.parse(localStorage.getItem('quartos')) || [];

    function exibirQuartos() {
        listaQuartos.innerHTML = ''; // Limpa a lista antes de exibir os quartos

        quartos.forEach(quarto => {
            const quartoDiv = document.createElement('div');
            quartoDiv.classList.add('quarto');

            quartoDiv.innerHTML = `
                <img src="${quarto.imagem}" alt="${quarto.nome}">
                <h3>${quarto.nome}</h3>
                <p>${quarto.descricao}</p>
                <p>Preço: R$ ${quarto.preco}</p>
                <a href="../Reservas/reservas.html" class="btn-agendar">Agendar</a> </div>
            `;
            listaQuartos.appendChild(quartoDiv);
        });
    }

    exibirQuartos(); // Chama a função para exibir os quartos quando a página carrega
});