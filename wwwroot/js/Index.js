const chatterName = 'Visitor0';

// Initialize the Signlar cline

var connection = new signalR.HubConnectionBuilder()
    .withUrl('/chatHub')
    .build();

connection.on('ReceiveMessage', renderMessage);
connection.start();

document.addEventListener('DOMContentLoaded', () => {
    ready();
});

function ready() {
    //setTimeout(showChatDialog, 750);
    
    const chatFormEl = document.querySelector('#chatForm');
    chatFormEl.addEventListener('submit', (e) => {
        e.preventDefault();
        let text = e.target[0].value;
        e.target[0].value = '';
        sendMessage(text);


    });

};


function renderMessage(name, time, message) {
    console.log(`${name} ${time} ${message}`);
    var chatBox = document.querySelector('#chatBox');
    chatBox.innerHTML = `${name} : ${time}
                        ${message}`;
};

function showChatDialog() {
    let dialogEl = document.querySelector('#chatDialog');
    dialogEl.style.display = 'block';

};



function sendMessage(text) {
    if (text && text.length) {
        connection.invoke('SendMessage', chatterName, text);
    }
};


