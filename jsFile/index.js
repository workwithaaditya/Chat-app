
// const socket = io('http://localhost:8000');
const socket = io('https://chattapp-2-0x8b.onrender.com');

const form = document.getElementById('send-container');
const messageInp = document.getElementById('MessageINP');
const messageContainer = document.querySelector("#container");

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageElement.innerText = message;
    messageContainer.append(messageElement);
    
    // Auto scroll to bottom
    messageContainer.scrollTop = messageContainer.scrollHeight;
    
    // Play sound for received messages
    if(position === 'left') {
        try {
            var audio = new Audio('sent.mp3');
            audio.play().catch(e => console.log('Audio play failed:', e));
        } catch(e) {
            console.log('Audio not available');
        }
    }
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInp.value.trim();
    
    if(message === '') return; // Don't send empty messages
    
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInp.value = "";
    messageInp.focus();
});

const name = prompt("Enter Your Name to join");
socket.emit('new-user-joined', name);

socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'left');
})

socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'left');
})

socket.on('left', name => {
    append(`${name} left the chat`, 'left');
})

// Focus input on load
messageInp.focus();

