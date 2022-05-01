const socket=io();
const cf=document.getElementById('chat-form');


socket.on('message',message=>{
    console.log(message);
    outputMessage(message);
    //scroller
    document.querySelector('.chat-messages').scrollTop=document.querySelector('.chat-messages').scrollHeight;
});

cf.addEventListener('submit',e=>{
    e.preventDefault();
    const msg = e.target.elements.message.value;
    //emiting message
    socket.emit('chatm',msg);
    //clearing input
    document.querySelector('#message').value='';
    document.querySelector('#message').focus();
});

function outputMessage(message){
    const div= document.createElement('div');
    div.classList.add('chat');
    div.classList.add('out');
    div.classList.add('add');
    div.innerHTML=`<p class="user">${message.username}</p>
    <span style="color:grey;font-size=9px">${message.time}</span>
    <p> ${message.text}</p>`;
    document.querySelector('.chat-messages').appendChild(div);
};