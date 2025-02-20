
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


function exibirFotos() {
    const galeriaFotos = document.querySelector('.galeria-fotos');
    const fotos = JSON.parse(localStorage.getItem('fotos')) || [];

    galeriaFotos.innerHTML = '';

    fotos.forEach((foto) => {
        const imgElement = document.createElement('img');
        imgElement.src = foto.imagem;
        imgElement.alt = 'Foto do hotel';
        galeriaFotos.appendChild(imgElement);
    });
}


document.addEventListener('DOMContentLoaded', () => {
    exibirServicos();
    exibirQuartos();
    exibirFotos();
});

document.addEventListener('DOMContentLoaded', () => {
    exibirFotos();

    
});


document.addEventListener('DOMContentLoaded', () => {
    exibirServicos();
    exibirQuartos();
    exibirFotos();

  
    const linkLocalizacao = document.getElementById('link-localizacao');
    const secaoLocalizacao = document.getElementById('localizacao');

    if (linkLocalizacao && secaoLocalizacao) {
        linkLocalizacao.addEventListener('click', (event) => {
            event.preventDefault(); 
            secaoLocalizacao.scrollIntoView({ behavior: 'smooth' }); 
        });
    }
});