bodyElem = document.querySelector('body');
const planetsContainer = document.querySelector('.wrapper');
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


//Tips från Christoffer dynamiskt -  loopa igenom - matcha ihop direkt med HTML
function showPlanetsInfo(planets) {
  // Ta bort imgg-tagg i loopen så letar loopen efter class som passar ihop med name i planets - array 
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

  <button class="close-button" onclick="closePlanetInfo()">&times;</button>

<h1 class='planet-name'>${planet.name}</h2>
<h2 class='planet-latin-name'>${planet.latinName}</h2>
<p class='planet-description'>${planet.desc}</p>
<p class='planet-circumference'> ${planet.circumference}</p>
<p class='planet-distance'>${planet.distance}</p>
<p class='planet-temp-day'>${planet.temp.day}</p>
<p class='planet-temp-night'>${planet.temp.night}</p>
<p class='planet-moon'>${planet.moons}</p>
`;

  bodyElem.appendChild(infoPage);

}

function closePlanetInfo() {
  const infoPage = document.querySelector('.planet-info-page');
  infoPage.remove();

}




