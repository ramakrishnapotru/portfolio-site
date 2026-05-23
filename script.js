alert("JS Working");

const apiKey = "eeb07b3a35dcf1bb990b736d2f03d8c1";

const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", async () => {

    const city =
    document.getElementById("cityInput").value;

    const response =
    await fetch(
`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    const data =
    await response.json();

    console.log(data);

    document.getElementById("cityName").textContent =
    data.name;

    document.getElementById("temperature").textContent =
    "Temperature: " + data.main.temp + "°C";

    document.getElementById("humidity").textContent =
    "Humidity: " + data.main.humidity + "%";

    document.getElementById("windSpeed").textContent =
    "Wind Speed: " + data.wind.speed + " m/s";

    document.getElementById("weatherCondition").textContent =
    "Condition: " + data.weather[0].main;

});
document.body.style.background =
"linear-gradient(135deg,#0f172a,#1e3a8a)";