/* eslint-disable no-undef */
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  let form = document.getElementById("name_form");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    const nom_de_ville = document.querySelector("#nom_de_ville").value;

    try {
      const response = await fetch(`/weather?cityName=${nom_de_ville}`);
      const data = await response.json();

      let ville = data.location.name;
      let temperature = data.current.temperature;
      let vitesse_du_vent = data.current.wind_speed;

      let humidity = data.current.humidity;
      let pressure = data.current.pressure;
      let countryName = data.location.country;

      const dateOrigin = dayjs(data.location.localtime, "YYYY-MM-DD HH:mm");
      const formattedDate = dateOrigin.format("dddd, D MMMM YYYY");

      const img = document.querySelector("img");
      img.src = data.current.weather_icons[0];

      let is_day = data.current.is_day;
      const backgroundPage = document.getElementById("background");

      backgroundPage.classList.remove("night", "day", "default_page");

      if (is_day == "no") {
        backgroundPage.classList.add("night");
      } else {
        backgroundPage.classList.add("day");
      }

      document.getElementById("name_ville").innerHTML = ville;
      document.getElementById("temp").innerHTML = temperature + "°C";
      document.getElementById("vitesse").innerHTML = vitesse_du_vent;

      document.getElementById("humidity").innerHTML = humidity + "%";
      document.getElementById("country").innerHTML = countryName;
      document.getElementById("pressure").innerHTML = pressure;

      document.getElementById("date").innerHTML = formattedDate;
    } catch (error) {
      console.error(error);
    }

    form.reset();
  });
});
