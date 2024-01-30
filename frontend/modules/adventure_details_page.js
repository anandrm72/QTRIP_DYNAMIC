import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  return new URLSearchParams(search).get('adventure');
  // Place holder for functionality to work in the Stubs
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    const url = `${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`;
    return (await (await fetch(url)).json());
  } catch (error) {
    return null;
  }
  // Place holder for functionality to work in the Stubs
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  console.log(adventure);
  document.getElementById('adventure-name').textContent = adventure.name;
  document.getElementById('adventure-subtitle').textContent = adventure.subtitle;
  let photoGallery = document.getElementById('photo-gallery');
  adventure.images.forEach(image => {
    photoGallery.innerHTML += `<img src="${image}"
    alt="" class="activity-card-image">`
  });
  document.getElementById('adventure-content').textContent = adventure.content;
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let photoGallery = document.getElementById('photo-gallery');
  photoGallery.textContent = '';
  photoGallery.innerHTML = `<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
  ${(() => {
      let carousel;
      images.forEach((image, index) => {
        if (index === 0) {
          carousel =
            `<div class="carousel-item active">
             <img src="${image}" class="d-block w-100 activity-card-image" alt="${index}">
           </div>`
        }
        else {
          carousel +=
            `<div class="carousel-item">
             <img src="${image}" class="d-block w-100 activity-card-image" alt="${index}">
           </div>`
        }
      });
      return carousel;
    })()}
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>`;
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  let reservation_pannel_sold_out = document.getElementById('reservation-panel-sold-out');
  let reservation_pannel_available = document.getElementById('reservation-panel-available');
  if (!adventure.reserved) {
    if (adventure.available) {
      document.getElementById('reservation-person-cost').innerHTML = adventure.costPerHead;
      reservation_pannel_sold_out.style.display = 'none';
      reservation_pannel_available.style.display = 'block';
    } else {
      reservation_pannel_available.style.display = 'none';
      reservation_pannel_sold_out.style.display = 'block';
    }
  } else {
    reservation_pannel_sold_out.style.display = 'none';
    reservation_pannel_available.style.display = 'none';
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  document.getElementById('reservation-cost').textContent = adventure.costPerHead * persons;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  const reservationForm = document.getElementById('myForm');
  reservationForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    let url = `${config.backendEndpoint}/reservations/new`;

    // const targetValues = e.target;
    // const data = JSON.stringify({
    //   name: targetValues['name'].value,
    //   date: targetValues['date'].value,
    //   person: targetValues['person'].value,
    //   adventure: adventure.id,
    //   // adventure: "0610512104",
    // });
    let formElements = reservationForm.elements;
    const data = JSON.stringify({
      name: formElements['name'].value,
      date: formElements['date'].value,
      person: formElements['person'].value,
      adventure: adventure.id,
      // adventure: "0610512104",
    });
    
    try {
      const result = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: data,
      });
      if (result.ok) {
        alert('Success!');
        window.location.reload();
      } else {
        let res = await result.json();
        alert(`Failed - ${res.message}`)
      }
    } catch (error) {
      console.log(error);
      alert('Failed - fetch call resulted in error');
    }
  });
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  let bannerView = document.getElementById('reserved-banner');
  if (adventure.reserved) {
    bannerView.style.display = 'block';
  } else {
    bannerView.style.display = 'none';
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
