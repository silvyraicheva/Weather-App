// OpenWeatherMap API key
const API_KEY = "357a8d0f267d897e2e19b8a474c00a5c";
// When the button is clicked it calls the fetchWeather function
const searchBtn = document.querySelector("#search-btn");
searchBtn.addEventListener("click", (e) => {
    let city = document.querySelector("#city").value;
    if (!city) {
        alert("Please enter a city");
    } else {
        fetchWeather(city);
        e.target.style.cursor = "wait";
    }
});

searchBtn.addEventListener("mouseenter", (e) => {
    e.target.style.cursor = "pointer";
});
searchBtn.addEventListener("mouseleave", (e) => {
    e.target.style.cursor = "default";
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
            alert("Please type a valid city name");
            console.log(error);
        });
    // using 5 day weather forecast
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${API_KEY}`;
    fetch(forecastURL)
        .then((result) => result.json())
        .then((data) => {
            displayForecast(data.list);
        })
        .catch((error) => {
            // alert("Error fetching forecast");

            console.error(error);
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

    // console.log(name, icon, description, temp, feels_like, humidity, speed);
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
    document.querySelector(".wind").innerHTML = `Wind: ${speed}m/s`;

    document.querySelector(".weather-card").classList.remove("hidden");
};
// Displays the forecast for the next 24 hours
const displayForecast = (data) => {
    document.querySelector(".hourly-container").innerHTML = "";
    // weather in the next 24 hours (3h intervals)
    let next24 = data.slice(0, 8);
    console.log(next24);
    // extracting the hour, temp and icon and creating a new element card to add to the forecast section
    next24.forEach((item) => {
        // Convert timestamp to milliseconds
        const dateTime = new Date(item.dt * 1000);
        const hour = dateTime.getHours();
        const date = item.dt_txt.substr(0, 10);
        const { temp } = item.main;
        const { icon } = item.weather[0];

        const newItem = `
        <div class="hourly-card">
            <span>${date}</span>
            <span>${hour}:00h</span>
            <img src="https://openweathermap.org/img/wn/${icon}.png" alt="">
            <span>${parseInt(temp)}°C</span>
        </div>`;

        document.querySelector(".hourly-container").innerHTML += newItem;
    });
};
