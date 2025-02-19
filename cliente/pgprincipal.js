// Função para exibir os serviços
function exibirServicos() {
    const servicosContainer = document.getElementById('servicos-container');
    const servicos = JSON.parse(localStorage.getItem('servicos')) || [];

    servicosContainer.innerHTML = '';

    servicos.forEach((servico) => {
        const divServico = document.createElement('div');
        divServico.classList.add('servico');
        divServico.innerHTML = `
            <h3>${servico.nome}</h3>
            <p>${servico.descricao}</p>
            ${servico.imagem ? `<img src="${servico.imagem}" alt="Imagem do serviço" width="100">` : ''} 
        `;
        servicosContainer.appendChild(divServico);
    });
}

// Função para exibir os quartos
function exibirQuartos() {
    const listaQuartos = document.getElementById('lista-quartos');
    const quartos = JSON.parse(localStorage.getItem('quartos')) || [];

    listaQuartos.innerHTML = '';

    quartos.forEach((quarto) => {
        const quartoDiv = document.createElement('div');
        quartoDiv.classList.add('quarto');
        quartoDiv.innerHTML = `
            <img src="${quarto.imagem}" alt="${quarto.nome}">
            <h3>${quarto.nome}</h3>
            <p>${quarto.descricao}</p>
            <p>Preço: R$ ${quarto.preco} /Diária</p>
        `;
        listaQuartos.appendChild(quartoDiv);
    });
}

// Função para exibir as fotos na galeria
function exibirFotos() {
    const galeriaFotos = document.querySelector('.galeria-fotos');
    const fotos = JSON.parse(localStorage.getItem('fotos')) || [];

    galeriaFotos.innerHTML = ''; // Limpa a galeria antes de adicionar as fotos

    fotos.forEach((foto) => {
        const imgElement = document.createElement('img');
        imgElement.src = foto.imagem;
        imgElement.alt = 'Foto do hotel';
        galeriaFotos.appendChild(imgElement);
    });
}

// Chamada das funções ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    exibirServicos();
    exibirQuartos();
    exibirFotos();
});

// Chamada da função para exibir as fotos ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    exibirFotos();

    // Restante do seu código (exibir quartos, serviços, etc.)
});

// Chamada das funções ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    exibirServicos();
    exibirQuartos();
    exibirFotos();

    // Evento para rolar suavemente até a localização
    const linkLocalizacao = document.getElementById('link-localizacao');
    const secaoLocalizacao = document.getElementById('localizacao');

    if (linkLocalizacao && secaoLocalizacao) {
        linkLocalizacao.addEventListener('click', (event) => {
            event.preventDefault(); // Impede o comportamento padrão do link
            secaoLocalizacao.scrollIntoView({ behavior: 'smooth' }); // Faz a rolagem suave
        });
    }
});