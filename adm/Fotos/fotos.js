document.addEventListener('DOMContentLoaded', () => {
    const formFoto = document.getElementById('form-foto');
    const fotosContainer = document.getElementById('fotos-container');

    exibirFotos();

    formFoto.addEventListener('submit', (event) => {
        event.preventDefault();

        const imagemInput = document.getElementById('imagem-foto');
        const imagemArquivo = imagemInput.files[0];

        if (imagemArquivo) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const imagemBase64 = e.target.result;
                salvarFoto(imagemBase64);
            }
            reader.readAsDataURL(imagemArquivo);
        }
    });

    function salvarFoto(imagem) {
        const fotos = JSON.parse(localStorage.getItem('fotos')) || [];
        fotos.push({ imagem });
        localStorage.setItem('fotos', JSON.stringify(fotos));

        exibirFotos();
        formFoto.reset();
    }

    function exibirFotos() {
        const fotos = JSON.parse(localStorage.getItem('fotos')) || [];
        fotosContainer.innerHTML = '';

        fotos.forEach((foto, index) => {
            const fotoItem = document.createElement('div');
            fotoItem.classList.add('foto-item');
            fotoItem.innerHTML = `
                <img src="${foto.imagem}" alt="Foto do hotel">
                <button class="excluir-foto" data-index="${index}">Remover</button>
            `;
            fotosContainer.appendChild(fotoItem);
        });
    }

    fotosContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('excluir-foto')) {
            const index = event.target.dataset.index;
            removerFoto(index);
        }
    });

    function removerFoto(index) {
        const fotos = JSON.parse(localStorage.getItem('fotos')) || [];
        fotos.splice(index, 1);
        localStorage.setItem('fotos', JSON.stringify(fotos));
        exibirFotos();
    }
});