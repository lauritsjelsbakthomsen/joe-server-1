let btn = document.getElementById("fetchButton");
let responeParagraph = document.getElementById("response");
let responseTime = document.getElementById("responseTime");

console.log(responeParagraph);

console.log(btn);

async function fetchData(url) {
  try {
    let response = await fetch(url, {
      headers: {
        "Cache-Control": "no-cache",
      },
    });

    if (!response.ok) {
      throw new Error();
    }

    console.log("Headers");

    console.log(response.headers);

    console.log(`Response time ${response.headers.get("X-Response-Time")}`);

    responseTime.textContent = `Response time for ${
      response.url
    }, ${response.headers.get("X-Response-Time")}`;

    console.log(
      `Size of response body in bytes ${response.headers.get("Content-Length")}`
    );

    console.log(`Date ${response.headers.get("Date")}`);

    console.log(navigator.userAgent);

    responeParagraph.textContent =
      "URL " + response.url + " og status er " + response.status;
  } catch (error) {
    console.log(error);
  }
}

// Ping server:

async function resTime() {
  try {
    let response = await fetch("/");

    if (!response.ok) {
      throw new Error("could not ping");
    }

    console.log(response);

    console.log(
      `Response time (Ping) ${response.headers.get("X-Response-Time")}`
    );
  } catch (error) {
    console.log(error);
  }
}

async function RTT() {
  let currentDate = Date.now();
  //console.log(`Current date ${currentDate}`);
  console.log("PING");

  try {
    let response = await fetch("/res");

    if (response.ok) {
      let endTime = Date.now();
      let RTT = endTime - currentDate;

      let data = await response.json();

      let responseTime = endTime - data.time;

      console.log(`RTT time: ${RTT} ms`);

      console.log(`Response time: ${responseTime} ms`);
    }
  } catch (error) {
    console.log("Der skete en fejl");
  }
}

async function fetchLocation() {
  try {
    const locationName = "Sydney";
    let url = `https://nominatim.openstreetmap.org/search?q=${locationName}&format=json&addressdetails=1`;

    let response = await fetch(url);

    if (!response.ok) {
      throw new Error();
    }
    let data = await response.json();

    console.log(data[0]);

    console.log(`Lon: ${data[0].lon}`);

    let long = data[0].lon;

    console.log(`Lat: ${data[0].lat}`);

    let lat = data[0].lat;

    console.log(data[0].address.city);

    await fetchWeather(long, lat);

    await postCookie(data[0].address.city);
  } catch (error) {
    console.log(error);
  }
}

async function fetchWeather(long, lat) {
  try {
    let url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,is_day,rain,snowfall&hourly=temperature_2m,rain,surface_pressure&daily=sunrise,sunset,daylight_duration,sunshine_duration,uv_index_max,rain_sum,shortwave_radiation_sum`;

    let response = await fetch(url);

    if (!response.ok) {
      throw new Error();
    }
    let data = await response.json();

    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

async function postCookie(location) {
  let data = {
    location: location,
  };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  let url = "/cookie";
  try {
    let response = await fetch(url, options);

    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

btn.addEventListener("click", async () => {
  console.log("click");
  await fetchData("/res");
  await fetchLocation();
  //RTT();
  let counter = 0;
  const intervalID = setInterval(() => {
    counter++;
    RTT();
    if (counter >= 10) {
      clearInterval(intervalID);
    }
  }, 1000);
});
