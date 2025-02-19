document.addEventListener('DOMContentLoaded', () => {
    const formQuarto = document.getElementById('form-quarto');
    const listaQuartos = document.getElementById('quartos-container'); 
    const telaEdicao = document.getElementById('tela-edicao');
    const formEdicao = document.getElementById('form-edicao');
    const cancelarEdicao = document.getElementById('cancelar-edicao');
    let indexQuartoEditando = null;

    exibirQuartos();

    formQuarto.addEventListener('submit', adicionarQuarto);

    function adicionarQuarto(event) {
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
                salvarQuarto(nome, descricao, preco, imagemBase64);
            }
            reader.readAsDataURL(imagemArquivo);
        } else {
            salvarQuarto(nome, descricao, preco, imagemBase64);
        }
    }

    function salvarQuarto(nome, descricao, preco, imagem) {
        const quartos = JSON.parse(localStorage.getItem('quartos')) || [];

        if (indexQuartoEditando !== null) {
            
            const quartoEditado = quartos[indexQuartoEditando];
            const imagemExistente = quartoEditado.imagem;

            if (!imagem) {
                imagem = imagemExistente;
            }

            quartos[indexQuartoEditando] = { nome, descricao, preco, imagem };
            indexQuartoEditando = null;
        } else {
            
            const novoQuarto = { nome, descricao, preco, imagem };
            quartos.push(novoQuarto);
        }

        localStorage.setItem('quartos', JSON.stringify(quartos));
        formQuarto.reset();
        exibirQuartos();
    }

    function exibirQuartos() {
        const quartos = JSON.parse(localStorage.getItem('quartos')) || [];
        listaQuartos.innerHTML = '';
    
        quartos.forEach((quarto, index) => {
            const quartoItem = document.createElement('div');
            quartoItem.classList.add('quarto-item');
            quartoItem.innerHTML = `
                <h3>${quarto.nome}</h3>
                ${quarto.imagem ? `<img src="${quarto.imagem}" alt="Imagem do quarto">` : ''}
                <p>${quarto.descricao}</p>
                <p>Preço: R$ ${quarto.preco}</p>
                <div class="botoes-acao">
                    <button class="botao-editar" onclick="editarQuarto(${index})">Editar</button>
                    <button class="botao-remover" onclick="removerQuarto(${index})">Remover</button>
                </div>
            `;
            listaQuartos.appendChild(quartoItem);
        });
    }

    window.editarQuarto = (index) => {
        const quartos = JSON.parse(localStorage.getItem('quartos')) || [];
        const quarto = quartos[index];

        indexQuartoEditando = index;
        document.getElementById('nome-edicao').value = quarto.nome;
        document.getElementById('descricao-edicao').value = quarto.descricao;
        document.getElementById('preco-edicao').value = quarto.preco;

        telaEdicao.style.display = 'block';
    }

    formEdicao.addEventListener('submit', (event) => {
        event.preventDefault();

        const nome = document.getElementById('nome-edicao').value;
        const descricao = document.getElementById('descricao-edicao').value;
        const preco = document.getElementById('preco-edicao').value;
        const imagemInput = document.getElementById('imagem-edicao');
        const imagemArquivo = imagemInput.files[0];
        let imagemBase64 = null;

        if (imagemArquivo) {
            const reader = new FileReader();
            reader.onload = (e) => {
                imagemBase64 = e.target.result;
                salvarQuarto(nome, descricao, preco, imagemBase64);
            }
            reader.readAsDataURL(imagemArquivo);
        } else {
            salvarQuarto(nome, descricao, preco, imagemBase64);
        }

        telaEdicao.style.display = 'none';
        formEdicao.reset();
    });

    cancelarEdicao.addEventListener('click', () => {
        telaEdicao.style.display = 'none';
        formEdicao.reset();
    });

    window.removerQuarto = (index) => {
        const quartos = JSON.parse(localStorage.getItem('quartos')) || [];
        quartos.splice(index, 1);
        localStorage.setItem('quartos', JSON.stringify(quartos));
        exibirQuartos();
    }
});