document.addEventListener('DOMContentLoaded', () => {
    const listaQuartos = document.getElementById('lista-quartos');
    const formReserva = document.getElementById('form-reserva');
    const nomeQuartoSelecionado = document.getElementById('nome-quarto-selecionado');

    let quartoSelecionado = null;

    // Carrega a lista de quartos do localStorage
    const quartos = JSON.parse(localStorage.getItem('quartos')) || [];

    // Exibe os quartos disponíveis
    function exibirQuartos() {
        listaQuartos.innerHTML = '';
        quartos.forEach((quarto, index) => {
            const quartoItem = document.createElement('div');
            quartoItem.classList.add('quarto-item');
            quartoItem.innerHTML = `
                <h3>${quarto.nome}</h3>
                <p>${quarto.descricao}</p>
               <img src="${quarto.imagem}" alt="${quarto.nome}">
                <p>Preço: R$ ${quarto.preco} /Diária</p>
            `;
            quartoItem.addEventListener('click', () => selecionarQuarto(index));
            listaQuartos.appendChild(quartoItem);
        });
    }

    // Seleciona um quarto
    function selecionarQuarto(index) {
        quartoSelecionado = quartos[index];
        nomeQuartoSelecionado.textContent = quartoSelecionado.nome;
        formReserva.style.display = 'block'; // Mostra o formulário de reserva
    }

    // Formulário de reserva
    formReserva.addEventListener('submit', (event) => {
        event.preventDefault();

        if (!quartoSelecionado) {
            alert('Selecione um quarto antes de reservar.');
            return;
        }

        // Captura os dados do formulário
        const nomeCliente = document.getElementById('nome-cliente').value;
        const dataEntrada = document.getElementById('data-entrada').value;
        const dataSaida = document.getElementById('data-saida').value;

        // Valida as datas
        if (new Date(dataSaida) <= new Date(dataEntrada)) {
            alert('A data de saída deve ser posterior à data de entrada.');
            return;
        }

        // Calcula o preço total da reserva
        const precoTotal = calcularPrecoTotal(quartoSelecionado.preco, dataEntrada, dataSaida);

        // Cria o objeto de reserva
        const reserva = {
            quartoIndex: quartos.indexOf(quartoSelecionado),
            nomeCliente,
            dataEntrada,
            dataSaida,
            precoTotal
        };

        // Salva a reserva no localStorage
        salvarReserva(reserva);

        // Feedback para o usuário
        alert('Reserva realizada com sucesso!');
        window.location.href = '../pgprincipal.html'; // Redireciona para a página principal
    });

    // Função para calcular o preço total da reserva
    function calcularPrecoTotal(precoDiaria, dataEntrada, dataSaida) {
        const diffTime = Math.abs(new Date(dataSaida) - new Date(dataEntrada));
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Diferença em dias
        return precoDiaria * diffDays;
    }

    // Função para salvar a reserva no localStorage
    function salvarReserva(reserva) {
        const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
        reservas.push(reserva);
        localStorage.setItem('reservas', JSON.stringify(reservas));
        window.localStorage.setItem('atualizarReservas', 'true'); // Sinaliza para o admin atualizar a lista
    }

    // Exibe os quartos ao carregar a página
    exibirQuartos();
});