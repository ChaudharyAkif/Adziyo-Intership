const apiKey: string = "dd2fa0931c9451c317652098ae4cbe0d  ";
const apiUrl: string =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const airpollutionUrl: string =
  "http://api.openweathermap.org/data/2.5/air_pollution";

let getValue = (val: string, content: string): void => {
  let elment = document.querySelector<HTMLElement>(val);
  if (elment) {
    elment.innerHTML = content;
  }
};

const weathericon = document.getElementById("weatherimg") as HTMLImageElement;
const searchbox = document.querySelector("#searchbox") as HTMLInputElement;
let AirQualitybox = document.querySelector("#quality") as HTMLElement;
let pm = document.querySelector("#pm") as HTMLElement;

let AirQuality = async (lat: number, lon: number): Promise<void> => {
  try {
    let response = await fetch(
      airpollutionUrl + `?lat=${lat}` + `&lon=${lon}` + `&appid=${apiKey}`
    );
    console.log(response);
    let data: any = await response.json();
    console.log("data", data);
    updateAirQulaity(data);
  } catch (e) {
    console.log(e);
  }
};

interface AqiType {
  aqi: number;
}
interface AirQualityPm {
  pm2_5: number;
}
interface AirQualityInnerPart {
  main: AqiType;
  components: AirQualityPm;
}
interface AirQualityList {
  list: AirQualityInnerPart[];
}

let updateAirQulaity = (data: AirQualityList) => {
  let pm2_5 = data.list[0].components.pm2_5;
  console.log(pm2_5);
  let aq1 = data.list[0].main.aqi;
  console.log("asas", pm2_5);
  console.log("asas", aq1);
  if (aq1 === 1) {
    AirQualitybox.innerHTML = `<h2 class="text-green">Good</h2>`;
    pm.innerHTML = `${pm2_5}`;
    return;
  }
  if (aq1 === 2) {
    AirQualitybox.innerHTML = `<h2 class="text-[#f39c12]">Not Bad</h2>`;
    pm.innerHTML = `${pm2_5}`;
    return;
  }
  if (aq1 === 3) {
    AirQualitybox.innerHTML = `<h2 class="text-[orangered]">Moderate</h2>`;
    pm.innerHTML = `${pm2_5}`;
    return;
  }
  if (aq1 === 4) {
    AirQualitybox.innerHTML = `<h2 class="text-[red]">Poor</h2>`;
    pm.innerHTML = `${pm2_5}`;
    return;
  }
  if (aq1 < 5) {
    AirQualitybox.innerHTML = `<h2 class="text-[red]">Very Poor</h2>`;
    pm.innerHTML = `${pm2_5}`;
    return;
  }
};

let checkWeather = async (city: string): Promise<void> => {
  let response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  // console.log(response)
  if (!response.ok) {
    showNotification("Enter Correct City Name", "error");
  }
  let data = await response.json();
  // console.log(data);
  getValue("#cityName", data.name);
  getValue("#temp", Math.round(data.main.temp) + "°C");
  getValue("#weather", data.weather[0].main);
  getValue("#humidity", data.main.humidity);
  getValue("#wind", data.wind.speed);
  getValue("#pressure", data.main.pressure);
  console.log(data.main.pressure);
  if (data.weather[0].main === "Clouds") {
    weathericon.src = "images/clouds.png";
  } else if (data.weather[0].main === "Clear") {
    weathericon.src = "images/clear.png";
  } else if (data.weather[0].main === "Rain") {
    weathericon.src = "images/rain.png";
  } else if (data.weather[0].main === "Drizzle") {
    weathericon.src = "images/drizzle.png";
  } else if (
    data.weather[0].main === "Mist"
    // (data.weather[0].main === "Haze")
  ) {
    weathericon.src = "images/mist.png";
  } else {
    weathericon.src = "images/clear.png";
  }

  let { lat, lon } = data.coord;
  // console.log(lat, lon);
  let a = AirQuality(lat, lon);
  // console.log(a);
};

let handleSearch = () => {
  showNotification("getting Data of Weather", "success");

  let getingvalueinout = searchbox.value;
  if (!getingvalueinout) {
    return showNotification("ENTER YOUR cITY nAME", "error");
  }
  if (getingvalueinout.length < 3) {
    return showNotification("Enter Correct City Name ", "error");
  }
  setTimeout(() => {
    checkWeather(getingvalueinout);
  }, 100);
  console.log(getingvalueinout);
  showNotification("successfully done", "success");

  searchbox.value = " ";
};

function showNotification(msg: string, type: string) {
  let bgColor;
  switch (type) {
    case "success":
      bgColor = "Linear-gradient(to right ,#1D976C,#93f989";
      break;
    case "error":
      bgColor = "Linear-gradient(to right ,#93291e,#ed213a";
      break;
    default:
      bgColor = "#000";
  }
  Toastify({
    text: msg,
    duration: 100,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
      background: bgColor,
      color: "#fff",
    },
  }).showToast();
}

window.onload = function () {
  checkWeather("Faisalabad");
  console.log("Page is fully loaded!");
};
