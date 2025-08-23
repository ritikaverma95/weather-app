import React, { useState, useEffect } from "react";
import City from "./Weathercity";

const Weather = () => {
  const [city, setCity] = useState("Delhi");
  const [selectedCity, setSelectedCity] = useState("Delhi");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_BASE = "https://weather-app-901d.onrender.com";

  useEffect(() => {
    if (selectedCity) {
      setLoading(true);

      const fetchWeather = (retry = false) => {
        fetch(`${API_BASE}/weather?city=${selectedCity}`)
          .then((res) => res.json())
          .then((data) => {
            if (data.cod === 200) {
              setWeather(data);
              setError(null);
            } else {
              setWeather(null);
              setError(data.message || "City not found");
            }
            setLoading(false);
          })
          .catch(() => {
            if (!retry) {
              setTimeout(() => fetchWeather(true), 2000);
            } else {
              setError("Failed to fetch weather data");
              setLoading(false);
            }
          });
      };

      fetchWeather();
    }
  }, [selectedCity]);

  const handleSearch = () => {
    if (city.trim() !== "") {
      setSelectedCity(city.trim());
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  // ✅ Use background image classes from tailwind.css
  const getBackground = () => {
    if (!weather || !weather.weather) return "bg-sunny"; // default sunny

    const condition = weather.weather[0].main.toLowerCase();
    if (condition.includes("clear")) return "bg-sunny";
    if (condition.includes("cloud")) return "bg-cloudy";
    if (condition.includes("rain")) return "bg-rainy";
    if (condition.includes("snow")) return "bg-snowy";

    return "bg-sunny";
  };

  const getTitleColor = () => {
    if (!weather || !weather.weather) return "text-blue-200";
    const condition = weather.weather[0].main.toLowerCase();
    if (condition.includes("clear"))
      return "text-yellow-300 drop-shadow-md";
    if (condition.includes("cloud"))
      return "text-gray-200 drop-shadow-md";
    if (condition.includes("rain"))
      return "text-blue-200 drop-shadow-md";
    if (condition.includes("snow"))
      return "text-white drop-shadow-md";
    return "text-blue-200";
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-blue-600">
      <h1 className="text-5xl sm:text-6xl font-extrabold mb-3 text-blue-900 text-center drop-shadow-xl tracking-wide">
        Live Weather Updates 🌤
      </h1>
      <p className="text-gray-600 mb-6 italic text-center text-base sm:text-lg">
        "Check temperature, humidity & wind in real-time"
      </p>

      {/* Weather Card */}
      <div
        className={`relative w-full max-w-md p-6 mx-auto rounded-3xl shadow-2xl transition-all duration-700 ${getBackground()} bg-cover bg-center text-white`}
      >
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-3xl z-20">
            <div className="w-14 h-14 border-4 border-white/80 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        <div className="relative z-10 text-center">
          <h1
            className={`text-3xl sm:text-4xl text-blue-900 font-bold mb-6 flex items-center justify-center gap-3 ${getTitleColor()}`}
          >
            🌍 Weather App
          </h1>

          <div className="flex items-center justify-between bg-white rounded-full overflow-hidden shadow-lg mb-6">
            <input
              type="text"
              placeholder="Enter City Name"
              spellCheck="false"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 px-5 py-3 text-gray-700 focus:outline-none text-sm sm:text-base"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-500 hover:bg-blue-600 px-5 py-3 flex items-center justify-center transition"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/622/622669.png"
                alt="search"
                className="w-5 h-5 invert"
              />
            </button>
          </div>

          {error && !loading && (
            <p className="text-red-400 font-semibold">{error}</p>
          )}
          {weather && !loading && <City weather={weather} />}

          {weather && weather.weather && !loading && (
            <p className="text-lg font-semibold mt-5 drop-shadow-lg">
              {weather.weather[0].main.toLowerCase().includes("clear") &&
                "☀ The weather is Clear"}
              {weather.weather[0].main.toLowerCase().includes("cloud") &&
                "🌥 The weather is Cloudy"}
              {weather.weather[0].main.toLowerCase().includes("rain") &&
                "🌧 The weather is Rainy"}
              {weather.weather[0].main.toLowerCase().includes("snow") &&
                "❄ The weather is Snowy"}
              {!["clear", "cloud", "rain", "snow"].some((c) =>
                weather.weather[0].main.toLowerCase().includes(c)
              ) && `🌍 Weather is ${weather.weather[0].main}`}
            </p>
          )}
        </div>
      </div>

      <p className="text-gray-500 text-sm mt-6 text-center italic">
        🌍 Powered by{" "}
        <span className="font-semibold text-blue-700">OpenWeatherMap</span>
      </p>
    </div>
  );
};

export default Weather;
