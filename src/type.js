var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// ✅ Replace with your own OpenWeatherMap API key
var apiKey = "dd2fa0931c9451c317652098ae4cbe0d";
var apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
var airPollutionUrl = "https://api.openweathermap.org/data/2.5/air_pollution";
// ✅ Helper function to change text content inside an element
function setValue(selector, content) {
    var element = document.querySelector(selector);
    if (element) {
        element.innerHTML = content;
    }
}
// ✅ Get references to HTML elements
var weatherIcon = document.getElementById("weatherimg");
var searchBox = document.querySelector("#searchbox");
var airQualityBox = document.querySelector("#quality");
var pmElement = document.querySelector("#pm");
// ✅ Function to update air quality section
function updateAirQuality(data) {
    var pm2_5 = data.list[0].components.pm2_5;
    var aqi = data.list[0].main.aqi;
    console.log("PM2.5:", pm2_5);
    console.log("AQI:", aqi);
    var qualityText = "";
    var colorClass = "";
    switch (aqi) {
        case 1:
            qualityText = "Good";
            colorClass = "text-green";
            break;
        case 2:
            qualityText = "Not Bad";
            colorClass = "text-[#f39c12]";
            break;
        case 3:
            qualityText = "Moderate";
            colorClass = "text-[orangered]";
            break;
        case 4:
            qualityText = "Poor";
            colorClass = "text-[red]";
            break;
        case 5:
            qualityText = "Very Poor";
            colorClass = "text-[red]";
            break;
        default:
            qualityText = "Unknown";
    }
    airQualityBox.innerHTML = "<h2 class=\"".concat(colorClass, "\">").concat(qualityText, "</h2>");
    pmElement.innerHTML = pm2_5.toString();
}
// ✅ Fetch air quality data
function getAirQuality(lat, lon) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("".concat(airPollutionUrl, "?lat=").concat(lat, "&lon=").concat(lon, "&appid=").concat(apiKey))];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    updateAirQuality(data);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error("Error fetching air quality:", error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// ✅ Fetch weather data by city
function checkWeather(city) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, mainWeather, _a, lat, lon, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, fetch("".concat(apiUrl).concat(city, "&appid=").concat(apiKey))];
                case 1:
                    response = _b.sent();
                    if (!response.ok) {
                        showNotification("Enter Correct City Name", "error");
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _b.sent();
                    // ✅ Update weather info in UI
                    setValue("#cityName", data.name);
                    setValue("#temp", "".concat(Math.round(data.main.temp), "\u00B0C"));
                    setValue("#weather", data.weather[0].main);
                    setValue("#humidity", data.main.humidity.toString());
                    setValue("#wind", data.wind.speed.toString());
                    setValue("#pressure", data.main.pressure.toString());
                    mainWeather = data.weather[0].main;
                    if (mainWeather === "Clouds")
                        weatherIcon.src = "images/clouds.png";
                    else if (mainWeather === "Clear")
                        weatherIcon.src = "images/clear.png";
                    else if (mainWeather === "Rain")
                        weatherIcon.src = "images/rain.png";
                    else if (mainWeather === "Drizzle")
                        weatherIcon.src = "images/drizzle.png";
                    else if (mainWeather === "Mist" || mainWeather === "Haze")
                        weatherIcon.src = "images/mist.png";
                    else
                        weatherIcon.src = "images/clear.png";
                    _a = data.coord, lat = _a.lat, lon = _a.lon;
                    return [4 /*yield*/, getAirQuality(lat, lon)];
                case 3:
                    _b.sent();
                    return [3 /*break*/, 5];
                case 4:
                    error_2 = _b.sent();
                    console.error("Error fetching weather:", error_2);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
// ✅ Handle search button click
function handleSearch() {
    showNotification("Getting Data of Weather");
    var city = searchBox.value.trim();
    if (!city) {
        showNotification("Enter your City Name", "error");
        return;
    }
    if (city.length < 3) {
        showNotification("Enter Correct City Name", "error");
        return;
    }
    checkWeather(city);
    searchBox.value = "";
}
// ✅ Toast notification (using Toastify)
function showNotification(msg, type) {
    var bgColor;
    switch (type) {
        case "success":
            bgColor = "linear-gradient(to right, #1D976C, #93F9B9)";
            break;
        case "error":
            bgColor = "linear-gradient(to right, #93291E, #ED213A)";
            break;
        default:
            bgColor = "#000";
    }
    Toastify({
        text: msg,
        duration: 2000,
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
// ✅ Run automatically when page loads
window.onload = function () {
    checkWeather("Faisalabad");
    console.log("Page is fully loaded!");
};
