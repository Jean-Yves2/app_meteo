/* eslint-disable no-undef */
"use Script";

document.addEventListener("DOMContentLoaded",()=>{

  let form = document.getElementById("name_form");
  let nom_de_ville = document.querySelector('#nom_de_ville');

  form.addEventListener("submit",function(event){

    event.preventDefault();
    meteo(nom_de_ville);
    form.reset();

  });


  function meteo(nom_de_ville){
    fetch(`http://api.weatherstack.com/current?access_key=${API_KEY}&query=${nom_de_ville.value}`)

      .then(response => response.json())
      .then(response=>{
        console.log(response);

        let ville =response['location']['name'];
        let temperature=response['current']['temperature'];
        let vitesse_du_vent =response['current']['wind_speed'];

        let humidity =response['current']['humidity'];
        let pressure = response['current']['pressure'];
        let countryName= response['location']['country'];

        //time with dayjs
        let time = response['location']['localtime'];
        console.log(time);

        const dateOrigin = dayjs(time, "YYYY-MM-DD HH:mm");
        const formattedDate = dateOrigin.format("dddd, D MMMM YYYY");
        console.log(formattedDate);

        const img=document.querySelector("img");
        img.src = response['current']['weather_icons'];

        let is_day =response['current']['is_day'];
        backgroundPage = document.getElementById('background');

        backgroundPage.classList.remove("night", "day", "default_page");
        console.log(is_day);
        if(is_day=='no'){
          backgroundPage.classList.add('night');
        }else{
          backgroundPage.classList.add('day');
        }


        document.getElementById("name_ville").innerHTML =ville;
        document.getElementById("temp").innerHTML =temperature+"°C";
        document.getElementById("vitesse").innerHTML =vitesse_du_vent;

        document.getElementById("humidity").innerHTML =humidity+"%";
        document.getElementById("country").innerHTML = countryName;
        document.getElementById("pressure").innerHTML = pressure;

        document.getElementById("date").innerHTML = formattedDate;

      });
  }
}




);
