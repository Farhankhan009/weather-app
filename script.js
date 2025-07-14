const API_KEY = "0e5f9f0f14ed6c65a68a03211b53a199"; // Your OpenWeatherMap API key

const form = document.getElementById("search-form");
const input = document.getElementById("city-input");
const spinner = document.getElementById("spinner");
const weatherInfo = document.getElementById("weather-info");
const locationEl = document.getElementById("location");
const tempEl = document.getElementById("temperature");
const weatherEl = document.getElementById("weather");
const iconEl = document.getElementById("icon");

// 🌈 Background changer function
function updateBackground(weatherType) {
  const body = document.body;

  switch (weatherType.toLowerCase()) {
    case "clear":
      body.style.background = "linear-gradient(to right, #2980b9, #6dd5fa)";
      break;
    case "clouds":
      body.style.background = "linear-gradient(to right, #757f9a, #d7dde8)";
      break;
    case "rain":
    case "drizzle":
      body.style.background = "linear-gradient(to right, #3a6073, #16222a)";
      break;
    case "thunderstorm":
      body.style.background = "linear-gradient(to right, #1f1c2c, #928dab)";
      break;
    case "snow":
      body.style.background = "linear-gradient(to right, #e6dada, #274046)";
      break;
    case "mist":
    case "fog":
      body.style.background = "linear-gradient(to right, #606c88, #3f4c6b)";
      break;
    default:
      body.style.background = "linear-gradient(to right, #0f2027, #203a43, #2c5364)";
      break;
  }
}

// 🔍 Form submit event
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const city = input.value.trim();
  if (!city) return;

  weatherInfo.classList.add("hidden");
  spinner.style.display = "block";

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    if (!res.ok) throw new Error("City not found");

    const data = await res.json();
    locationEl.textContent = data.name;
    tempEl.textContent = Math.round(data.main.temp);
    const weatherType = data.weather[0].main;
    weatherEl.textContent = weatherType;

    const iconCode = data.weather[0].icon;
    iconEl.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    // 🌈 Change background based on weather
    updateBackground(weatherType);

    // 🎬 Animate content
    weatherInfo.classList.remove("hidden");
    document.querySelectorAll(".fade").forEach((el) => {
      el.style.animation = "none";
      el.offsetHeight; // trigger reflow
      el.style.animation = null;
    });

  } catch (err) {
    alert(err.message);
  } finally {
    spinner.style.display = "none";
    input.value = "";
  }
});
