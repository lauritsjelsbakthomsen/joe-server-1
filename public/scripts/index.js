let responseDom = document.getElementById("response");

let btn = document.getElementById("fetchButton");

let responeParagraph = document.getElementById("response");

console.log(responeParagraph);

console.log(btn);

async function fetchData(url) {
  try {
    let response = await fetch(url);

    if (!response.ok) {
      throw error;
    }
    let data = await response;

    console.log(data);

    responeParagraph.textContent =
      "URL " + response.url + " og status er " + response.status;
  } catch (error) {
    console.log(error);
  }
}

async function fetchLocation() {
  try {
    const locationName = "Copenhagen";
    let url = `https://nominatim.openstreetmap.org/search?q=${locationName}&format=json&addressdetails=1
`;

    let response = await fetch(url);

    if (!response.ok) {
      throw error;
    }
    let data = await response.json();

    console.log(data[0]);

    console.log(`Lon: ${data[0].lon}`);

    let long = data[0].lon;

    console.log(`Lat: ${data[0].lat}`);

    let lat = data[0].lat;

    fetchWeather(long, lat);
  } catch (error) {
    console.log(error);
  }
}

async function fetchWeather(long, lat) {
  try {
    let url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,is_day,rain,snowfall&hourly=temperature_2m,rain,surface_pressure&daily=sunrise,sunset,daylight_duration,sunshine_duration,uv_index_max,rain_sum,shortwave_radiation_sum`;

    let response = await fetch(url);

    if (!response.ok) {
      throw error;
    }
    let data = await response.json();

    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

btn.addEventListener("click", function () {
  console.log("click");
  fetchData("/res");
  fetchLocation();
});
