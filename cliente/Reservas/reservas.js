document.addEventListener('DOMContentLoaded', () => {
    const listaQuartos = document.getElementById('lista-quartos');
    const formReserva = document.getElementById('form-reserva');
    const nomeQuartoSelecionado = document.getElementById('nome-quarto-selecionado');

    let quartoSelecionado = null;

   
    const quartos = JSON.parse(localStorage.getItem('quartos')) || [];

   
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

    
    function selecionarQuarto(index) {
        quartoSelecionado = quartos[index];
        nomeQuartoSelecionado.textContent = quartoSelecionado.nome;
        formReserva.style.display = 'block'; 
    }

    
    formReserva.addEventListener('submit', (event) => {
        event.preventDefault();

        if (!quartoSelecionado) {
            alert('Selecione um quarto antes de reservar.');
            return;
        }

       
        const nomeCliente = document.getElementById('nome-cliente').value;
        const dataEntrada = document.getElementById('data-entrada').value;
        const dataSaida = document.getElementById('data-saida').value;

       
        if (new Date(dataSaida) <= new Date(dataEntrada)) {
            alert('A data de saída deve ser posterior à data de entrada.');
            return;
        }

        
        const precoTotal = calcularPrecoTotal(quartoSelecionado.preco, dataEntrada, dataSaida);

        
        const reserva = {
            quartoIndex: quartos.indexOf(quartoSelecionado),
            nomeCliente,
            dataEntrada,
            dataSaida,
            precoTotal
        };

        
        salvarReserva(reserva);

        
        alert('Reserva realizada com sucesso!');
        window.location.href = '../pgprincipal.html';
    });

    
    function calcularPrecoTotal(precoDiaria, dataEntrada, dataSaida) {
        const diffTime = Math.abs(new Date(dataSaida) - new Date(dataEntrada));
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        return precoDiaria * diffDays;
    }

    
    function salvarReserva(reserva) {
        const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
        reservas.push(reserva);
        localStorage.setItem('reservas', JSON.stringify(reservas));
        window.localStorage.setItem('atualizarReservas', 'true'); 
    }

    
    exibirQuartos();
});