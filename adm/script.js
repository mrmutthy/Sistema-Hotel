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
            <button class="excluir-servico" data-index="${index}">Remover</button>
        `;
        container.appendChild(divServico);
    });
}
const servicosContainer = document.getElementById('servicos-container');

if (servicosContainer) {
    exibirServicos(servicosContainer);

    servicosContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('excluir-servico')) {
            const index = event.target.dataset.index;
            removerServico(index);
        }
    });
}

function removerServico(index) {
let servicos = JSON.parse(localStorage.getItem('servicos')) || [];
servicos.splice(index, 1);
localStorage.setItem('servicos', JSON.stringify(servicos));

const servicosContainer = document.getElementById('servicos-container');
if (servicosContainer) {
    exibirServicos(servicosContainer);
}
}

function exibirQuartos() {
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
            <button onclick="removerQuarto(${index})">Remover</button>
        `;
        listaQuartos.appendChild(quartoItem);
    });
    
}
const listaQuartos = document.getElementById('lista-quartos');
const quartos = JSON.parse(localStorage.getItem('quartos')) || [];

    exibirQuartos();



window.removerQuarto = (index) => {
    const quartos = JSON.parse(localStorage.getItem('quartos')) || [];
    quartos.splice(index, 1);
    localStorage.setItem('quartos', JSON.stringify(quartos));
    exibirQuartos();
}