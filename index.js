//const API_KEY= 'solaris-1Cqgm3S6nlMechWO'

/* async function getApiKey(){
  let resp = await fetch("https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/keys", {
    method: "POST"
  });
}
getApiKey() */

async function getSolarisPlanets() {
  try 
  {
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
// note to self, hur ska vi få in solen i detta? den har ju ingen img-tagg
  planets.forEach(planet => {
      const findPlanetsImage = document.querySelector(`.${planet.name.toLowerCase()} img`); 
      console.log(findPlanetsImage);

      if (findPlanetsImage) {
        findPlanetsImage.addEventListener("click", () => {
              console.log('clicked planet');
              displayPlanetInfo(planet);
          });
      }
  });
}


//bara temporärt
function displayPlanetInfo(planet) {
  alert(`Planet Name: ${planet.name}\nPlanet Type: ${planet.type}\nPlanet temp: ${planet.temp.day}`);
}



