const API = "https://mock-api.driven.com.br/api/v6/uol";
const Time_3s = 3 * 1000;
const Time_5s = 5 * 1000;
const Time_10s = 10 * 1000;

let nome;
let participantes = [];
let destinatario = "Todos";

function iniciarChat() {
  pegarMenssagens();

  setInterval(pegarMenssagens, Time_3s);
  setInterval(manterAtivo, Time_5s);
}
iniciarChat();
function entrarSala(){
    nome = prompt("Qual seu lindo nome?");
    let pessoa = {name: nome};
    const promise = axios.post(`${API}/participants`, pessoa);
    promise.then(pegarMenssagens);
    promise.catch(outroNome);
}
entrarSala();
function pegarMenssagens(){ 
const promise = axios.get(`${API}/messages`);
promise.then(mostraMenssagens);
promise.catch(mostrarErro);
}
pegarMenssagens();
function outroNome(){
    const nome = prompt('Este nome já está em uso, digite outro: ');
    const pessoa = {name: nome};
    const promise = axios.post(`${API}/participants`, pessoa);
    promise.then(pegarMenssagens);
    promise.catch(outroNome);
}
function msgVisivel(message) {
  if (
    message.type === "private_message" &&
    (message.from === nome || message.to === nome)
  ) {
    return true;
  }
  if (message.type === "private_message" && message.to === "Todos") {
    return true;
  }
  return false;
}
function mostraMenssagens(response) {
    const containerMensagens = document.querySelector(".mensagens");
    
    containerMensagens.innerHTML = "";
    for (let i = 0; i < response.data.length; i++) {
        const message = response.data[i];
        if (message.type === "status") {
            containerMensagens.innerHTML += `
            <li class="entrada-saida">
                <span class="horario">(${message.time})</span>
                <strong>${message.from}</strong>
                <span>${message.text}</span>
            </li>
            `;
        }
        if (msgVisivel(message)) {
            containerMensagens.innerHTML += `
            <li class="conversa-privada">
                <span class="horario">(${message.time})</span>
                <strong>${message.from}</strong>
                <span> reservadamente para </span>
                <strong>${message.to}: </strong>
                <span>${message.text}</span>
            </li>
            `;
        }
        if (message.type === "message") {
            containerMensagens.innerHTML += `
            <li class="conversa-publica">
                <span class="horario">(${message.time})</span>
                <strong>${message.from}</strong>
                <span> para </span>
                <strong>${message.to}: </strong>
                <span>${message.text}</span>
            </li>
            `;
        }
    }
        
    rolarProFim();
}

function rolarProFim() {
    const ultimaMensagem = document.querySelector(
    ".mensagens li:last-child"
    );
    ultimaMensagem.scrollIntoView();
}
    
function manterAtivo(){
    axios.post(`${API}/participants`,{name: nome});
}
function resetPagina() {
  window.location.reload();
}
function mostrarErro(error){
    const statusCode = error.promise.status;
    console.log(statusCode);
}
function enviarMensagem() {
    const texto = document.querySelector(".enviar-msg").value;
    const message = {
        from: nome,
        to: "Todos",
        text: texto,
        type: "message"
    };
    if (texto) {
        document.querySelector(".enviar-msg").value = "";
        const promise = axios.post(`${API}/messages`, message);
        promise.then(pegarMenssagens);
        promise.catch(resetarPagina);
    } else {
        alert("Manda mensagem");
    }
}
    
    