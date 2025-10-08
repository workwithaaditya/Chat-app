
// const socket = io('http://localhost:8000');
const socket = io('https://chattapp-2-0x8b.onrender.com');

const form = document.getElementById('send-container');
const messageInp = document.getElementById('MessageINP');
const messageContainer = document.querySelector("#container")
const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageElement.innerText = message;
    messageContainer.append(messageElement);
    var audio = new Audio('sent.mp3');

}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInp.value;
    append(`you:${message}`, 'right');
    socket.emit('send',message);
    messageInp.value = "";
    if(position == 'left'){

        audio.play(); 
    }
      
 
 

});

const name = prompt("Enter Your Name to join");
socket.emit('new-user-joined', name);

socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'right');

})
socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'left');

})

socket.on('left', name => {
    append(`${name}: Has left the chat`, 'left');

})
