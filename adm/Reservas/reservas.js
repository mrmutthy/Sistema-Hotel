window.addEventListener('storage', (event) => {
    if (event.key === 'atualizarReservas') {
        exibirReservas(); 
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const reservasContainer = document.getElementById('reservas-container');

 
    const reservas = JSON.parse(localStorage.getItem('reservas')) || [];

  
    const quartos = JSON.parse(localStorage.getItem('quartos')) || [];

   
    function exibirReservas() {
        console.log("Chamando exibirReservas()");
    
        const reservasContainer = document.getElementById('reservasContainer'); 
        reservasContainer.innerHTML = ''; 
    
        const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
        console.log("Dados das reservas carregados:", reservas);
    
        reservas.forEach((reserva, index) => {
            console.log(`Exibindo reserva ${index + 1}:`, reserva); 
    
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
    

    
    window.removerReserva = (index) => {
        
            reservas.splice(index, 1);
            localStorage.setItem('reservas', JSON.stringify(reservas)); 
            exibirReservas(); 
        
    };

   
    exibirReservas();
});