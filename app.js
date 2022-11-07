const urlBase = "https://rickandmortyapi.com/api/character/";

const loadData = (urlBase, page = 1) => {
  const url = `${urlBase}?page=${page}`;
  fetch(url)
    .then((respuesta) => {
      return respuesta.json();
    })
    .then((respJson) => {
      const info = respJson.info;
      const personajes = respJson.results;
      console.log(info);
      //Validar botones
      const btnPrev = document.querySelector('#prev');
      const btnNext = document.querySelector('#next');
      if(!info.prev){
        btnPrev.classList.add('disabled');
      } else {
        btnPrev.classList.remove('disabled');
        btnPrev.setAttribute('data-id', Number(page) - 1);
      }
      if(!info.next){
        btnNext.classList.add('disabled');
      } else {
        btnNext.classList.remove('disabled');
        btnNext.setAttribute('data-id', Number(page) + 1);
      }
      showCharacters(personajes);
    });
};
const showCharacters = (personajes) => {
  const listaPersonajes = document.querySelector('#characters');
  while (listaPersonajes.firstChild){
  listaPersonajes.removeChild(listaPersonajes.firstChild);
  }
  personajes.forEach((personaje) => {
    const div = document.createElement('div');
    div.classList.add('col');
    div.classList.add('m-2');
    div.innerHTML = creaCard(personaje);
    listaPersonajes.appendChild(div);
  });
};

const creaCard = (personaje) => {
  const html = `
  <div class="card bg-dark text-light border" style="width: 18rem;">
  <img src="${personaje.image}" class="card-img-top" alt="${personaje.image}">
  <div class="card-body">
    <h5 class="card-title">${personaje.name}</h5>
    <p class="card-text">${personaje.status}</p>
    <a href="#" 
    class="btn btn-primary"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
    data-id="${personaje.id}">Ver más</a>
  </div>
</div>
`;
return html;
}


const navegacion = (e)  => {
  e.preventDefault();
  if(e.target.classList.contains('btn')){
    const id = e.target.getAttribute('data-id');
    loadData(urlBase, id);
  }
}

const modalBody = (personaje) => {
  const div = document.createElement('div');
  div.classList.add('text-center');
  let html = ``;
  html += `<img src="${personaje.image}">`;
  html += `<p>${personaje.status} - ${personaje.species}</p>`;
  html += `<p>Ultima ubicacion conocida </p><p>${personaje.origin.name}<p/>`;
  html += `<p>Ha aparecido en ${personaje.episode.lenght} episodios</p>`;
  div.innerHTML = html;
  return div;
}


const showCharactersByid = (id) => {
  const urlid = `${urlBase}${id}`;
  fetch(urlid)
      .then(result => result.json())
      .then(character => {
        const modalContent = document.querySelector('.modal-body')
        document.querySelector('.modal-title').innerText = character.name;
        console.log(character);
        modalContent.appendChild(modalBody(character));
      })
}

const loadInfo = (e) =>{
  e.preventDefault();
  if(e.target.classList.contains('btn')){
    const modalContent = document.querySelector('.modal-body');
    modalContent.removeChild(modalContent.firstChild);
    modalContent.appendChild(spinner());
    setTimeout(() =>{
      modalContent.removeChild(modalContent.firstChild);
    //const content = document.createElement('div');
      const id = e.target.getAttribute('data-id');
    //content.innerHTML = `<h2>id ${id}</h2>`;
      const content = showCharactersByid(id);
      modalContent.appendChild(content);
    }, 3000);
  }
}

const spinner = () => {
  const div = document.createElement('div');
  const html = `
  <div class="d-flex justify-content-center">
  <div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>`;
  div.innerHTML = html;
  return div;
}

document.querySelector('#botones').addEventListener('click', navegacion);
document.querySelector('#characters').addEventListener('click', loadInfo);

loadData(urlBase);