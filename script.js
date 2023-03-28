async function buscaEndereco(cep){
    const mensagemErro = document.querySelector('#erro')
    mensagemErro.innerHTML = "";
    try{
        const consultCEP = await fetch (`https://viacep.com.br/ws/${cep}/json/`)
        const consultCEPComvertido = await consultCEP.json();
        if (consultCEPComvertido.erro){
            throw Error('CEP não existe')
        }

        const cidade = document.querySelector('#cidade');                                                                                
        const logradouro = document.querySelector('#endereco');                                                                           
        const estado  = document.querySelector('#estado');
        const bairro = document.querySelector('#bairro');                                 

        cidade.value = consultCEPComvertido.localidade;
        logradouro.value = consultCEPComvertido.logradouro
        estado.value = consultCEPComvertido.uf;
        bairro.value = consultCEPComvertido.bairro

        console.log(consultCEPComvertido);
    } catch(erro){
        mensagemErro.innerHTML = "<p>CEP invalido. Tem menos de 8 digitos</p>";
        console.log(erro)
    }
}

const cep = document.querySelector('#cep');
cep.addEventListener("focusout", () => buscaEndereco(cep.value))


//CASO QUEIRA FAZER VARIAS REQUISIÇÕES AO MESMO TEMPO
// let ceps = [85857220, 85857200,]
// let conjuntodeCeps = ceps.map(valores => buscaEndereco(valores));
// Promise.all(conjuntodeCeps).then(resposta => console.log(resposta))