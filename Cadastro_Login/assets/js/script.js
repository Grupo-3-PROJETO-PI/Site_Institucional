// verificação login 
function cadastro_verificacao(){
    // entrada 
    let nome = (ipt_nome.value);
    let email = (ipt_email.value);
    let telefone = (ipt_telefone.value);
    let senha = (ipt_senha.value);
    let senha_confirmacao = (ipt_senha_confirmacao.value);
    let boolean_email = false;
    let erro_cadastro = false;
    let sucesso_cadastro = false;
    
    // código do erro:
    erro_status.innerHTML = ``;
    // código de sucesso
    sucesso.innerHTML = ``;

    // elementos HTML
    let senha_erro = document.querySelector('.info-row-description');
    let content_erro = document.querySelector('.container-aviso');
    let content_sucesso = document.querySelector('.container-sucesso');

    if(email.includes("@") && email.includes(".")){
        boolean_email = true;
    }

    // verificação nome mínimo 3
    if(nome == "" || email == "" || telefone == "" || senha == "" || senha_confirmacao == ""){
        content_erro.style.display = 'flex';
        erro_status.innerHTML = `Preencha os campos corretamentes!`;
        erro_cadastro = true;
    }else if(nome.length <= 3){
        content_erro.style.display = 'flex';
        erro_status.innerHTML = `Seu nome deve ter pelo menos 4 caracteres!`;
        erro_cadastro = true;
    }else if(!boolean_email){
        content_erro.style.display = 'flex';
        erro_status.innerHTML = `Seu email deve conter "@" e "."`;
        erro_cadastro = true;
    }else if(telefone.length < 10){
        content_erro.style.display = 'flex';
        erro_status.innerHTML = `Seu email deve ter no mínimo 11 dígitos`;
        erro_cadastro = true;
    }else if(senha.length < 5){
        senha_erro.style.display = 'flex';
        erro_cadastro = true;
    }else if(senha != senha_confirmacao){
        content_erro.style.display = 'flex';
        erro_status.innerHTML = `Suas senhas devem coincidir!`;
        erro_cadastro = true;
    }else{
        content_sucesso.style.display = 'flex';
        sucesso.innerHTML = `Seu login foi um sucesso!<br> Estamos te redirecionando.`;
        sucesso_cadastro = true;
    }

    if(sucesso_cadastro){
        setTimeout(() => {
            location.reload();
        }, 5000);
    }
};

// fechar modais de aviso
let content_erro = document.querySelector('.container-aviso');
let content_sucesso = document.querySelector('.container-sucesso')
let btn_fechar_sucesso = document.getElementById('btn_fechar_sucesso');
let btn_fechar_aviso = document.getElementById('btn_fechar_aviso');

btn_fechar_aviso.addEventListener('click', () =>{
    content_erro.style.display = 'none';
    setTimeout(() => {
        location.reload();
    });
})

btn_fechar_sucesso.addEventListener('click', () =>{
    content_sucesso.style.display = 'none';
})
