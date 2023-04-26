/* eslint-disable no-undef */
"use Script";


document.addEventListener("DOMContentLoaded",()=>{
// eslint-disable-next-line no-unused-vars




  let nom_de_ville = document.querySelector('#nom_de_ville');
  let valide =document.querySelector('#valide');

  // eslint-disable-next-line no-unused-vars
  valide.addEventListener('click', (event) => meteo(nom_de_ville));

  function meteo(){
    fetch(`http://api.weatherstack.com/current?access_key=${process.env.API_KEY}&query=${nom_de_ville.value}`)

      .then(response => response.json())
      .then(response=>{
        let ville =response['location']['name'];
        console.log(ville);
        let temperature=response['current']['temperature'];
        console.log(temperature);
        let vitesse_du_vent =response['current']['wind_speed'];
        console.log(vitesse_du_vent);
        const img=document.querySelector("img");
        img.src = response['current']['weather_icons'];


        document.getElementById("temp").innerHTML =temperature+"°C";
        document.getElementById("name_ville").innerHTML =ville;
        document.getElementById("vitesse").innerHTML =vitesse_du_vent;
      });
  }
}




);
