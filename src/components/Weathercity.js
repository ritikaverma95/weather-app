import React from "react";

const City = ({ weather }) => {
  if (!weather) return null;
  console.log("Weather Data:", weather);

  return (
    <div className="mt-6 text-white">
      {/* Weather Icon & Temp */}
      <div className="mb-6">
        {weather.weather?.[0]?.icon && (
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather icon"
            className="w-24 h-24 mx-auto"
          />
        )}
        <h1 className="text-3xl font-bold">
          {Math.round(weather.main.temp)}°C
        </h1>
        <h2 className="text-lg mt-1 font-medium">{weather.name}</h2>
        <p className="text-sm mt-1 capitalize">
          {weather.weather[0]?.description}
        </p>
      </div>

      {/* Weather Details */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        {/* Humidity */}
        <WeatherCard
          icon="https://cdn-icons-png.flaticon.com/512/728/728093.png"
          value={`${weather.main.humidity}%`}
          label="Humidity"
        />

        {/* Wind Speed (converted to km/h) */}
        <WeatherCard
          icon="https://cdn-icons-png.flaticon.com/512/54/54298.png"
          value={`${(weather.wind.speed * 3.6).toFixed(1)} km/h`}
          label="Wind Speed"
        />
      </div>
    </div>
  );
};

// ✅ Reusable card component
const WeatherCard = ({ icon, value, label }) => (
  <div className="bg-white/20 p-4 rounded-lg shadow-md flex flex-col items-center">
    <img src={icon} alt={label} className="w-8 h-8 mb-2" />
    <p className="text-xl font-semibold">{value}</p>
    <p className="text-sm">{label}</p>
  </div>
);

export default City;
