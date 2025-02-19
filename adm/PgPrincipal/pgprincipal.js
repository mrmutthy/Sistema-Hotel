function exibirServicos(container) {
    const servicos = JSON.parse(localStorage.getItem('servicos')) || [];

    container.innerHTML = '';

    servicos.forEach((servico, index) => {
        const divServico = document.createElement('div');
        divServico.classList.add('servico-item');
        divServico.innerHTML = `
            <h3>${servico.nome}</h3>
            <p>${servico.descricao}</p>
            ${servico.imagem ? `<img src="${servico.imagem}" alt="Imagem do serviço" width="100">` : ''} 
        `;
        container.appendChild(divServico);
    });
}


function exibirQuartos() {
    const listaQuartos = document.getElementById('lista-quartos');
    const quartos = JSON.parse(localStorage.getItem('quartos')) || [];

    listaQuartos.innerHTML = '';

    quartos.forEach((quarto, index) => {
        const quartoItem = document.createElement('div');
        quartoItem.classList.add('quarto-item');
        quartoItem.innerHTML = `
            <h3>${quarto.nome}</h3>
            <img src="${quarto.imagem}" alt="Imagem do quarto">
            <p>${quarto.descricao}</p>
            <p>Preço: R$ ${quarto.preco}</p>
        `;
        listaQuartos.appendChild(quartoItem);
    });
}


function exibirFotos() {
    const galeria = document.querySelector('.galeria');
    const fotos = JSON.parse(localStorage.getItem('fotos')) || [];

    galeria.innerHTML = ''; 

    fotos.forEach((foto) => {
        const imgElement = document.createElement('img');
        imgElement.src = foto.imagem;
        imgElement.alt = 'Foto do hotel';
        galeria.appendChild(imgElement);
    });
}


document.addEventListener('DOMContentLoaded', () => {
    const servicosContainer = document.getElementById('servicos-container');
    if (servicosContainer) {
        exibirServicos(servicosContainer);
    }

    exibirQuartos();
    exibirFotos();
});

// Função para exibir as reservas
function exibirReservas() {
    const listaReservas = document.getElementById('lista-reservas');
    const reservas = JSON.parse(localStorage.getItem('reservas')) || [];

    listaReservas.innerHTML = ''; // Limpa a lista antes de adicionar as reservas

    reservas.forEach((reserva, index) => {
        const reservaItem = document.createElement('div');
        reservaItem.classList.add('reserva-item');
        reservaItem.innerHTML = `
            <h3>Reserva ${index + 1}</h3>
            <p><strong>Cliente:</strong> ${reserva.nomeCliente}</p>
            <p><strong>Quarto:</strong> ${reserva.nomeQuarto}</p>
            <p><strong>Preço:</strong> R$ ${reserva.precoQuarto}</p>
            <p><strong>Entrada:</strong> ${reserva.dataEntrada}</p>
            <p><strong>Saída:</strong> ${reserva.dataSaida}</p>
        `;
        listaReservas.appendChild(reservaItem);
    });
}

// Chamada da função ao carregar a página
document.addEventListener('DOMContentLoaded', exibirReservas);