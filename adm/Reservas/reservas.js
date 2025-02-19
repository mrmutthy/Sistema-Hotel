window.addEventListener('storage', (event) => {
    if (event.key === 'atualizarReservas') {
        exibirReservas(); // Atualiza a lista de reservas
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const reservasContainer = document.getElementById('reservas-container');

    // Carrega as reservas do localStorage
    const reservas = JSON.parse(localStorage.getItem('reservas')) || [];

    // Carrega a lista de quartos do localStorage
    const quartos = JSON.parse(localStorage.getItem('quartos')) || [];

    // Exibe as reservas na página
    function exibirReservas() {
        console.log("Chamando exibirReservas()");
    
        const reservasContainer = document.getElementById('reservasContainer'); // Verifique se o ID está correto no HTML
        reservasContainer.innerHTML = ''; // Limpa a lista antes de exibir novamente
    
        const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
        console.log("Dados das reservas carregados:", reservas);
    
        reservas.forEach((reserva, index) => {
            console.log(`Exibindo reserva ${index + 1}:`, reserva); // Log para verificação
    
            const reservaItem = document.createElement('div');
            reservaItem.classList.add('reserva-item');
            reservaItem.innerHTML = `
                <h3>Reserva de ${reserva.nomeCliente}</h3>
                <p><strong>Data de Entrada:</strong> ${reserva.dataEntrada}</p>
                <p><strong>Data de Saída:</strong> ${reserva.dataSaida}</p>
                <p><strong>Preço Total:</strong> R$ ${reserva.precoTotal}</p>
                <button class="botao-remover" onclick="removerReserva(${index})">Remover</button>
            `;
            reservasContainer.appendChild(reservaItem);
        });
    }
    

    // Função para remover uma reserva
    window.removerReserva = (index) => {
        
            reservas.splice(index, 1); // Remove a reserva do array
            localStorage.setItem('reservas', JSON.stringify(reservas)); // Atualiza o localStorage
            exibirReservas(); // Recarrega a lista de reservas
        
    };

    // Exibe as reservas ao carregar a página
    exibirReservas();
});