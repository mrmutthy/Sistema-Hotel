function exibirServicos(container) {
    const servicos = JSON.parse(localStorage.getItem('servicos')) || []; // Semicolon added

    container.innerHTML = ''; // Limpa os serviços antigos

    servicos.forEach((servico, index) => {
        const divServico = document.createElement('div');
        divServico.classList.add('servico');
        divServico.innerHTML = `
            <h3>${servico.nome}</h3>
            <p>${servico.descricao}</p>
             ${servico.imagem ? `<img src="${servico.imagem}" alt="Imagem do serviço" width="100">` : ''} 
        `;
        container.appendChild(divServico);
    });
}

function removerServico(index) {
    let servicos = JSON.parse(localStorage.getItem('servicos')) || [];
    servicos.splice(index, 1);
    localStorage.setItem('servicos', JSON.stringify(servicos));

    const servicosContainer = document.getElementById('servicos-container');
    if (servicosContainer) {
        exibirServicos(servicosContainer); // Correct call: pass the element itself
    }
}

document.addEventListener('DOMContentLoaded', () => {
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
});