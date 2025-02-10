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
            <button class="excluir-servico" data-index="${index}">Excluir</button>
        `;
        container.appendChild(divServico);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const formServico = document.getElementById('form-servico');

    if (formServico) {
        formServico.addEventListener('submit', function (event) {
            event.preventDefault();

            const nome = document.getElementById('nome-servico').value;
            const descricao = document.getElementById('descricao-servico').value;
            const imagemInput = document.getElementById('imagem-servico');
            const imagemArquivo = imagemInput.files[0];
            let imagemBase64 = null;

            if (imagemArquivo) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    imagemBase64 = e.target.result;
                    salvarServico(nome, descricao, imagemBase64);
                }
                reader.readAsDataURL(imagemArquivo);
            } else {
                salvarServico(nome, descricao, imagemBase64);
            }
        });
    }

    function salvarServico(nome, descricao, imagem) {
        const servicos = JSON.parse(localStorage.getItem('servicos')) || [];
        servicos.push({ nome, descricao, imagem });
        localStorage.setItem('servicos', JSON.stringify(servicos));

        exibirServicos(document.getElementById('servicos-container'))
        alert('Serviço salvo com sucesso!');
        formServico.reset();
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
});

function removerServico(index) {
    let servicos = JSON.parse(localStorage.getItem('servicos')) || [];
    servicos.splice(index, 1);
    localStorage.setItem('servicos', JSON.stringify(servicos));

    const servicosContainer = document.getElementById('servicos-container');
    if (servicosContainer) {
        exibirServicos(servicosContainer);
    }
}