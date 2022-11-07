
export const creaCard = (personaje) => {
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

export const modalBody = (personaje) => {
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
  
export const spinner = () => {
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
