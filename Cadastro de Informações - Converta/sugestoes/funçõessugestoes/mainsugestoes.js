function leDados() {//pega os dados do usurio e os lÊ
    let strDados = localStorage.getItem('Sugestões');
    let objDados = {};


    if (strDados) {
        objDados = JSON.parse(strDados);//transforma para JSON
    }
    else {//exemplo que aparece na tela
        objDados = { usuario: [{ sugestao: "Exemplo: Achei que as funcionalidades foram úteis, porém tive problemas ao tentar converter (M) para (KM)." }] }
    }
    return objDados;
}

function salvaDados(dados) {//salva os dados no local storage
    localStorage.setItem('Sugestões', JSON.stringify(dados));//pega os dados em JSON e transforma em string, salva no local storage
}


function incluirDados() {//le os dados no localstorage
    let objDados = leDados();

    //inclui um novo dado
    let strSugestao = document.getElementById('campoComentario').value;
    let novoDado = {
        sugestao: strSugestao,
    };
    objDados.usuario.push(novoDado);

    //salva os dados no localstorage novamente
    salvaDados(objDados);
}


function imprimeDados() { //atualiza os dados na tela quando o usuario já informou algo no localstorage e clicou em carregar comentario
    let tela = document.getElementById('tela');
    let strHtml = '';
    let objDados = leDados();

    for (i = 0; i < objDados.usuario.length; i++) {
        strHtml = strHtml + `<p>${objDados.usuario[i].sugestao}</p>`
    }
    tela.innerHTML = strHtml;
}

function exclui() {//exclui dados do local storage
    localStorage.clear();
}


function alertaDeletado() {//alerta quando dados foram apagados
    alert('Dados deletados com êxito.');
}


//configura os botões
document.getElementById('btnCarregaDados').addEventListener('click', imprimeDados);//botao carregar comentario
document.getElementById('incluirMensagem').addEventListener('click', incluirDados);//botao enviar 