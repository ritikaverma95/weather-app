import React from "react";
import "./weather.css";
import ReactDOM from "react-dom/client";
import Weather from "./components/weatherboard"; 
import { RouterProvider, createBrowserRouter } from "react-router-dom"; // ✅ import both

const WeatherLayout = () => {
  return (
    <div>
      <Weather /> 
      {/* Outlet is where child routes will render */}
    </div>
  );
};

const weatherRouter = createBrowserRouter([
  {
    path: "/",
    element: <WeatherLayout />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={weatherRouter} />
);
