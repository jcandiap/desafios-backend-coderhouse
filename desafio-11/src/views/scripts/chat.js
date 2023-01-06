const socket = io();

socket.on('newUserConnected', ({ userName }) => {
    Swal.fire({
        text: `Se ha conectado ${ userName }`,
        toast: true,
        icon: 'info',
        position: 'bottom-end',
        timer: 2000,
        showConfirmButton: false,
    })
})