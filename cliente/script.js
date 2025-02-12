document.addEventListener('DOMContentLoaded', () => {
    const listaQuartos = document.getElementById('lista-quartos');
    const quartos = JSON.parse(localStorage.getItem('quartos')) || [];

    function criarQuartoElemento(quarto) {
        const quartoDiv = document.createElement('div');
        quartoDiv.classList.add('quarto');
        quartoDiv.innerHTML = `
            <img src="${quarto.imagem}" alt="${quarto.nome}">
            <h3>${quarto.nome}</h3>
            <p>${quarto.descricao}</p>
            <p>Preço: R$ ${quarto.preco} /Diária</p>
        `;
        return quartoDiv;
    }

    function exibirQuartos() {
        listaQuartos.innerHTML = ''; 

        quartos.forEach(quarto => {
            const quartoElemento = criarQuartoElemento(quarto);
            listaQuartos.appendChild(quartoElemento);
        });
    }

    exibirQuartos();


    const servicosContainer = document.getElementById('servicos-container');
    const servicos = JSON.parse(localStorage.getItem('servicos')) || [];

    function exibirServicos() {
        servicosContainer.innerHTML = '';

        servicos.forEach(servico => {
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

    exibirServicos();


    const linkLocalizacao = document.getElementById('link-localizacao');
    const secaoLocalizacao = document.getElementById('localizacao');

    linkLocalizacao.addEventListener('click', (event) => {
        event.preventDefault(); // Impede o comportamento padrão do link

        secaoLocalizacao.scrollIntoView({
            behavior: 'smooth' // Faz a rolagem suave
        });
    });
});
