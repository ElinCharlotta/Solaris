const planetsElem = document.querySelector('.planets')


const BASE_URL = 'https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/'
//const API_KEY= 'solaris-1Cqgm3S6nlMechWO'

/* async function getApiKey(){
  let resp = await fetch("https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/keys", {
    method: "POST"
  });
}
getApiKey() */

async function getSolarisPlanets() {
  let resp = await fetch("https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies", {
    method: "GET",
    headers: { "x-zocom": "solaris-1Cqgm3S6nlMechWO" },
  });
  const data = await resp.json()
  console.log(data);

  let planets = data.bodies;
  console.log(planets)
  showPlanetsInfo(planets)
}
getSolarisPlanets();

//dynamiskt -  loopa igenom - matcha ihop direkt med HTML

//ersätter bilden med infotext.inte riktigt det vi vill göra
function showPlanetsInfo(planets) {
  planets.forEach(planet => {
    const planetElem = document.querySelector(`.${planet.name.toLowerCase()}`);
    if (planetElem) {
      planetElem.innerHTML = `        
      <p>ID: ${planet.id}</p>
      <p>Name: ${planet.name}</p>
      <p>Latin Name: ${planet.latinName}</p>`

    }
  });
}