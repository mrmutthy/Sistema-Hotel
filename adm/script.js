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
