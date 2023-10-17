document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('id');

    fetch('./api/Data.json')
            .then(response => response.json())
            .then(data => {
                const usuario = data.Data.find(user => user.id === userId);

                if (usuario) {
                    document.getElementById('nombre').value = usuario.nombre;
                    document.getElementById('email').value = usuario.email;
                    document.getElementById('direccion').value = usuario.direccion;
                } else {
                    console.error('Usuario no encontrado');
                }
            })
            .catch(error => {
                console.error('Error al cargar los datos de los usuarios:', error);
            });

    fetch('./api/Transacciones.json')
        .then(response => response.json())
        .then(data => {
            const filteredTransactions = data.Transacciones.filter(transaction => transaction.idusuario === userId);

            if (filteredTransactions.length > 0) {
                const tableBody = document.getElementById('transactionTable');

                filteredTransactions.forEach(transaction => {
                    const row = tableBody.insertRow();
                    row.insertCell(0).textContent = transaction.id;
                    row.insertCell(1).textContent = transaction.codigo;
                    row.insertCell(2).textContent = transaction.monto;
                    row.insertCell(3).textContent = transaction.fecha;

                    const actionCell = row.insertCell(4);
                    const button = document.createElement('button');
                    button.textContent = 'Ver Detalle';
                    button.addEventListener('click', function() {
                    localStorage.setItem('idTransaccion', transaction.id);
                    window.location.href = './DetalleTransaccion.html?id='+ userId;
                    });
                    actionCell.appendChild(button);
                });
            } else {
                console.error('No se encontraron transacciones para el usuario con ID:', userId);
            }
        })
        .catch(error => {
            console.error('Error al cargar los datos de transacciones:', error);
        });


});
