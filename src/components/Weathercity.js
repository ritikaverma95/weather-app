import React from "react";

// ✅ Reusable Weather Details Card
const WeatherCard = ({ icon, value, label }) => (
  <div className="bg-white/20 backdrop-blur-lg p-5 rounded-2xl shadow-lg flex flex-col items-center transition-all duration-300 hover:scale-105 hover:bg-white/30">
    <img
      src={icon}
      alt={label}
      className="w-10 h-10 mb-2 drop-shadow-md animate-pulse"
    />
    <p className="text-2xl font-bold">{value}</p>
    <p className="text-sm text-gray-100 mt-1">{label}</p>
  </div>
);

const City = ({ weather }) => {
  if (!weather) return null;

  return (
    <div className="flex flex-col items-center justify-center text-white transition-all duration-700">
      {/* Weather Icon & Temp */}
      <div className="mb-6 text-center">
        {weather.weather?.[0]?.icon && (
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
            alt="weather icon"
            className="w-28 h-28 mx-auto drop-shadow-lg animate-bounce"
          />
        )}
        <h1 className="text-6xl font-extrabold mt-3 drop-shadow-xl">
          {Math.round(weather.main.temp)}°C
        </h1>
        <h2 className="text-2xl font-semibold mt-2 tracking-wide">
          {weather.name}, {weather.sys?.country}
        </h2>
        <p className="text-base mt-2 capitalize text-gray-200 italic">
          {weather.weather[0]?.description}
        </p>
      </div>

      {/* Weather Details */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-4 w-full max-w-lg">
        <WeatherCard
          icon="https://cdn-icons-png.flaticon.com/512/728/728093.png"
          value={`${weather.main.humidity}%`}
          label="Humidity"
        />
        <WeatherCard
          icon="https://cdn-icons-png.flaticon.com/512/54/54298.png"
          value={`${(weather.wind.speed * 3.6).toFixed(1)} km/h`}
          label="Wind Speed"
        />
        <WeatherCard
          icon="https://cdn-icons-png.flaticon.com/512/481/481455.png"
          value={`${weather.main.pressure} hPa`}
          label="Pressure"
        />
        <WeatherCard
          icon="https://cdn-icons-png.flaticon.com/512/869/869869.png"
          value={`${Math.round(weather.main.temp_min)}°C`}
          label="Min Temp"
        />
        <WeatherCard
          icon="https://cdn-icons-png.flaticon.com/512/869/869869.png"
          value={`${Math.round(weather.main.temp_max)}°C`}
          label="Max Temp"
        />
        <WeatherCard
          icon="https://cdn-icons-png.flaticon.com/512/2938/2938158.png"
          value={`${weather.clouds?.all}%`}
          label="Cloudiness"
        />
      </div>

      {/* Feels Like */}
      <p className="mt-6 text-lg text-gray-200 italic drop-shadow-md">
        🌡 Feels like{" "}
        <span className="font-semibold text-white">
          {Math.round(weather.main.feels_like)}°C
        </span>
      </p>
    </div>
  );
};

export default City;
