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
    console.log(planets);

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
    console.log(getPlanetsInfo);

    if (getPlanetsInfo) {
      getPlanetsInfo.addEventListener("click", () => {
        console.log('clicked planet');
        displayPlanetInfo(planet);
      });
    }
  });
}


//bara temporärt
function displayPlanetInfo(planet) {
  alert(`
  ${planet.name}
  ${planet.type}
  ${planet.rotation}
  ${planet.latinName}
  ${planet.temp.day - planet.temp.night}
  ${planet.circumference}
  ${planet.distance}
  ${planet.orbitalPeriod}
  ${planet.desc}
  ${planet.moons}`);
}
