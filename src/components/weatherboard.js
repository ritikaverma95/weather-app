import React, { useState, useEffect } from "react";
import City from "./weathercity";

const Weather = () => {
  const [city, setCity] = useState("Delhi"); // default city
  const [selectedCity, setSelectedCity] = useState("Delhi");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  // ✅ Fetch weather from Flask backend instead of exposing API key
  useEffect(() => {
    if (selectedCity) {
      fetch(`http://127.0.0.1:5000/weather?city=${selectedCity}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.cod === 200) {
            setWeather(data);
            setError(null);
          } else {
            setWeather(null);
            setError(data.message || "City not found");
          }
        })
        .catch(() => setError("Failed to fetch weather data"));
    }
  }, [selectedCity]);

  const handleSearch = () => {
    if (city.trim() !== "") {
      setSelectedCity(city.trim());
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // ✅ Your original background logic
  const getBackground = () => {
    if (!weather || !weather.weather)
      return "bg-gradient-to-b from-blue-400 to-blue-700";

    const condition = weather.weather[0].main.toLowerCase();
    if (condition.includes("clear")) return "bg-sunny";
    if (condition.includes("cloud")) return "bg-cloudy";
    if (condition.includes("rain")) return "bg-rainy";
    if (condition.includes("snow")) return "bg-snowy";
    return "bg-gradient-to-b from-blue-400 to-blue-700";
  };

  // ✅ Dynamic title color
  const getTitleColor = () => {
    if (!weather || !weather.weather) return "text-blue-500";
    const condition = weather.weather[0].main.toLowerCase();
    if (condition.includes("clear")) return "text-yellow-400";
    if (condition.includes("cloud")) return "text-gray-300";
    if (condition.includes("rain")) return "text-blue-300";
    if (condition.includes("snow")) return "text-white";
    return "text-blue-500";
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-blue-600">
      {/* Page Heading */}
      <h1 className="text-4xl font-extrabold mb-2 drop-shadow-md text-blue-900">
        Live Weather Updates 🌤
      </h1>
      <p className="text-gray-600 mb-6 italic">
        "Check temperature, humidity & wind in real-time"
      </p>

      {/* Weather Card */}
      <div
        className={`relative w-96 max-w-full p-6 mx-auto rounded-2xl shadow-2xl m-10 transition-all duration-500 overflow-hidden ${getBackground()}`}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 rounded-2xl"></div>

        {/* Content */}
        <div className="relative z-10 text-white text-center">
          <h1
            className={`text-3xl font-bold mb-6 flex items-center justify-center gap-2 drop-shadow-md ${getTitleColor()}`}
          >
            🌤 <span>Weather App</span>
          </h1>

          {/* Search Bar */}
          <div className="flex items-center justify-between bg-white rounded-lg overflow-hidden shadow-md mb-6">
            <input
              type="text"
              placeholder="Enter City Name"
              spellCheck="false"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 px-4 py-2 text-gray-700 focus:outline-none"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 flex items-center justify-center"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/622/622669.png"
                alt="search"
                className="w-5 h-5"
              />
            </button>
          </div>

          {/* Weather Display */}
          {error && <p className="text-red-400 font-semibold">{error}</p>}
          {selectedCity && <City name={selectedCity} />}
          {weather && weather.weather && (
            <p className="text-lg font-semibold mt-4">
              {weather.weather[0].main.toLowerCase().includes("clear") &&
                "☀ Weather is Clear"}
              {weather.weather[0].main.toLowerCase().includes("cloud") &&
                "🌥 Weather is Cloudy"}
              {weather.weather[0].main.toLowerCase().includes("rain") &&
                "🌧 Weather is Rainy"}
              {weather.weather[0].main.toLowerCase().includes("snow") &&
                "❄ Weather is Snowy"}
              {!["clear", "cloud", "rain", "snow"].some((c) =>
                weather.weather[0].main.toLowerCase().includes(c)
              ) && `🌍 Weather is ${weather.weather[0].main}`}
            </p>
          )}
        </div>
      </div>

      {/* Footer */}
      <p className="text-gray-500 text-sm mt-4">
        🌍 Powered by <span className="font-semibold">OpenWeatherMap</span>
      </p>
    </div>
  );
};

export default Weather;
