const urlBase = "https://rickandmortyapi.com/api/character/";

fetch(urlBase)
  .then((respuesta) => {
    return respuesta.json();
  })
  .then((respJson) => {
    const info = respJson.info;
    const personajes = respJson.results;
    console.log(info);
    console.log(personajes);
    showCharacters(personajes);
  });

  const showCharacters = (personajes) => {
    const listaPersonajes = document.querySelector('ul');
    personajes.forEach(personaje =>{
        const li = document.createElement("li");
        li.innerText = `Personaje ${personaje.name}`;
        listaPersonajes.appendChild(li);
    })
  }
