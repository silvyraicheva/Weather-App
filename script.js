// OpenWeatherMap API key
const API_KEY = "357a8d0f267d897e2e19b8a474c00a5c";

// When the button is clicked it calls the fetchWeather function
document.querySelector("#search-btn").addEventListener("click", (e) => {
    fetchWeather(document.querySelector("#city").value);
});
// Fetches weather data from the OpenWeatherMap API based on a given city name
const fetchWeather = (cityName) => {
    // using Current weather data
    // units=metric so it shows the results in Celsius
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`;
    fetch(URL)
        .then((result) => result.json())
        .then((data) => {
            displayWeather(data);
        })
        .catch((error) => {
            // console.error(error);
            console.log("Please type a valid city name", error);
        });
};
// Updates the results on the page based on the search
const displayWeather = (data) => {
    // extracting information from the json output
    // city name
    const { name } = data;
    // icon and description from the first object in the Weather array
    const { icon, description } = data.weather[0];
    // current temp, what does it feel like and the humidity
    const { temp, humidity, feels_like } = data.main;
    // wind speed
    const { speed } = data.wind;
    console.log(data);
    console.log(name, icon, description, temp, feels_like, humidity, speed);
    // changing the background of the page with a photo from the city that is searched
    document.querySelector(
        "body"
    ).style.backgroundImage = `url(https://source.unsplash.com/random/1600x900/?${name})`;

    document.querySelector(".city").innerText = name;
    document.querySelector(
        "img"
    ).src = `https://openweathermap.org/img/wn/${icon}.png`;
    // parsing the temp data for a cleaner look
    document.querySelector("#temp").innerText = `${parseInt(temp)}°C`;
    document.querySelector("#feels-like").innerText = `Feels like: ${parseInt(
        feels_like
    )}°C`;
    document.querySelector(".desc").innerHTML = description;
    document.querySelector(".humidity").innerHTML = `Humidity: ${humidity}%`;
    document.querySelector(".wind").innerHTML = `Wind: ${speed}km/h`;

    document.querySelector(".weather-card").classList.remove("content");
};
