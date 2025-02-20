document.addEventListener('DOMContentLoaded', () => {
    const listaQuartos = document.getElementById('lista-quartos');
    const quartos = JSON.parse(localStorage.getItem('quartos')) || [];

    function exibirQuartos() {
        listaQuartos.innerHTML = ''; 

        quartos.forEach(quarto => {
            const quartoDiv = document.createElement('div');
            quartoDiv.classList.add('quarto');

            quartoDiv.innerHTML = `
                <img src="${quarto.imagem}" alt="${quarto.nome}" onerror="this.src='default-image.jpg'">
                <h3>${quarto.nome}</h3>
                <p>${quarto.descricao}</p>
                <p>Preço: R$ ${quarto.preco}</p>
                <a href="../Reservas/reservas.html" class="btn-agendar">Agendar</a>
            `;
            listaQuartos.appendChild(quartoDiv);
        });
    }

    exibirQuartos(); 
});