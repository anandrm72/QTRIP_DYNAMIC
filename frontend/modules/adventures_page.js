import config from "../conf/index.js";

//Implementation to extract city from query params
async function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  return new URLSearchParams(search).get('city');
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  const url = `${config.backendEndpoint}/adventures?city=${city}`;
  try {
    return await (await fetch(url)).json();
  } catch (error) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM'
  let container = document.getElementById('data');
  adventures.forEach(element => {
    const { category, costPerHead, currency, duration, id, image, name } = element;
    container.innerHTML += `<div class="col col-12 col-md-6 col-lg-3 mb-3">
    <a href="detail/?adventure=${id}" id="${id}">
    <div class="adventure-card">
      <div class="adventure-card-img">
      <img src='${image}' alt="${name}"></img>
      </div>
        <div class="adventure-card-body p-2">
       <div>
        <div
          class="d-flex align-items-center flex-column flex-sm-column justify-content-sm-center align-items-sm-center flex-md-row justify-content-md-between mb-1">
          <div>
            <span style="font-weight: 500; flex:1">${(() => name.toUpperCase())()}</span>
          </div>
          <div class="m-0 p-0">
            <span style="font-weight: 500; flex:1">${(() => {
        switch (currency) {
          case 'INR':
            return '₹';
          default:
            break;
        }
      })()}${costPerHead}</span>
          </div>
        </div>
        <div
          class="d-flex align-items-center flex-column flex-sm-column justify-content-sm-center align-items-sm-center flex-md-row justify-content-md-between">
          <div>
            <span style="font-weight: 500;">Duration</span>
          </div>
          <div class="m-0 p-0">
            <span style="font-weight: 500;">${duration} hours</span>
          </div>
        </div>
        </div>
       </div>
       <div class="adventure-card-category">${category}</div>
    </div>
    </a>
  </div>`
  });
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  return list.filter(({ duration }) => duration >= low && duration <= high);
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  if (categoryList.length > 0) {
    return list.filter(adventure => categoryList.includes(adventure.category));
  } return list
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods

  if (filters.category.length > 0 && filters.duration != '') {
    const dur = filters.duration.split('-');
    return (list.filter(({ duration }) => duration >= dur[0] && duration <= dur[1])).filter(adventure => filters.category.includes(adventure.category));
  }
  if (filters.category.length > 0) {
    return list.filter(adventure => {
      return filters.category.includes(adventure.category)
    });
  }
  if (filters.duration != '') {
    const dur = filters.duration.split('-');
    return list.filter(({ duration }) => duration >= dur[0] && duration <= dur[1]);
  }
  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  try {
    localStorage.setItem('filters', JSON.stringify(filters));
    return true
  } catch (error) {
    return error;
  }
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  try {
    return JSON.parse(localStorage.getItem('filters'));
  } catch (error) {
    return null;
  }
  // Place holder for functionality to work in the Stubs
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let categoriesContainer = document.getElementById('category-list');
  filters.category.forEach(category => {
    categoriesContainer.innerHTML +=
      `<div class="filter-pills">${category}</div>`;
  });
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
