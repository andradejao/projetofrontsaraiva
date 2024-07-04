function login() {
  const us = document.querySelector("#inputUsuario")
  const sh = document.querySelector("#inputSenha")

  // o comando trim() elimina os espaços 
  if (us.value.trim() == "" || sh.value.trim() == "") {
    return alert("Preencha os campos requisitados")
  }

  fetch("http://127.0.0.1:4000/api/v1/users/login", {
    method: "POST",
    headers: {
      "accept": "application/json",
      "content-type": "application/json"
    },
    body: JSON.stringify({
      nomeusuario: us.value,
      senha: sh.value
    })
  }).then((res) => res.json())
    .then((result) => {
      console.log(result)
    })
    .catch((error) => console.error(`Erro ao acessar a api ${error}`))
}

function cadastrarUsuario() {
  const us = document.querySelector("#txtUsuario")
  const sh = document.querySelector("#txtSenha")
  const ft = document.querySelector("#txtFoto")

  if (us.value.trim() == "" || sh.value.trim() == "" || ft.value.trim() == "") {
    return alert("Preencha os campos requisitados")
  }
  fetch("http://127.0.0.1:4000/api/v1/users/cadastrar", {
    method: "POST",
    headers: {
      "accept": "application/json",
      "content-type": "application/json"
    },
    body: JSON.stringify({
      nomeusuario: us.value,
      senha: sh.value,
      foto: ft.value
    })
  }).then((res) => res.json())
    .then((result) => {
      console.log(result)
    })
    .catch((error) => console.error(`Erro ao acessar a api ${error}`))
}

function carregarLivros() {
  const conteudo = document.querySelector('.conteudo')

  fetch("http://127.0.0.1:4001/api/v1/livros/detalhes")
    .then((res) => res.json())
    .then((dados) => {
      dados.payload.map((rs) => {
        let card = `<div class="card" style="width: 18rem;">
                <img src=${rs.foto1} class="card-img-top" alt="...">
                <div class="card-body">
                <h3>${rs.nometitulo}</h3>
                <p class="card-text">${rs.autor}</p>
                <div id="containerFlex">
                <p class="card-text" id="precoBook">De R$${rs.precoatual}</p>
                <p class="card-text" >Por R$${rs.precodesconto}</</p>
                </div>
                <a href="detalhes.html?idlivro=${rs.idtitulo}" class="btn btn-warning" id="btnDetail">Acessar</a>
                </div>
              </div>`

        conteudo.innerHTML += card
      })
    })
    .catch((error) => {
      console.error(`Erro na api ${error}`)
    })
}

function detalhes() {
  let idUrl = window.location.search.split('=')
  const conteudo = document.querySelector('.conteudo')

  fetch("http://127.0.0.1:4001/api/v1/livros/detalhes/" + idUrl[1])
    .then((res) => res.json())
    .then((dados) => {
      dados.payload.map((rs) => {
        document.querySelector('h2').innerHTML = `Saiba mais sobre ${rs.nometitulo}` 
        let card = `<div class="card mb-3 col-md-12" >
                <div class="row g-0">
                  <div class="col-md-3">
                  <img src="${rs.foto1}" data-bs-toggle="modal" data-bs-target="#exampleModal" style=cursor:pointer;></img>
                </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h3 class="card-title">${rs.nometitulo}</h3>
                      <h6 class="card-title">Autor: ${rs.autor}</h6>
                      <p class="card-text">${rs.sinopse}</p>
                      <p class="card-text" id="precoBook">De R$${rs.precoatual}</p>
                      <p class="card-text" id="precoBookDesc">Por R$${rs.precodesconto}</p>
                      <img src="./img/shopcart.png" id="imgCart">Incluir no carrinho</img>
                      </div>
                  </div>
                </div>
              </div>
              <!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" style=display:none;>Exibir Mais</button>
<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">${rs.nometitulo}</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <div id="carouselExampleFade" class="carousel slide carousel-fade">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="${rs.foto1}" id="imgModal" class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
          <img src="${rs.foto2}" id="imgModal" class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
          <img src="${rs.foto3}" id="imgModal" class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
          <img src="${rs.foto4}" id="imgModal" class="d-block w-100" alt="...">
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
      </div>
      <div class="modal-footer">
      </div>
    </div>
  </div>
</div>`

        conteudo.innerHTML += card
      })
    })
    .catch((error) => {
      console.error(`Erro na api ${error}`)
    })
}

function buscar() {
  const conteudo = document.querySelector('.conteudo')
  conteudo.innerHTML = ""
  // Obter texto da caixa de busca
  let palavra = document.querySelector('input').value
  document.querySelector('h2').innerHTML = `Resultados encontrados por: ${palavra}`

  fetch("http://127.0.0.1:4001/api/v1/livros/detalhes/titulo/" + palavra)
    .then((res) => res.json())
    .then((dados) => {
      dados.payload.map((rs) => {
        let card = `<div class="card mb-3 col-md-12" >
        <div class="row g-0">
          <div class="col-md-3">
          <img src="${rs.foto1}"></img>
        </div>
          <div class="col-md-8">
            <div class="card-body">
              <h3 class="card-title">${rs.nometitulo}</h3>
              <h6 class="card-title">Autor: ${rs.autor}</h6>
              <p class="card-text" id="precoBook">De R$${rs.precoatual}</p>
              <p class="card-text" id="precoBookDesc">Por R$${rs.precodesconto}</p>
              <a href="detalhes.html?idlivro=${rs.idtitulo}" class="btn btn-warning" id="btnDetail">Acessar</a>
              </div>
          </div>
        </div>
      </div>`

        conteudo.innerHTML += card
      })
    })
    .catch((error) => {
      console.error(`Erro na api ${error}`)
    })

}