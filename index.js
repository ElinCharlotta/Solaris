let bodyElem = document.querySelector('body');

async function getApiKey() {
  try {
    let resp = await fetch("https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/keys", {
      method: "POST"
    });
    const data = await resp.json();
    getSolarisPlanets(data.key);
  } catch (error) {
    console.error('Error fetching API key');
  }
}

async function getSolarisPlanets(key) {
  try {
    let response = await fetch("https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies", {
      headers: { "x-zocom": `${key}` },
    });

    const data = await response.json();
    let planets = data.bodies;

    attachPlanetClick(planets);
  } catch (error) {
    console.error('No planets found');
  }
}
getApiKey();


function attachPlanetClick(planets) {
  //go through each planet one at a time and add a 'click' to each planet. So I don't have to add click event to all planets separately.
  planets.forEach(planet => {
    const planetElem = document.querySelector(`.${planet.name.toLowerCase()}`);

    if (planetElem) {
      planetElem.addEventListener('click', () => {

        displayPlanetInfo(planet);
      });
    }
  });
}


function displayPlanetInfo(planet) {
  /* creates dynamic HTML good for this case when I want to display different information about various planets. Makes adding variables and conditions easier*/
  const infoPage = document.createElement('div');
  infoPage.classList.add('planet-info-page');

  //checks if the information about the planets are relevant. ex. If planet have no moons that section will be removed
  let planetsMoonInfo = '';
  let planetDistanceInfo = '';
  let temperatureSection = '';


  // (&nbsp;)= non-breaking spaces. if moon have a name with multiple words. It do not break up the name with a comma and two spacces. 
  if (planet.moons.length > 0) {
    planetsMoonInfo = `<p class='planet-moon'>MÅNAR<br>${planet.moons.join(',  ').split(' ').join('&nbsp;')}</p>`;
  }

  if (planet.distance > 0) {
    planetDistanceInfo = `<p class='planet-distance'>KM FRÅN SOLEN<br>${planet.distance}</p>`;
  }


  // apply to the sunPage only. So I can style the sunPage differently than the other Planetes pages
  if (planet.name.toLowerCase() === 'solen') {

    temperatureSection = `
  <p class='planet-temp-day'>LÄGSTA TEMPERATUR <br>${planet.temp.night}</p>
  <p class='planet-temp-night'>HÖGSTA TEMPERATUR <br>${planet.temp.day}</p>`;
    infoPage.classList.add('info-solen') // create a new class so I can style info about the sun in CSS
  }
  else {
    temperatureSection = `
  <p class='planet-temp-day'>LÄGSTA TEMPERATUR <br>${planet.temp.night}</p>
  <p class='planet-temp-night'>HÖGSTA TEMPERATUR <br>${planet.temp.day}</p>`

  }


  infoPage.innerHTML = `
    <main class='planets-info'>
      <button class="close-button" onclick="closePlanetInfo()">&times;</button>

      <h1 class='planet-name' style='text-transform: uppercase;'>${planet.name}</h1>
      <h2 class='planet-latin-name' style='text-transform: uppercase;'> ${planet.latinName}</h2>

      <p class='planet-description'> ${planet.desc}</p>

      <article class="quick-info">
        <p class='planet-circumference'>OMKRETS<br>${planet.circumference}</p>
        ${planetDistanceInfo}
     
        ${temperatureSection}
      </article>

      ${planetsMoonInfo}
    </main>
  `;

  bodyElem.appendChild(infoPage);
}


function closePlanetInfo() {
  const infoPage = document.querySelector('.planet-info-page');
  infoPage.remove();

}
