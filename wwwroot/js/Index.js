document.addEventListener('DOMContentLoaded', () => {
    ready();
});
let chatterName = 'Visitor0';

const dialogEl = document.querySelector('#chatDialog');


// Initialize the Signlar cline



var connection = new signalR.HubConnectionBuilder()
    .withUrl('/chatHub')
    .build();

connection.on('ReceiveMessage', renderMessage);

connection.onclose(() => {
    onDisconnected();
    console.log('Reconnection in 5 seconds...');
    setTimeout(startConnection, 5000);
});

//connection.start();

startConnection();




function startConnection() {
    connection.start()
        .then(onConnected)
        .catch(err => console.log('err'));
    
}

function ready() {
    const chatFormEl = document.querySelector('#chatForm');
    const chatConnectForm = document.querySelector('#chatConnectForm');

    chatFormEl.addEventListener('submit', (e) => {
        e.preventDefault();
        let text = e.target[0].value;
        e.target[0].value = '';
        sendMessage(text);


    });

    chatConnectForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = document.querySelector('#name-input');
        const name = input.value;
        input.value = '';
        chatterName = name;
        if (chatterName && chatterName.length) {
            startConnection();
            console.log(name);
        }
        
    });

};


function sendMessage(text) {
    if (text && text.length) {
        connection.invoke('SendMessage', chatterName, text);
    }
};

function renderMessage(name, time, message) {
    console.log(`${name} ${time} ${message}`);
    const chatBox = document.querySelector('#chatBox');
    const para = document.createElement("P");
    const t = document.createTextNode(`${name} : ${time} ${message}`);
    para.appendChild(t);
    document.body.appendChild(para);
};

function onDisconnected() {
    alert('disconnected');
};

function onConnected() {
    alert('connected');
};




function showChatDialog() {
   
    dialogEl.style.display = 'block';

};




