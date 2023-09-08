const socket = io();

const chatBtn = document.querySelector('#chat-btn');
const messagesDIv = document.querySelector('#message-div');
const chatDiv = document.querySelector('#chat-div');

let email;

Swal.fire({
	title: 'Identificación de usuario',
	text: 'Por favor ingrese su email',
	input: 'text',

	inputValidator: valor => {
		return !valor && 'Ingrese un email válido';
	},
}).then(resultado => {
	email = resultado.value;
});

chatBtn.addEventListener('click', () => {
	if (chatDiv.value.trim().length > 0) {
		socket.emit('mensaje', {
			email: email,
			message: chatDiv.value,
		});
		chatDiv.value = '';
	}
});

socket.on('mensajes', arrayMensajes => {
	messagesDIv.innerHTML = '';
	arrayMensajes.forEach(msj => {
		const { email, message } = msj;
		messagesDIv.innerHTML += `<p>${email} escribió: </p> <p>${message}</p>`;
	});
});