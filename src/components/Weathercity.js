import React from "react";

const City = ({ weather }) => {
  if (!weather) return null;

  return (
    <div className="mt-6 text-white">
      {/* Weather Icon & Temp */}
      <div className="mb-6">
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt="weather icon"
          className="w-24 h-24 mx-auto"
        />
        <h1 className="text-3xl font-bold">{Math.round(weather.main.temp)}°C</h1>
        <h2 className="text-lg mt-1">{weather.name}</h2>
      </div>

      {/* Weather Details */}
      <div className="grid grid-cols-2 gap-6 mt-6">
        {/* Humidity */}
        <div className="bg-white/20 p-4 rounded-lg shadow-md flex flex-col items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/728/728093.png"
            alt="humidity"
            className="w-8 h-8 mb-2"
          />
          <p className="text-xl font-semibold">{weather.main.humidity}%</p>
          <p className="text-sm">Humidity</p>
        </div>
        {/* Wind Speed */}
        <div className="bg-white/20 p-4 rounded-lg shadow-md flex flex-col items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/54/54298.png"
            alt="wind"
            className="w-8 h-8 mb-2"
          />
          <p className="text-xl font-semibold">{weather.wind.speed} km/h</p>
          <p className="text-sm">Wind Speed</p>
        </div>
      </div>
    </div>
  );
};

export default City;
