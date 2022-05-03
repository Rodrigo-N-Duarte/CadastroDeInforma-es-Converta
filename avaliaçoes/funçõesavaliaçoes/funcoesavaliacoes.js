function leDados() {
    let strDados = localStorage.getItem('db');
    let objDados = {};

    if (strDados) {
        objDados = JSON.parse(strDados);
    }
    else {
        objDados = { usuario: [{ nome: "Exemplo: José da Silva", avaliacao: "Eu gostei muito do site, me ajudou muito nos estudos.", nota: "9,5/10" }] }
    }
    return objDados;
}




function salvaDados(dados) {
    localStorage.setItem('db', JSON.stringify(dados));
}


function incluirDados() {
    //le os dados no localstorage
    let objDados = leDados();

    //inclui um novo dado
    let strNome = document.getElementById('campoNome').value;
    let strAvaliacao = document.getElementById('campoComentario').value;
    let strNota = document.getElementById('campoNota').value;
    let novoDado = {
        nome: strNome,
        avaliacao: strAvaliacao,
        nota: strNota
    };
    objDados.usuario.push(novoDado);

    //salva os dados no localstorage novamente
    salvaDados(objDados);

}

function imprimeDados() {
    let tela = document.getElementById('tela');
    let strHtml = '';
    let objDados = leDados();

    for (i = 0; i < objDados.usuario.length; i++) {
        strHtml = strHtml + `<p>${objDados.usuario[i].nome} - ${objDados.usuario[i].avaliacao} - ${objDados.usuario[i].nota}</p>`
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
document.getElementById('btnCarregaDados').addEventListener('click', imprimeDados);
document.getElementById('incluirContato').addEventListener('click', incluirDados);