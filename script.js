
const socket = io('http://localhost:3000');

const messageConatiner = document.getElementById('message-container');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');

const name = prompt('What is Your Name');

appendMessage('You Joined');
socket.emit('new-user', name);

socket.on('chat-message', data => {
    appendMessage(`${data.name }:${ data.message}`);
});

socket.on('user-connected', name => {
    appendMessage(`${name} connected`);
});

socket.on('user-disconnected', name => {
    appendMessage(`${name} disconnected`);
});
 
     
messageForm.addEventListener('submit', e =>{
    e.preventDefault();
    const message = messageInput.value
    appendMessage(`You:${message}`) ; 
    socket.emit('send-chat-message',message);
    messageInput.value = '';
});
 

    function appendMessage(message){
        const messageElement = document.createElement('div');
        messageElement.classList.add('message-element' );

        // if (data.name == name) {
        //     messageElement.style.backgroundColor = "red";
            
        // }
        messageElement.innerText = message        
        ;
        messageConatiner.append(messageElement );
    }



