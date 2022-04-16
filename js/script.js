function pegarMenssagens(){ 
const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
promise.then(mostraMenssagens);
promise.catch(mostrarErro);
}
pegarMenssagens();
function mostraMenssagens(response){
    let menssage = response.data;
    let redenrizarMenssagens = document.querySelector("section");
    // console.log(menssage)
    for(let i = 0; i < menssage.length; i++){
        redenrizarMenssagens.innerHTML +=`
            <li class="menssagens">
                <h3>(${menssage[i].time}) <strong>${menssage[i].from}</strong>
                para ${menssage[i].to}:  ${menssage[i].text}
            </li>`
    }//o resto usando if e else mara alterar a cor
    redenrizarMenssagens.scrollIntoView();
}

function mostrarErro(error){
    const statusCode = error.promise.status;
	console.log(statusCode);
}
function pegarText(){
    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', novaMenssagen);
    promise.then(pegarMenssagens);
    promise.catch(error);
    console.log(promise)

}
function enviarMenssagem(responde){
    const texto = document.querySelector(".enviar-msg").value;
    document.querySelector(".enviar-msg").value="";
    let novaMenssagen = {
    from: "nome",
	to: "Todos",
	text: texto,
	type: "message" };
    redenrizarMenssagens.innerHTML += `
    <li class="menssagens">
        <h3>(${menssage[i].time}) <strong>${menssage[i].from}</strong>
        para ${menssage[i].to}:  ${menssage[i].text}
    </li>`;
    console.log(novaMenssagen)
    console.log(texto)
    
}
