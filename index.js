bodyElem = document.querySelector('body');
//const API_KEY= 'solaris-1Cqgm3S6nlMechWO'

/*async function getApiKey() {
  let resp = await fetch("https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/keys", {
    method: "POST"
  });
  const data = await resp.json();
  console.log(data);
  getSolarisPlanets(data.apiKey)
}catch (error){console.error('No key found)}
getApiKey()*/

async function getSolarisPlanets() {
  try {
    let response = await fetch("https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies", {
      method: "GET",
      headers: { "x-zocom": "solaris-1Cqgm3S6nlMechWO" },
    });

    const data = await response.json()

    let planets = data.bodies;
    console.log(planets)
    attachPlanetClick(planets)
  } catch (error) {
    console.error('No planets found')
  }
}
getSolarisPlanets();


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
  const infoPage = document.createElement('div');
  infoPage.classList.add('planet-info-page');

  let planetsMoonInfo = '';
  let planetDistanceInfo = '';
  let temperatureSection = '';

  if (planet.moons.length > 0) {
    planetsMoonInfo = `<p class='planet-moon'>MÅNAR<br>${planet.moons.join(',  ').split(' ').join('&nbsp;')}</p>`;
  }

  if (planet.distance > 0) {
    planetDistanceInfo = `<p class='planet-distance'>KM FRÅN SOLEN<br>${planet.distance}</p>`;
  }

  if (planet.name.toLowerCase() === 'solen') {

    temperatureSection = `
  <p class='planet-temp-day'>LÄGSTA TEMPERATUR <br>${planet.temp.night}</p>
  <p class='planet-temp-night'>HÖGSTA TEMPERATUR <br>${planet.temp.day}</p>`;
    infoPage.classList.add('info-solen')
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
