document.addEventListener('DOMContentLoaded', () => {
    const formQuarto = document.getElementById('form-quarto');
    const listaQuartos = document.getElementById('lista-quartos');

    exibirQuartos();

    formQuarto.addEventListener('submit', (event) => {
        event.preventDefault();

        const nome = document.getElementById('nome-quarto').value;
        const descricao = document.getElementById('descricao-quarto').value;
        const preco = document.getElementById('preco-quarto').value;
        const imagemInput = document.getElementById('imagem-quarto');
        const imagemArquivo = imagemInput.files[0];
        let imagemBase64 = null;

        if (imagemArquivo) {
            const reader = new FileReader();
            reader.onload = (e) => {
                imagemBase64 = e.target.result;
                adicionarQuarto(nome, descricao, preco, imagemBase64);
            }
            reader.readAsDataURL(imagemArquivo);
        } else {
            adicionarQuarto(nome, descricao, preco, imagemBase64);
        }
    });

    function adicionarQuarto(nome, descricao, preco, imagem, comodidades) {
        const quartos = JSON.parse(localStorage.getItem('quartos')) || [];
        const novoQuarto = {
            nome,
            descricao,
            preco,
            imagem
        };
        quartos.push(novoQuarto);
        localStorage.setItem('quartos', JSON.stringify(quartos));
    
        formQuarto.reset();
        exibirQuartos(); // Atualiza a lista de quartos no painel admin após adicionar um novo quarto
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

    window.removerQuarto = (index) => {
        const quartos = JSON.parse(localStorage.getItem('quartos')) || [];
        quartos.splice(index, 1);
        localStorage.setItem('quartos', JSON.stringify(quartos));
        exibirQuartos();
    }
});