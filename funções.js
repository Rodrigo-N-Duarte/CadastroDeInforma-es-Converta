const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sAvaliacao = document.querySelector('#m-avaliacao')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function adicionaNova(edicao = false, valor = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edicao) {
    sNome.value = itens[valor].nome
    sAvaliacao.value = itens[valor].avaliacao
    id = valor
  } else {
    sNome.value = ''
    sAvaliacao.value = ''
  }
  
}

function editItem(valor) {

  adicionaNova(true, valor)
}

function deleteItem(valor) {
  itens.splice(valor, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, valor) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.avaliacao}</td>
    <td class="acao">
      <button onclick="editItem(${valor})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${valor})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  
  if (sNome.value == '' || sAvaliacao.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].nome = sNome.value
    itens[id].avaliacao = sAvaliacao.value
  } else {
    itens.push({'nome': sNome.value, 'avaliacao': sAvaliacao.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, valor) => {
    insertItem(item, valor)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('db')) ?? []
const setItensBD = () => localStorage.setItem('db', JSON.stringify(itens))

loadItens()