import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities().catch(error => error);
  console.log(cities);

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  const url = `${config.backendEndpoint}/cities`;
  try {
    return await (await fetch(url)).json();
  } catch (error) {
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM

  let data = document.getElementById('data');
  data.innerHTML += `<div class="col col-12 col-lg-3 col-sm-6 tile-container">
    <div class="tile">
      <a href="./pages/adventures/?city=${id}" id="${id}">
        <img src=${image} alt=${city}>
        <div class="tile-text">
          <span class="tile-heading">${city}</span>
          <span class="tile-subheading">${description}</span>
        </div>
      </a>
    </div>
  </div>`;
}

export { init, fetchCities, addCityToDOM };
