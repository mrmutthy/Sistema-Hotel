document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    
    if (username === 'usuario' && password === '1234') {
        
        window.location.href = 'PgPrincipal/pgprincipal.html';
    } else {
        alert('Nome de usuário ou senha incorretos.');
    }
});