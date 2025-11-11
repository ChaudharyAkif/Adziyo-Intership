"use strict";
const apiKey = "YOUR_API_KEY";
const airpollutionUrl = "https://api.openweathermap.org/data/2.5/air_pollution";
const updateAirQuality = (data) => {
    const pm2_5 = data.list[0].components.pm2_5;
    const aqi = data.list[0].main.aqi;
    console.log("PM2.5:", pm2_5);
    console.log("Air Quality Index (AQI):", aqi);
};
const getAirQuality = async (lon, lat) => {
    try {
        const response = await fetch(`${airpollutionUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error(`Error fetching air quality data: ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Air Quality Data:", data);
        updateAirQuality(data);
    }
    catch (error) {
        console.error("Error:", error);
    }
};
// Example usage:
getAirQuality(73.0479, 33.6844); // longitude, latitude (Islamabad)
