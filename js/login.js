document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const loginMessage = document.getElementById('loginMessage');

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        fetch('./api/Login.json')
            .then(response => response.json())
            .then(data => {
                const usuarioValido = data.Login.find(user => user.usuario === username && user.contraseña === password);
                if (usuarioValido) {
                    window.location.href = './Data.html?id='+ usuarioValido.id;
                } else {
                    loginMessage.textContent = 'Usuario o contraseña incorrectos';
                }
            })
            .catch(error => {
                console.error('Error al cargar los usuarios:', error);
            });
    });
});
