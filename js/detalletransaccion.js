document.addEventListener('DOMContentLoaded', function() {

    const form = document.getElementById('transactionDetailForm');
    const idField = document.getElementById('id');
    const codigoField = document.getElementById('codigo');
    const tipoField = document.getElementById('tipo');
    const monedaField = document.getElementById('moneda');
    const fechaField = document.getElementById('fecha');
    const horaField = document.getElementById('hora');

    const idTransaccion = localStorage.getItem('idTransaccion');
    //console.log(idTransaccion);

    fetch('./api/DetalleTransacciones.json')
        .then(response => response.json())
        .then(data => {

            const transaccion = data.DetalleTransacciones.find(item => item.id === idTransaccion);

            if (transaccion) {
                idField.value = transaccion.id;
                codigoField.value = transaccion.codigo;
                tipoField.value = transaccion.tipo;
                monedaField.value = transaccion.moneda;
                fechaField.value = transaccion.fecha;
                horaField.value = transaccion.hora;
            } else {
                console.error('Transacción no encontrada');
            }

        })
        .catch(error => {
            console.error('Error al cargar los datos de transacciones:', error);
        });

    // Agrega un evento al formulario para evitar que se envíe
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        // Realiza acciones adicionales aquí, como guardar los datos o enviarlos a un servidor.

        // Actualiza el JSON con los datos del formulario
        const nuevaTransaccion = {
            id: idField.value,
            codigo: codigoField.value,
            tipo: tipoField.value,
            moneda: parseFloat(monedaField.value),
            fecha: fechaField.value,
            hora: horaField.value
        };

        // Realiza la lógica para actualizar el JSON con la nueva transacción

        // Notifica al usuario que la transacción se ha actualizado
        console.log('Transacción actualizada:', nuevaTransaccion);

        const urlParams = new URLSearchParams(window.location.search);
        const userId = urlParams.get('id');
        window.location.href = './Data.html?id='+ userId;
    });

});