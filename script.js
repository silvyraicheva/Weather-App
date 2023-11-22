const API_KEY = "357a8d0f267d897e2e19b8a474c00a5c";

document.querySelector("#search-btn").addEventListener("click", (e) => {
    fetchWeather(document.querySelector("#city").value);
});

const fetchWeather = (cityName) => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`;
    fetch(URL)
        .then((result) => result.json())
        .then((data) => {
            displayWeather(data);
        })
        .catch((error) => {
            console.error("Error fetching data: ", error);
        });
};
const displayWeather = (data) => {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity, feels_like } = data.main;
    const { speed } = data.wind;
    console.log(name, icon, description, temp, humidity, speed);
    document.querySelector(
        "body"
    ).style.backgroundImage = `url(https://source.unsplash.com/random/1600x900/?${name})`;
    document.querySelector(".city").innerText = name;
    document.querySelector(
        "img"
    ).src = `https://openweathermap.org/img/wn/${icon}.png`;
    document.querySelector("#temp").innerText = `${parseInt(temp)}°C`;
    document.querySelector("#feels-like").innerText = `Feels like: ${parseInt(
        feels_like
    )}°C`;
    document.querySelector(".desc").innerHTML = description;
    document.querySelector(".humidity").innerHTML = `Humidity: ${humidity}%`;
    document.querySelector(".wind").innerHTML = `Wind: ${speed}km/h`;

    document.querySelector(".weather-card").classList.remove("content");
};
