bodyElem = document.querySelector('body');
//const API_KEY= 'solaris-1Cqgm3S6nlMechWO'

/* async function getApiKey(){
  let resp = await fetch("https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/keys", {
    method: "POST"
  });
}
getApiKey() */

async function getSolarisPlanets() {
  try {
    let response = await fetch("https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies", {
      method: "GET",
      headers: { "x-zocom": "solaris-1Cqgm3S6nlMechWO" },
    });

    const data = await response.json()

    let planets = data.bodies;
    console.log(planets)
    showPlanetsInfo(planets)
  } catch (error) {
    console.error('No planets found')
  }
}
getSolarisPlanets();


function showPlanetsInfo(planets) {

  planets.forEach(planet => {
    const getPlanetsInfo = document.querySelector(`.${planet.name.toLowerCase()}`);

    if (getPlanetsInfo) {
      getPlanetsInfo.addEventListener('click', () => {

        displayPlanetInfo(planet);
      });
    }
  });
}

function displayPlanetInfo(planet) {
  const infoPage = document.createElement('div');
  infoPage.classList.add('planet-info-page');

  infoPage.innerHTML = `
  <main class='planets-info'>
  <button class="close-button" onclick="closePlanetInfo()">&times;</button>

<h1 class='planet-name' style='text-transform: uppercase;'>${planet.name}</h1>
<h2 class='planet-latin-name' style='text-transform: uppercase;'> ${planet.latinName}</h2>

<p class='planet-description'> ${planet.desc}</p>

<article class="quick-info">
<p class='planet-circumference'>OMKRETS<br> ${planet.circumference}</p>
<p class='planet-distance'>KM FRÅN SOLEN<br> ${planet.distance}</p>
<p class='planet-temp-day'>MINSTA TEMPERATUR <br> ${planet.temp.night}</p>
<p class='planet-temp-night'>HÖGSTA TEMPERATUR <br> ${planet.temp.day}</p>
</article>
<p class='planet-moon'>MÅNAR<br>${planet.moons.join(',  ').split(' ').join('&nbsp;')}</p>
</main>

`;
  console.log(planet.moons)
  bodyElem.appendChild(infoPage);

}

function closePlanetInfo() {
  const infoPage = document.querySelector('.planet-info-page');
  infoPage.remove();

}
