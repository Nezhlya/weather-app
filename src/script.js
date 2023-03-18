let currentDate = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let p = document.querySelector("p.date");
let day = days[currentDate.getDay()];
let hour = currentDate.getHours();
if (hour < 10) {
  hour = "0" + hour;
}
let minutes = currentDate.getMinutes();
if (minutes < 10) {
  minutes = "0" + minutes;
}

p.innerHTML = `${day}, ${hour}:${minutes}`;

function enterCity(event) {
  event.preventDefault();
  let apiKey = "fda3688b1db05987dd5d07c237aecfba";
  let city = document.querySelector("input.city").value;
  let h1City = document.querySelector("p.userCity");
  h1City.innerHTML = city.charAt(0).toUpperCase() + city.slice(1);
  apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}
let form = document.querySelector("#searchCity");
form.addEventListener("submit", enterCity);

function showWeather(response) {
  console.log(response);
  let temp = document.querySelector("span#temp");
  temp.innerHTML = `Currently 
  ${Math.round(response.data.main.temp)}℃`;

  let h1City = document.querySelector("p.userCity");
  h1City.innerHTML = response.data.name;

  let feels = document.querySelector("div#feels.col");
  feels.innerHTML = `Feels like ${Math.round(
    response.data.main.feels_like
  )}℃`;

  let humidity = document.querySelector("div#humidity.col");
  humidity.innerHTML = `Humidity ${response.data.main.humidity}%`;

  let wind = document.querySelector("div#wind.col");
  wind.innerHTML = `Wind speed ${Math.round(response.data.wind.speed)}km/h`;

  let weatherIcon = document.querySelector("#icon");
  let iconCode = response.data.weather[0].icon;
  let iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  $(weatherIcon).attr("src", iconUrl);
}

let currentLocation = document.querySelector("button#location");
currentLocation.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition((position) => {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey = "fda3688b1db05987dd5d07c237aecfba";
    apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    axios.get(apiUrl).then(showWeather);
  });
});
